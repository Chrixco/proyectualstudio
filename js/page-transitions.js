/**
 * Page Transition Animations
 * Handles smooth transitions between pages with exit and entrance animations
 */

function initPageTransitions() {
  // Get all internal navigation links (excluding anchors, external links, and buttons)
  const links = document.querySelectorAll(
    'a[href]:not([href^="#"]):not([target="_blank"]):not([rel*="external"])'
  );

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Only animate for same-domain navigation
      if (!href.startsWith('http') && !href.startsWith('//')) {
        e.preventDefault();

        const main = document.querySelector('main');

        // Trigger exit animation
        if (main) {
          main.classList.add('page-exit');
        }

        // Wait for animation to complete, then navigate
        setTimeout(() => {
          window.location.href = href;
        }, 500); // Matches the pageExit animation duration
      }
    });
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initPageTransitions();
});

// Handle browser back/forward buttons
window.addEventListener('pageshow', () => {
  const main = document.querySelector('main');
  if (main) {
    main.classList.remove('page-exit');
  }
});
