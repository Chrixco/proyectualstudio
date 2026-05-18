# Centralized Color System - Implementation Guide

## What Changed?

The Proyectual Studio web app now uses a **centralized color system** where all colors are defined in a single file: `/js/colors.js`

## Quick Start

### 1. View Colors
Open `/color-palette/index.html` in your browser to see all available colors with hex codes.

### 2. Use Colors in Your HTML/CSS

```html
<!-- In your HTML file, colors are automatically applied -->
<div class="my-element">
  <!-- Styling will use centralized colors -->
</div>
```

```css
/* Use CSS variables in your stylesheets */
.my-element {
  color: var(--text-primary);        /* White in dark theme */
  background: var(--bg-primary);     /* Black in dark theme */
  border: 2px solid var(--accent-primary); /* Blue */
}
```

### 3. Use Colors in JavaScript

```javascript
// Import is automatic - colors.js is loaded globally

// Get a specific color
const blueColor = getColor('primary.blue');  // Returns #0099FF

// Get all colors
const colors = getAllColors();

// Apply theme
applyTheme('dark');  // or 'light'

// Update a color at runtime
updateColor('primary.blue', '#FF0000');
```

## Color Structure

```javascript
PROYECTUAL_COLORS = {
  primary: {
    blue: '#0099FF',      // Main accent
    black: '#000000',     // Main background
    white: '#FFFFFF'      // Main text
  },
  secondary: {
    blue: '#00BFFF',      // Lighter blue
    yellow: '#FFD500'     // Legacy color
  },
  gray: {
    darkGray: '#1a1a1a',
    midGray: '#333333',
    mediumGray: '#999999',
    lightGray: '#cccccc',
    veryLightGray: '#f5f5f5'
  },
  glass: {
    darkBg: 'rgba(0, 0, 0, 0.7)',
    blueBorder: 'rgba(0, 153, 255, 0.3)',
    lightBg: 'rgba(255, 255, 255, 0.7)',
    shadowColor: 'rgba(0, 153, 255, 1)'
  }
}
```

## Workflows

### Change a Color Everywhere

1. Open `/js/colors.js`
2. Find the color you want to change
3. Update the hex value
4. The change applies to ALL pages using the color system

Example: Change primary blue
```javascript
// In /js/colors.js
primary: {
  blue: '#FF6B00',  // Changed from #0099FF to orange
  // ...
}
```

Result: All UI elements using `var(--accent-primary)` or `getColor('primary.blue')` will now be orange.

### Add a New Color

1. Open `/js/colors.js`
2. Add to the appropriate category:
```javascript
custom: {
  purple: '#9B59B6',
  teal: '#1ABC9C'
}
```

3. Add to CSS variables if needed:
```javascript
cssVariables: {
  darkTheme: {
    '--custom-purple': '#9B59B6',
    // ...
  }
}
```

4. Use in CSS:
```css
.element {
  color: var(--custom-purple);
}
```

### Switch Themes

```javascript
// Apply light theme
applyTheme('light');

// Apply dark theme (default)
applyTheme('dark');

// Check saved theme
const currentTheme = localStorage.getItem('theme');
```

## Available Functions

### getColor(path)
Get a specific color by path
```javascript
getColor('primary.blue')        // #0099FF
getColor('gray.lightGray')      // #cccccc
getColor('glass.blueBorder')    // rgba(0, 153, 255, 0.3)
```

### getAllColors()
Get the entire color object
```javascript
const colors = getAllColors();
// Returns full PROYECTUAL_COLORS object
```

### getColorsAsArray()
Get colors formatted as array (useful for loops/display)
```javascript
const colorArray = getColorsAsArray();
// Returns array of {name, hex, category, usage}
```

### applyTheme(theme)
Switch between dark and light themes
```javascript
applyTheme('dark');
applyTheme('light');
```

### updateColor(path, newHex)
Update a color at runtime
```javascript
updateColor('primary.blue', '#FF0000');
// Updates all elements using this color
```

### exportAsCSS(theme)
Export color system as CSS
```javascript
const darkCSS = exportAsCSS('dark');
// Returns CSS custom properties string
```

## CSS Variables Map

### Dark Theme (Default)
```css
--brutalist-yellow: #0099FF;    /* Primary accent - now blue */
--brutalist-black: #000000;     /* Primary background */
--brutalist-white: #FFFFFF;     /* Primary text */
--text-primary: #FFFFFF;        /* Main text color */
--text-secondary: #cccccc;      /* Secondary text */
--bg-primary: #000000;          /* Main background */
--bg-secondary: #1a1a1a;        /* Secondary background */
--accent-primary: #0099FF;      /* Main accent */
--accent-secondary: #00BFFF;    /* Secondary accent */
--glass-bg: rgba(0, 0, 0, 0.7);
--glass-border: rgba(0, 153, 255, 0.3);
```

### Light Theme
All colors automatically invert for readability on light backgrounds.

## Files That Use This System

| File | Status | Notes |
|------|--------|-------|
| `/pages/solar-calculator.html` | ✅ Integrated | Uses CSS variables |
| `/color-palette/index.html` | ✅ Integrated | Displays colors from colors.js |
| `/js/colors.js` | 📍 Source | Central definition file |
| Future pages | 🔄 Ready | Import colors.js and use colors |

## Integration Checklist for New Pages

- [ ] Import `<script src="../js/colors.js"></script>`
- [ ] Use `var(--color-name)` in CSS instead of hardcoded hex
- [ ] Use `getColor()` function in JavaScript when needed
- [ ] Test in both dark and light themes
- [ ] Update color-palette/index.html if adding new colors

## Troubleshooting

### Colors not updating?
1. Check if `colors.js` is loaded: `console.log(PROYECTUAL_COLORS)`
2. Clear browser cache
3. Reload page

### CSS variables not working?
1. Make sure you're using `var(--variable-name)` syntax
2. Check browser DevTools: Elements > Styles to verify variable is set
3. Use `getColor()` as fallback in JavaScript

### Theme not switching?
1. Check localStorage: `localStorage.getItem('theme')`
2. Call `applyTheme('dark')` or `applyTheme('light')`
3. Verify CSS variables are defined in `:root`

## Best Practices

1. **Always use CSS variables** in stylesheets instead of hardcoded hex values
2. **Use getColor()** in JavaScript when you need color values
3. **Update centrally** - never hardcode colors in individual files
4. **Test both themes** - ensure colors work in dark and light modes
5. **Document new colors** - add usage notes when creating new colors
6. **Use semantic naming** - name colors by purpose (primary, secondary) not appearance (blue, dark)

## Example: Creating a New Component

```html
<!-- HTML -->
<div class="my-new-component">
  <h2>Title</h2>
  <p>Content</p>
</div>
```

```css
/* CSS - Use variables */
.my-new-component {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 2px solid var(--accent-primary);
}

.my-new-component h2 {
  color: var(--accent-primary);
}
```

```javascript
// JavaScript - Use getColor() if needed
const componentColor = getColor('primary.blue');
console.log(`Component uses color: ${componentColor}`);
```

## Support

For questions about the color system:
1. Check `/color-palette/README.md` for detailed docs
2. Review `/js/colors.js` for all available colors
3. Open `/color-palette/index.html` to visualize colors
4. Check console for logs: `console.log(PROYECTUAL_COLORS)`
