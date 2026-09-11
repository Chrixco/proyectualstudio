/**
 * Option cards — accessibility layer
 *
 * The four calculators build their choice UIs out of
 * `<div class="option-card" onclick="selectOption(this, 'x')">`.
 * Divs are not focusable and do not respond to the keyboard, so those
 * controls were unreachable without a pointing device.
 *
 * This script upgrades the existing markup in place, following the
 * WAI-ARIA radio group pattern. It does not replace the pages' own
 * handlers — keyboard activation is routed through the same click path,
 * and `aria-checked` is kept in sync with the `.selected` class the
 * pages already toggle.
 *
 * Cards that the pages render at runtime (the carbon calculator rebuilds
 * its energy options when the country changes) are picked up too.
 *
 * https://www.w3.org/WAI/ARIA/apg/patterns/radio/
 */
(function () {
  'use strict';

  var CARD = '.option-card';
  var CATEGORY_ATTR = 'data-option-group';
  var wired = new WeakSet();

  /**
   * Which choice set does this card belong to?
   * Pages pass the category as the second argument of their inline
   * handler (`selectOption(this, 'location')`) or use a dedicated
   * handler name (`selectDiscipline(this)`). Either identifies the set.
   * Runtime-built cards assign `.onclick` as a property and have no
   * attribute to read — they are distinguished by their container.
   */
  function categoryOf(card) {
    var cached = card.getAttribute(CATEGORY_ATTR);
    if (cached) return cached;

    var handler = card.getAttribute('onclick') || '';
    var withArg = handler.match(/(\w+)\s*\(\s*this\s*,\s*['"]([^'"]+)['"]/);
    var category = withArg
      ? withArg[1] + ':' + withArg[2]
      : (handler.match(/(\w+)\s*\(/) || [null, 'default'])[1];

    card.setAttribute(CATEGORY_ATTR, category);
    return category;
  }

  /**
   * The element that owns a choice set.
   *
   * Cards are laid out inconsistently across the calculators: sometimes
   * as direct siblings, sometimes each wrapped in a Bootstrap `.col-*`
   * inside a `.row`. Walk up until an ancestor holds more than one card
   * of the same category, without leaving the surrounding step.
   */
  function containerOf(card) {
    var category = categoryOf(card);
    var boundary = card.closest('.calculator-section, .inputs-panel, form, main') || document.body;
    var node = card.parentElement;

    while (node) {
      var sameCategory = Array.prototype.filter.call(
        node.querySelectorAll(CARD),
        function (c) { return categoryOf(c) === category; }
      );
      if (sameCategory.length > 1) return node;
      if (node === boundary) return node;
      node = node.parentElement;
    }
    return card.parentElement;
  }

  /** Cards of one category inside one container, in DOM order. */
  function membersOf(container, category) {
    return Array.prototype.filter.call(
      container.querySelectorAll(CARD),
      function (c) { return categoryOf(c) === category; }
    );
  }

  /** A card's accessible name: its heading, else its trimmed text. */
  function labelFor(card) {
    var heading = card.querySelector('h1, h2, h3, h4, h5, h6');
    return (heading ? heading.textContent : card.textContent).trim().replace(/\s+/g, ' ');
  }

  /**
   * The class a page uses to mark the chosen card. Most use `.selected`;
   * the investment calculator uses `.active`.
   */
  function selectedCard(cards) {
    return cards.filter(function (c) {
      return c.classList.contains('selected') || c.classList.contains('active');
    })[0];
  }

  /** Mirror the page's own selected class onto aria-checked, and keep a roving tabindex. */
  function syncGroup(container, category) {
    var cards = membersOf(container, category);
    if (!cards.length) return;

    // Report only what the page has actually marked. When nothing is
    // selected yet, no card claims aria-checked, but the first still
    // holds the tab stop so the group stays reachable.
    var current = selectedCard(cards);
    var tabStop = current || cards[0];
    cards.forEach(function (card) {
      card.setAttribute('aria-checked', String(card === current));
      card.tabIndex = card === tabStop ? 0 : -1;
    });
  }

  /** Give each card a role and hide the intervening layout wrappers. */
  function describeCards(container, category, single) {
    membersOf(container, category).forEach(function (card) {
      card.setAttribute('role', single ? 'button' : 'radio');
      if (!card.getAttribute('aria-label')) card.setAttribute('aria-label', labelFor(card));
      if (single) card.tabIndex = 0;

      var node = card.parentElement;
      while (node && node !== container) {
        if (!node.hasAttribute('role')) node.setAttribute('role', 'presentation');
        node = node.parentElement;
      }
    });
  }

  /** Label the group from the nearest step heading, if there is one. */
  function labelGroup(container) {
    if (container.getAttribute('aria-label')) return;
    var section = container.closest('.calculator-section, .input-group, .form-group');
    var legend = section && section.querySelector('.calculator-label, .section-title, label, h2, h3, h4');
    if (legend) container.setAttribute('aria-label', legend.textContent.trim().replace(/\s+/g, ' '));
  }

  function activate(card) {
    // Go through click so each page's own handler runs unchanged.
    card.click();
    card.focus();
  }

  function onKeydown(event) {
    var card = event.target.closest && event.target.closest(CARD);
    if (!card) return;

    var container = event.currentTarget;
    var cards = membersOf(container, categoryOf(card));
    var index = cards.indexOf(card);
    if (index === -1) return;

    var next = null;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        next = cards[(index + 1) % cards.length];
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        next = cards[(index - 1 + cards.length) % cards.length];
        break;
      case 'Home':
        next = cards[0];
        break;
      case 'End':
        next = cards[cards.length - 1];
        break;
      case ' ':
      case 'Enter':
        event.preventDefault();
        activate(card);
        return;
      default:
        return;
    }

    event.preventDefault();
    activate(next);
  }

  function wire(container, category) {
    var cards = membersOf(container, category);
    if (!cards.length) return;

    var single = cards.length < 2;
    if (!single) {
      container.setAttribute('role', 'radiogroup');
      labelGroup(container);
    }

    describeCards(container, category, single);
    if (!single) syncGroup(container, category);

    if (!wired.has(container)) {
      container.addEventListener('keydown', onKeydown);
      wired.add(container);
    }
  }

  /** Find every (container, category) pair currently in the document. */
  function scan() {
    var seen = new Map();
    document.querySelectorAll(CARD).forEach(function (card) {
      var container = containerOf(card);
      if (!container) return;
      if (!seen.has(container)) seen.set(container, new Set());
      seen.get(container).add(categoryOf(card));
    });
    return seen;
  }

  function refresh() {
    scan().forEach(function (categories, container) {
      categories.forEach(function (category) {
        wire(container, category);
      });
    });
  }

  function init() {
    refresh();

    // Pages toggle `.selected` themselves, and some rebuild their cards
    // at runtime. Re-derive state whenever either happens.
    // Debounced with a timer rather than requestAnimationFrame: rAF does
    // not fire while the tab is in the background, which would leave the
    // exposed state stale until the visitor returned to the page.
    var pending = null;
    var observer = new MutationObserver(function () {
      if (pending !== null) return;
      pending = setTimeout(function () {
        pending = null;
        refresh();
      }, 0);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
