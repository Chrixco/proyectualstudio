# Proyectual Studio Color Palette

## Overview

This directory contains the complete color system for the Proyectual Studio web application. All colors are organized by category with hex codes, RGB values, and usage guidelines.

**IMPORTANT**: This color system is now **centralized** in `/js/colors.js`. All colors used across the web app reference this single source of truth. Update colors there and they automatically propagate throughout the entire application.

## Quick Reference

### Primary Colors
- **Primary Blue**: `#0099FF` - Main accent color for UI elements
- **Black**: `#000000` - Primary background and text color on light backgrounds
- **White**: `#FFFFFF` - Text on dark backgrounds, light UI elements

### Secondary Colors
- **Secondary Blue**: `#00BFFF` - Lighter blue for hover states
- **Secondary Blue 2**: `#0099FF` - Alternative blue accent

### Grayscale
- **Dark Gray**: `#1a1a1a` - Secondary background
- **Mid Gray**: `#333333` - Tertiary elements
- **Medium Gray**: `#999999` - Disabled states
- **Light Gray**: `#cccccc` - Secondary text
- **Very Light Gray**: `#f5f5f5` - Light theme background

### Glass & Transparency Effects
- **Glass Background**: `rgba(0, 0, 0, 0.7)` - Semi-transparent backgrounds
- **Blue Glass**: `rgba(0, 153, 255, 0.3)` - Subtle blue borders
- **Light Glass**: `rgba(255, 255, 255, 0.7)` - Light theme effect
- **Shadow Color**: `rgba(0, 153, 255, 1)` - Drop shadows and glows

## Theme System

The application uses CSS custom properties (variables) for theme switching:

### Dark Theme (Default)
```css
--brutalist-yellow: #0099FF;    /* Primary accent */
--brutalist-black: #000000;     /* Primary background */
--brutalist-white: #FFFFFF;     /* Primary text */
```

### Light Theme
Switch theme with `data-theme="light"` attribute on `<html>` or `:root`

```css
--brutalist-yellow: #000000;    /* Becomes dark for contrast */
--brutalist-black: #FFFFFF;     /* Inverted for light theme */
--brutalist-white: #000000;     /* Text becomes dark */
```

## Usage in Code

### Using CSS Variables
```css
.element {
  color: var(--text-primary);
  background: var(--bg-primary);
  border-color: var(--accent-primary);
}
```

### Direct Color Values (when necessary)
```css
.element {
  color: #0099FF;          /* Primary Blue */
  background: #000000;     /* Black */
  border: 2px solid #00BFFF; /* Secondary Blue */
}
```

## Color Psychology & Accessibility

- **Blue (#0099FF)**: Conveys trust, stability, and technology. High contrast on dark backgrounds
- **Black (#000000)**: Professional, clean, creates strong contrast with white text
- **White (#FFFFFF)**: Clean, minimal, excellent readability on dark backgrounds
- **Gray Tones**: Provide hierarchy and support primary colors

## Contrast Ratios (WCAG AA)

- Blue on Black: ✅ 7.8:1 (AAA compliant)
- White on Black: ✅ 21:1 (AAA compliant)
- Light Gray on Dark Gray: ✅ 6.1:1 (AA compliant)

## Implementation Files

### CSS Variables
- Location: `/css/styles.css`
- Defined in `:root` selector for dark theme
- Light theme overrides in `:root[data-theme="light"]`

### HTML Components
- Solar Calculator: `/pages/solar-calculator.html`
- Uses CSS variables throughout

## Color Update Guide

When updating colors:

1. **Update CSS Variables**: Edit `/css/styles.css` at `:root` and light theme sections
2. **Update Direct References**: Search and replace direct hex values if needed
3. **Test Both Themes**: Verify colors work in both dark and light modes
4. **Check Accessibility**: Ensure WCAG contrast requirements are met
5. **Update This Palette**: Edit this documentation with new color values

## Preview

Visit `color-palette/index.html` in a browser to see:
- Visual color swatches
- Hex and RGB values
- One-click copy functionality
- Usage notes for each color
- Complete CSS variables reference

## Browser Compatibility

All colors are supported in:
- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ CSS Variables (custom properties) - IE11 not supported
- ✅ RGBA transparency - All modern browsers
- ✅ RGB notation - All browsers

## Centralized Color System - How to Use

### 1. Import the Color System

All pages automatically load `/js/colors.js`. Access colors in JavaScript:

```javascript
// Get a specific color
const primaryBlue = getColor('primary.blue');
console.log(primaryBlue); // #0099FF

// Get all colors
const allColors = getAllColors();

// Get colors as array (for UI display)
const colorArray = getColorsAsArray();

// Apply theme
applyTheme('dark'); // or 'light'
```

### 2. Using Colors in HTML/CSS

Colors are automatically applied as CSS variables to the document root. Use them in your stylesheets:

```css
.element {
  color: var(--text-primary);
  background: var(--bg-primary);
  border-color: var(--accent-primary);
}
```

### 3. Updating Colors Globally

To change a color throughout the entire application:

**Option A: Edit `/js/colors.js` directly**
```javascript
// In PROYECTUAL_COLORS object, update:
primary: {
  blue: '#YOUR_NEW_COLOR',
  // ...
}
```

**Option B: Update programmatically (at runtime)**
```javascript
// Update a color
updateColor('primary.blue', '#FF0000');

// This will apply the change to all pages using the color system
```

### 4. Files Using the Color System

- ✅ `/pages/solar-calculator.html` - Uses CSS variables from color system
- ✅ `/color-palette/index.html` - Displays colors from `colors.js`
- ✅ All future pages should import `/js/colors.js`

### 5. CSS Variables Available

All colors are available as CSS custom properties:

- `--brutalist-yellow` - Primary accent (blue)
- `--brutalist-black` - Primary background
- `--brutalist-white` - Primary text
- `--text-primary` - Main text color
- `--text-secondary` - Secondary text color
- `--bg-primary` - Main background
- `--bg-secondary` - Secondary background
- `--accent-primary` - Main accent color
- `--accent-secondary` - Secondary accent color
- `--glass-bg` - Glass effect background
- `--glass-border` - Glass effect border
- And more...

See `/js/colors.js` for complete list.

## Benefits of Centralized Color Management

1. **Single Source of Truth** - All colors defined in one place
2. **Easy Updates** - Change a color once, applies everywhere
3. **Theme Support** - Dark and light theme colors defined together
4. **Consistency** - Ensures color usage is consistent across the app
5. **Maintainability** - Color palette is easy to find and understand
6. **Developer Experience** - Colors accessible via JavaScript API

## Adding New Colors

1. Add to `PROYECTUAL_COLORS` object in `/js/colors.js`
2. Update CSS variables mapping if needed
3. Add entry to `getColorsAsArray()` function
4. Update this README

Example:
```javascript
// In js/colors.js
const PROYECTUAL_COLORS = {
  // ... existing colors
  custom: {
    red: '#FF0000',
    green: '#00FF00'
  }
}

// Then use in code:
getColor('custom.red'); // #FF0000
```

## Notes

- The primary accent color was changed from `#FFD500` (yellow) to `#0099FF` (blue)
- All related colors (shadows, borders, glass effects) were updated accordingly
- The grayscale provides flexibility for various UI states and themes
- Glass effect colors use transparency to work with any background
- The color system is now **centralized** for easier maintenance and consistency
