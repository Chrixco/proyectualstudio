/**
 * Number formatting — shared across the tools
 *
 * The calculators formatted every figure with a bare
 * `value.toLocaleString()`, which follows the *browser's* locale rather
 * than the language the visitor picked on the page. On a German-locale
 * browser the English page rendered "1.600.000"; on an English-locale
 * browser the Spanish page rendered "1,600,000". Same page, same
 * language, different separators depending on the reader's machine.
 *
 * Formatting here follows `currentLang` instead, so the digits match
 * the words around them.
 */
(function () {
  'use strict';

  var LOCALES = { en: 'en-US', es: 'es-EC' };

  function locale() {
    return LOCALES[window.currentLang] || LOCALES.en;
  }

  /**
   * @param {number|string} value
   * @param {Intl.NumberFormatOptions} [options]
   * @returns {string} the value grouped for the page's language, or an
   *   empty string when it is not a number.
   */
  window.formatToolNumber = function (value, options) {
    var n = typeof value === 'number' ? value : parseFloat(value);
    if (!isFinite(n)) return '';
    return n.toLocaleString(locale(), options);
  };

  /**
   * Read a number back out of text that was formatted for display.
   *
   * Several places re-parse their own rendered output. They stripped
   * commas only, which silently broke the moment the page grouped with
   * "." instead — `parseInt('1.600.000')` is 1. Dropping every
   * non-digit keeps that working in either language.
   *
   * @param {string|number} text
   * @returns {number} the parsed value, or 0 when there is none.
   */
  window.parseToolNumber = function (text) {
    if (typeof text === 'number') return text;
    var digits = String(text == null ? '' : text).replace(/[^0-9-]/g, '');
    var n = parseInt(digits, 10);
    return isFinite(n) ? n : 0;
  };
})();
