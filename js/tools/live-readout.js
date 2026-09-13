/**
 * Live readout — the docked figure on small screens
 *
 * On a phone the calculators stack: every input first, results underneath.
 * So the one thing these tools exist to show you — a number moving as you
 * drag a slider — happens off screen. You set a value, scroll down to see
 * what it did, scroll back to adjust, and repeat.
 *
 * This docks the headline figures to the bottom of the viewport while you
 * are in the inputs, and gets out of the way once the real results panel
 * is on screen. It mirrors existing elements rather than recomputing
 * anything, so it cannot disagree with the panel it shadows.
 *
 * Markup contract:
 *   <div class="live-readout" data-live-readout data-target="resultsPanel">
 *     <span class="live-readout__value" data-mirror="overviewProduction"></span>
 *
 * `data-mirror` is the id of the element to follow; `data-target` is the id
 * to scroll to when the bar is pressed.
 */
(function () {
  'use strict';

  function init() {
    var bar = document.querySelector('[data-live-readout]');
    if (!bar) return;

    var mirrors = Array.prototype.map.call(
      bar.querySelectorAll('[data-mirror]'),
      function (node) {
        return { node: node, source: document.getElementById(node.getAttribute('data-mirror')) };
      }
    ).filter(function (m) { return m.source; });

    if (!mirrors.length) return;

    function sync() {
      mirrors.forEach(function (m) {
        var next = m.source.textContent.trim();
        if (m.node.textContent !== next) {
          m.node.textContent = next;
          // Briefly mark the figure that just moved.
          m.node.classList.remove('is-changed');
          void m.node.offsetWidth;   // restart the animation
          m.node.classList.add('is-changed');
        }
      });
    }

    sync();

    var observer = new MutationObserver(sync);
    mirrors.forEach(function (m) {
      observer.observe(m.source, { childList: true, characterData: true, subtree: true });
    });

    // Hide the bar once the panel it summarises is actually on screen —
    // two copies of the same number competing for attention is worse than
    // none.
    var targetId = bar.getAttribute('data-target');
    var target = targetId && document.getElementById(targetId);
    if (target && 'IntersectionObserver' in window) {
      // A ratio threshold is useless here: the results panel is taller than
      // the viewport, so 12% of it may never be on screen at once. Shrink the
      // root to its top 40% instead and hide the bar once the panel has
      // scrolled up into that band — far enough in that the figures below are
      // the ones being read.
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          bar.classList.toggle('is-hidden', entry.isIntersecting);
        });
      }, { threshold: 0, rootMargin: '0px 0px -60% 0px' }).observe(target);
    }

    bar.addEventListener('click', function () {
      if (!target) return;
      var reduced = window.matchMedia &&
                    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
