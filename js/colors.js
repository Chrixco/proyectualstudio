/**
 * Proyectual Studio - Unified Theme System
 * Single source of truth for all colors and theme definitions
 *
 * Light Mode: Default (no data-theme attribute)
 * - Background: White, Text: Black, Accents: Blue
 *
 * Dark Mode: data-theme="light" (counterintuitive naming retained for compatibility)
 * - Background: Black, Text: White, Accents: Yellow
 */

const PROYECTUAL_COLORS = {
  // Core brand colors - immutable
  brand: {
    black: '#000000',
    white: '#FFFFFF',
    blue: '#0099FF',
    blueLight: '#00BFFF',
    yellow: '#FFD500'
  },

  // CSS Variables - matches styles.css exactly
  cssVariables: {
    lightTheme: {
      // Core brutalist colors
      '--brutalist-yellow': '#FFD500',
      '--brutalist-black': '#000000',
      '--brutalist-white': '#FFFFFF',

      // Shadows & Effects
      '--brutalist-shadow': '8px 8px 0px rgba(0, 0, 0, 1)',
      '--brutalist-border': '4px solid #000000',
      '--glass-bg': 'rgba(255, 255, 255, 0.7)',
      '--glass-border': 'rgba(0, 0, 0, 0.3)',
      '--glass-overlay': 'rgba(255, 255, 255, 0.7)',

      // Layout
      '--panel-border-radius': '0.75rem',

      // Theme-specific colors
      '--bg-primary': '#FFFFFF',
      '--bg-secondary': '#f5f5f5',
      '--text-primary': '#000000',
      '--text-secondary': '#333333',
      '--accent-primary': '#0099FF',
      '--accent-secondary': '#00BFFF',
      '--shadow-color': 'rgba(0, 0, 0, 1)',
      '--button-blue': '#0099FF',
      '--bg-white-ultra-light': 'rgba(255, 255, 255, 0.05)',
      '--bg-white-opaque': 'rgba(255, 255, 255, 0.98)',
      '--bg-semi-dark': 'rgba(0, 0, 0, 0.85)'
    },

    darkTheme: {
      // Core brutalist colors
      '--brutalist-yellow': '#FFD500',
      '--brutalist-black': '#000000',
      '--brutalist-white': '#FFFFFF',

      // Shadows & Effects
      '--brutalist-shadow': '8px 8px 0px rgba(255, 213, 0, 1)',
      '--brutalist-border': '4px solid #FFD500',
      '--glass-bg': 'rgba(0, 0, 0, 0.7)',
      '--glass-border': 'rgba(255, 213, 0, 0.3)',
      '--glass-overlay': 'rgba(0, 0, 0, 0.7)',

      // Layout
      '--panel-border-radius': '0.75rem',

      // Theme-specific colors
      '--bg-primary': '#000000',
      '--bg-secondary': '#1a1a1a',
      '--text-primary': '#FFFFFF',
      '--text-secondary': '#cccccc',
      '--accent-primary': '#0099FF',
      '--accent-secondary': '#00BFFF',
      '--shadow-color': 'rgba(255, 213, 0, 1)',
      '--button-blue': '#0099FF',
      '--bg-white-ultra-light': 'rgba(255, 255, 255, 0.05)',
      '--bg-white-opaque': 'rgba(255, 255, 255, 0.98)',
      '--bg-semi-dark': 'rgba(0, 0, 0, 0.85)'
    }
  }
};

// Apply theme colors to document root
function applyTheme(theme) {
  const variables = theme === 'light'
    ? PROYECTUAL_COLORS.cssVariables.lightTheme
    : PROYECTUAL_COLORS.cssVariables.darkTheme;

  const root = document.documentElement;
  for (let [key, value] of Object.entries(variables)) {
    root.style.setProperty(key, value);
  }

  localStorage.setItem('theme', theme);
}

// Export colors as CSS custom properties string
function exportAsCSS(theme = 'light') {
  const variables = theme === 'light'
    ? PROYECTUAL_COLORS.cssVariables.lightTheme
    : PROYECTUAL_COLORS.cssVariables.darkTheme;

  let css = ':root {\n';
  for (let [key, value] of Object.entries(variables)) {
    css += `  ${key}: ${value};\n`;
  }
  css += '}';

  return css;
}

// Initialize theme on page load
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
  });
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PROYECTUAL_COLORS,
    applyTheme,
    exportAsCSS
  };
}
