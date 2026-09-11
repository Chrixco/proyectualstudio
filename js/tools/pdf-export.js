/**
 * PDF export and its email gate — shared across the tools
 *
 * All four calculators carried their own copy of these three functions.
 * The copies differed only in whether they checked that the modal
 * existed: the investment page's did not, and its modal markup is
 * currently commented out, so calling it would throw.
 *
 * Export is a print: the page carries a print stylesheet (css/tools.css)
 * that strips the site chrome and lays the panels out for paper, so
 * "Save as PDF" in the print dialog produces the deliverable.
 */
(function () {
  'use strict';

  var MODAL_ID = 'emailModal';
  var INPUT_ID = 'emailInput';
  var lastFocused = null;

  function modal() {
    return document.getElementById(MODAL_ID);
  }

  function input() {
    return document.getElementById(INPUT_ID);
  }

  window.openEmailModal = function () {
    var el = modal();
    if (!el) return;

    lastFocused = document.activeElement;
    el.classList.add('active');
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');

    var field = input();
    if (field) field.focus();
  };

  window.closeEmailModal = function () {
    var el = modal();
    if (!el) return;

    el.classList.remove('active');
    el.removeAttribute('aria-modal');

    var field = input();
    if (field) field.value = '';

    // Send focus back where it came from rather than to the top of the page.
    if (lastFocused && document.contains(lastFocused)) lastFocused.focus();
    lastFocused = null;
  };

  window.submitPdfDownload = function () {
    // Let the modal finish closing before the print dialog steals focus.
    setTimeout(function () {
      window.print();
    }, 300);
  };

  // Dismiss on backdrop click...
  document.addEventListener('click', function (event) {
    var el = modal();
    if (el && event.target === el) window.closeEmailModal();
  });

  // ...and on Escape, which none of the per-page copies handled.
  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    var el = modal();
    if (el && el.classList.contains('active')) window.closeEmailModal();
  });
})();
