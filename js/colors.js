/**
 * Proyectual Studio - Centralized Color System
 * All colors used across the web application are defined here
 * Update colors in this file and they will automatically reflect across the entire site
 */

const PROYECTUAL_COLORS = {
  // Primary Colors
  primary: {
    blue: '#0099FF',
    black: '#000000',
    white: '#FFFFFF'
  },

  // Secondary Accent Colors
  secondary: {
    blue: '#00BFFF',
    blue2: '#0099FF' // Alternative blue accent
  },

  // Grayscale
  gray: {
    darkGray: '#1a1a1a',
    midGray: '#333333',
    mediumGray: '#999999',
    lightGray: '#cccccc',
    veryLightGray: '#f5f5f5'
  },

  // Glass & Transparency Effects
  glass: {
    darkBg: 'rgba(0, 0, 0, 0.7)',
    blueBorder: 'rgba(0, 153, 255, 0.3)',
    lightBg: 'rgba(255, 255, 255, 0.7)',
    shadowColor: 'rgba(0, 153, 255, 1)',
    blueLight: 'rgba(0, 153, 255, 0.1)',
    blueLighter: 'rgba(0, 153, 255, 0.05)',
    blueFade: 'rgba(0, 153, 255, 0.2)',
    blueStrong: 'rgba(0, 153, 255, 0.5)',
    blueOpaque: 'rgba(0, 153, 255, 0.8)',
    blueSoft: 'rgba(0, 153, 255, 0.7)'
  },

  // CSS Variables mapping (for use in CSS)
  cssVariables: {
    darkTheme: {
      '--brutalist-yellow': '#0099FF',
      '--brutalist-black': '#000000',
      '--brutalist-white': '#FFFFFF',
      '--brutalist-shadow': '8px 8px 0px rgba(0, 153, 255, 1)',
      '--glass-bg': 'rgba(0, 0, 0, 0.7)',
      '--glass-border': 'rgba(0, 153, 255, 0.3)',
      '--panel-border-radius': '0.75rem',
      '--bg-primary': '#000000',
      '--bg-secondary': '#1a1a1a',
      '--text-primary': '#FFFFFF',
      '--text-secondary': '#cccccc',
      '--accent-primary': '#0099FF',
      '--accent-secondary': '#00BFFF',
      '--shadow-color': 'rgba(0, 153, 255, 1)',
      '--glass-overlay': 'rgba(0, 0, 0, 0.7)',
      '--accent-light': 'rgba(0, 153, 255, 0.1)',
      '--accent-lighter': 'rgba(0, 153, 255, 0.05)',
      '--accent-fade': 'rgba(0, 153, 255, 0.2)',
      '--accent-strong': 'rgba(0, 153, 255, 0.5)',
      '--accent-opaque': 'rgba(0, 153, 255, 0.8)',
      '--accent-soft': 'rgba(0, 153, 255, 0.7)',
      '--accent-ultra-light': 'rgba(0, 153, 255, 0.08)',
      '--bg-dark': 'rgba(0, 0, 0, 0.3)',
      '--bg-darker': 'rgba(0, 0, 0, 0.2)',
      '--bg-darkest': 'rgba(0, 0, 0, 0.9)',
      '--text-light': 'rgba(255, 255, 255, 0.8)',
      '--text-lighter': 'rgba(255, 255, 255, 0.5)',
      '--border-light': 'rgba(255, 255, 255, 0.3)',
      '--success-bg': 'rgba(144, 238, 144, 0.1)',
      '--error-bg': 'rgba(255, 107, 107, 0.1)',
      '--bg-white-ultra-light': 'rgba(255, 255, 255, 0.05)',
      '--bg-white-opaque': 'rgba(255, 255, 255, 0.98)',
      '--bg-semi-dark': 'rgba(0, 0, 0, 0.85)'
    },
    lightTheme: {
      '--brutalist-yellow': '#000000',
      '--brutalist-black': '#FFFFFF',
      '--brutalist-white': '#000000',
      '--brutalist-shadow': '8px 8px 0px rgba(0, 0, 0, 1)',
      '--glass-bg': 'rgba(255, 255, 255, 0.7)',
      '--glass-border': 'rgba(0, 0, 0, 0.3)',
      '--panel-border-radius': '0.75rem',
      '--bg-primary': '#FFFFFF',
      '--bg-secondary': '#f5f5f5',
      '--text-primary': '#000000',
      '--text-secondary': '#333333',
      '--accent-primary': '#0099FF',
      '--accent-secondary': '#00BFFF',
      '--shadow-color': 'rgba(0, 0, 0, 1)',
      '--glass-overlay': 'rgba(255, 255, 255, 0.7)',
      '--bg-white-ultra-light': 'rgba(255, 255, 255, 0.05)',
      '--bg-white-opaque': 'rgba(255, 255, 255, 0.98)',
      '--bg-semi-dark': 'rgba(0, 0, 0, 0.85)'
    }
  }
};

/**
 * Get all colors organized by category
 * @returns {Object} All color definitions
 */
function getAllColors() {
  return PROYECTUAL_COLORS;
}

/**
 * Get a specific color by path
 * @param {string} path - Path to color (e.g., 'primary.blue', 'gray.lightGray')
 * @returns {string} Hex color value or rgba value
 */
function getColor(path) {
  const keys = path.split('.');
  let value = PROYECTUAL_COLORS;

  for (let key of keys) {
    value = value[key];
    if (value === undefined) {
      console.warn(`Color path not found: ${path}`);
      return null;
    }
  }

  return value;
}

/**
 * Apply theme colors to document root
 * @param {string} theme - 'dark' or 'light'
 */
function applyTheme(theme) {
  const variables = theme === 'light'
    ? PROYECTUAL_COLORS.cssVariables.lightTheme
    : PROYECTUAL_COLORS.cssVariables.darkTheme;

  const root = document.documentElement;

  for (let [key, value] of Object.entries(variables)) {
    root.style.setProperty(key, value);
  }

  // Store theme preference
  localStorage.setItem('theme', theme);
}

/**
 * Get array of all colors for display
 * @returns {Array} Array of color objects with metadata
 */
function getColorsAsArray() {
  return [
    {
      name: 'Primary Blue',
      hex: PROYECTUAL_COLORS.primary.blue,
      category: 'Primary Colors',
      usage: 'Main accent color for UI elements, buttons, and highlights'
    },
    {
      name: 'Pure Black',
      hex: PROYECTUAL_COLORS.primary.black,
      category: 'Primary Colors',
      usage: 'Primary background and text color on light backgrounds'
    },
    {
      name: 'Pure White',
      hex: PROYECTUAL_COLORS.primary.white,
      category: 'Primary Colors',
      usage: 'Text on dark backgrounds, light UI elements'
    },
    {
      name: 'Secondary Blue',
      hex: PROYECTUAL_COLORS.secondary.blue,
      category: 'Secondary Colors',
      usage: 'Hover states and secondary accents'
    },
    {
      name: 'Secondary Blue',
      hex: PROYECTUAL_COLORS.secondary.blue2,
      category: 'Secondary Colors',
      usage: 'Alternative blue accent for variety'
    },
    {
      name: 'Dark Gray',
      hex: PROYECTUAL_COLORS.gray.darkGray,
      category: 'Grayscale',
      usage: 'Secondary background color'
    },
    {
      name: 'Mid Gray',
      hex: PROYECTUAL_COLORS.gray.midGray,
      category: 'Grayscale',
      usage: 'Tertiary background and border color'
    },
    {
      name: 'Medium Gray',
      hex: PROYECTUAL_COLORS.gray.mediumGray,
      category: 'Grayscale',
      usage: 'Disabled states and subtle text'
    },
    {
      name: 'Light Gray',
      hex: PROYECTUAL_COLORS.gray.lightGray,
      category: 'Grayscale',
      usage: 'Secondary text color on dark backgrounds'
    },
    {
      name: 'Very Light Gray',
      hex: PROYECTUAL_COLORS.gray.veryLightGray,
      category: 'Grayscale',
      usage: 'Light theme background'
    },
    {
      name: 'Glass Background',
      hex: PROYECTUAL_COLORS.glass.darkBg,
      category: 'Glass & Transparency',
      usage: 'Semi-transparent background with backdrop blur'
    },
    {
      name: 'Blue Glass Border',
      hex: PROYECTUAL_COLORS.glass.blueBorder,
      category: 'Glass & Transparency',
      usage: 'Subtle blue accent borders'
    },
    {
      name: 'Light Glass Background',
      hex: PROYECTUAL_COLORS.glass.lightBg,
      category: 'Glass & Transparency',
      usage: 'Light theme glass effect'
    },
    {
      name: 'Shadow Color',
      hex: PROYECTUAL_COLORS.glass.shadowColor,
      category: 'Glass & Transparency',
      usage: 'Drop shadows and glow effects'
    }
  ];
}

/**
 * Export colors as CSS custom properties string
 * @param {string} theme - 'dark' or 'light'
 * @returns {string} CSS custom properties
 */
function exportAsCSS(theme = 'dark') {
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

/**
 * Update a color throughout the system
 * @param {string} path - Path to color (e.g., 'primary.blue')
 * @param {string} newHex - New hex color value
 */
function updateColor(path, newHex) {
  const keys = path.split('.');
  let obj = PROYECTUAL_COLORS;

  for (let i = 0; i < keys.length - 1; i++) {
    obj = obj[keys[i]];
  }

  obj[keys[keys.length - 1]] = newHex;

  // Apply to document if it's in cssVariables
  const theme = localStorage.getItem('theme') || 'dark';
  applyTheme(theme);

  console.log(`Color updated: ${path} = ${newHex}`);
}

// Initialize theme on page load
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);
  });
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PROYECTUAL_COLORS,
    getAllColors,
    getColor,
    applyTheme,
    getColorsAsArray,
    exportAsCSS,
    updateColor
  };
}
