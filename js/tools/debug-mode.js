/**
 * Debug mode — reveal the testing controls
 *
 * The form-filling buttons on the contact and lead pages were shipped
 * visible: anyone landing on the page saw a "🐛 Debug" control next to
 * Send Message. They are now hidden by default and revealed by typing a
 * word into a small field in the footer.
 *
 * THIS IS CONCEALMENT, NOT SECURITY. The word is in this file, which
 * every visitor downloads, and the flag it sets can be flipped from the
 * console in a second. It keeps test controls out of the way of ordinary
 * visitors and nothing more. Never put anything behind it that would
 * matter if a stranger found it — no credentials, no private data, no
 * destructive action.
 *
 * To mark a control as debug-only, give it the `debug-only` class.
 * The state lives in sessionStorage, so it lasts while the tab is open
 * and is gone on the next visit.
 */
(function () {
  'use strict';

  var PASSPHRASE = 'debug';
  var STORAGE_KEY = 'proyectual_debug';
  var ATTRIBUTE = 'data-debug';

  function isOn() {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === 'on';
    } catch (e) {
      return false;   // private browsing
    }
  }

  function setOn(on) {
    try {
      if (on) sessionStorage.setItem(STORAGE_KEY, 'on');
      else sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) { /* storage unavailable; the toggle still works this page */ }

    document.documentElement.setAttribute(ATTRIBUTE, on ? 'on' : 'off');
    render();
  }

  var host = null;

  function render() {
    if (!host) return;
    var on = document.documentElement.getAttribute(ATTRIBUTE) === 'on';
    var es = window.currentLang === 'es';

    host.innerHTML = '';

    if (on) {
      var status = document.createElement('span');
      status.className = 'debug-gate__status';
      status.textContent = es ? 'Modo depuración activo' : 'Debug mode on';

      var off = document.createElement('button');
      off.type = 'button';
      off.className = 'debug-gate__off';
      off.textContent = es ? 'Ocultar' : 'Hide';
      off.addEventListener('click', function () { setOn(false); });

      host.appendChild(status);
      host.appendChild(off);
      return;
    }

    var form = document.createElement('form');
    form.className = 'debug-gate__form';

    var label = document.createElement('label');
    label.className = 'sr-only';
    label.setAttribute('for', 'debug-gate-input');
    label.textContent = es ? 'Palabra clave de depuración' : 'Debug passphrase';

    var input = document.createElement('input');
    input.type = 'password';
    input.id = 'debug-gate-input';
    input.className = 'debug-gate__input';
    input.autocomplete = 'off';
    input.spellcheck = false;
    input.placeholder = es ? 'depuración' : 'debug';

    form.appendChild(label);
    form.appendChild(input);

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (input.value.trim().toLowerCase() === PASSPHRASE) {
        setOn(true);
      } else {
        // Say nothing useful about why; just reset.
        input.value = '';
        form.classList.add('is-rejected');
        setTimeout(function () { form.classList.remove('is-rejected'); }, 600);
      }
    });

    host.appendChild(form);
  }

  function init() {
    document.documentElement.setAttribute(ATTRIBUTE, isOn() ? 'on' : 'off');

    var footer = document.querySelector('.footer-enhanced, footer');
    if (!footer) return;

    host = document.createElement('div');
    host.className = 'debug-gate';
    footer.appendChild(host);

    render();
    document.addEventListener('proyectual:languagechange', render);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
