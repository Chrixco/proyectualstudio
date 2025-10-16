/**
 * Theme Switcher - Shared across all pages
 * Neo-Brutalist Design System
 */

// Initialize theme from localStorage or default to light
let currentTheme = localStorage.getItem('theme') || 'light';

/**
 * Set theme and update UI
 * @param {string} theme - 'dark' or 'light'
 */
function setTheme(theme) {
  const html = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');

  if (theme === 'light') {
    html.setAttribute('data-theme', 'light');
    if (themeToggle) themeToggle.setAttribute('data-theme', 'light');
  } else {
    html.removeAttribute('data-theme');
    if (themeToggle) themeToggle.removeAttribute('data-theme');
  }

  localStorage.setItem('theme', theme);
  currentTheme = theme;

  // Add visual flash effect on theme change (only if body exists)
  if (document.body) {
    const flash = document.createElement('div');
    flash.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${theme === 'light' ? '#FFFFFF' : '#000000'};
      opacity: 0.5;
      z-index: 99999;
      pointer-events: none;
      animation: flashFade 0.3s ease;
    `;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 300);
  }
}

/**
 * Toggle between dark and light themes
 */
function toggleTheme() {
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  currentTheme = newTheme;
  setTheme(currentTheme);
}

/**
 * Initialize theme on page load
 */
function initTheme() {
  // Add flash animation styles when DOM is ready
  const addStyles = () => {
    if (document.head) {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes flashFade {
          0% { opacity: 0.5; }
          100% { opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  };

  // Try to add styles immediately if document.head exists
  if (document.head) {
    addStyles();
  } else {
    // Otherwise wait for DOM
    document.addEventListener('DOMContentLoaded', addStyles);
  }

  // Setup theme toggle button - try both DOMContentLoaded and immediate
  const setupButton = () => {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      // Use onclick for maximum compatibility
      themeToggle.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleTheme();
        return false;
      };
    }
  };

  // Try immediately if DOM is already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupButton);
  } else {
    // DOM is already ready
    setupButton();
  }

  // Also try after a slight delay as a fallback
  setTimeout(setupButton, 100);
}

// Apply theme immediately (before DOM loads)
if (currentTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
}

// Initialize when script loads
initTheme();
