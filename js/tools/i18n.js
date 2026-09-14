/**
 * Language toggle — shared across the tools
 *
 * Every tool page carried its own copy of this, and the copies had
 * drifted apart in ways that mattered:
 *
 *   - Some wrote `el.textContent = el.getAttribute('data-es')` without
 *     checking the attribute exists, blanking any element that had only
 *     an English string.
 *   - Some translated a parent and its children, so the parent's
 *     concatenated text replaced the child markup.
 *   - The investment page captured `currentLang` in a closure at load,
 *     so its toggle could switch to Spanish but never back.
 *   - None updated `<html lang>`, leaving the document claiming English
 *     while showing Spanish.
 *
 * Pages read the global `currentLang` and listen for
 * `proyectual:languagechange` to refresh anything drawn in script
 * (chart labels, generated strings).
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'lang';
  var SUPPORTED = ['en', 'es'];
  var EVENT = 'proyectual:languagechange';

  function normalise(lang) {
    return SUPPORTED.indexOf(lang) === -1 ? 'en' : lang;
  }

  function stored() {
    try {
      return normalise(localStorage.getItem(STORAGE_KEY));
    } catch (e) {
      return 'en'; // private browsing, storage disabled
    }
  }

  window.currentLang = stored();

  /**
   * Replace an element's own wording without disturbing its children.
   *
   * Several labels wrap a live element in their translated text, e.g.
   *   <label data-en="Land/Plot Cost">Land/Plot Cost <span id="currencyLabel">USD</span></label>
   * Assigning textContent there deletes the span, and the scripts that
   * later look it up by id fail. So when an element has element
   * children, only its own first run of text is rewritten.
   */
  function setText(el, value) {
    if (el.children.length === 0) {
      el.textContent = value;
      return;
    }

    for (var i = 0; i < el.childNodes.length; i++) {
      var node = el.childNodes[i];
      if (node.nodeType !== 3 || !node.textContent.trim()) continue;

      // Keep the original spacing around the phrase.
      var spacing = node.textContent.match(/^(\s*).*?(\s*)$/);
      node.textContent = spacing[1] + value + spacing[2];
      return;
    }
  }

  function translate(lang) {
    document.querySelectorAll('[data-en]').forEach(function (el) {
      // A parent that also holds translated children would swallow their
      // markup, so only leaf-level strings are replaced.
      if (el.querySelector('[data-en]')) return;

      var value = el.getAttribute('data-' + lang);
      if (value !== null) setText(el, value);
    });

    // Attribute strings: data-en-placeholder / data-es-placeholder, etc.
    ['placeholder', 'title', 'aria-label'].forEach(function (attr) {
      document.querySelectorAll('[data-en-' + attr + ']').forEach(function (el) {
        var value = el.getAttribute('data-' + lang + '-' + attr);
        if (value !== null) el.setAttribute(attr, value);
      });
    });
  }

  function apply(lang) {
    lang = normalise(lang);

    translate(lang);
    document.documentElement.lang = lang;

    var toggle = document.getElementById('lang-toggle');
    if (toggle) {
      toggle.textContent = lang === 'en' ? 'ES' : 'EN';
      toggle.setAttribute('aria-label', lang === 'en' ? 'Cambiar a español' : 'Switch to English');
    }

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) { /* storage unavailable; the page still switches */ }

    window.currentLang = lang;
    document.dispatchEvent(new CustomEvent(EVENT, { detail: { lang: lang } }));
  }

  // `updateLanguage` is the name the pages already call.
  window.updateLanguage = apply;
  window.setLanguage = apply;

  function init() {
    apply(window.currentLang);

    var toggle = document.getElementById('lang-toggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        apply(window.currentLang === 'en' ? 'es' : 'en');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
