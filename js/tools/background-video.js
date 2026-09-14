/**
 * Background video — deferred loading
 *
 * The calculators sit on a full-bleed looping video (~6.6 MB). Loaded
 * eagerly it competes with the page itself for bandwidth on the very
 * connections least able to spare it, for decoration that a scrim
 * already renders near-invisible.
 *
 * The markup ships a 4 KB poster instead. This script attaches the real
 * source only once the page has finished loading, and only when the
 * visitor's connection and motion preferences suggest it is welcome.
 */
(function () {
  'use strict';

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /** Skip the download on metered, slow, or data-saving connections. */
  function connectionIsConstrained() {
    var c = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!c) return false;
    if (c.saveData) return true;
    return /^(slow-)?2g$/.test(c.effectiveType || '');
  }

  function load(video) {
    var src = video.getAttribute('data-src');
    if (!src || video.src) return;

    video.src = src;
    video.load();

    var play = video.play();
    if (play && typeof play.catch === 'function') {
      // Autoplay can still be refused (low power mode, for instance).
      // The poster stays on screen, which is the intended fallback.
      play.catch(function () {});
    }
  }

  function init() {
    var videos = document.querySelectorAll('.video-background video[data-src]');
    if (!videos.length) return;
    if (prefersReducedMotion() || connectionIsConstrained()) return;

    var start = function () {
      Array.prototype.forEach.call(videos, load);
    };

    if (window.requestIdleCallback) {
      requestIdleCallback(start, { timeout: 3000 });
    } else {
      setTimeout(start, 1000);
    }
  }

  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('load', init);
  }
})();
