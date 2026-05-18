# Proyectual Studio - Unified Theme System

## Overview
This document describes the complete, unified theme system that serves as the single source of truth for all colors and theme management across the application.

## Architecture

### Three Core Components

#### 1. **colors.js** - Single Source of Truth
- Defines all CSS variables for both light and dark themes
- Contains brand colors and theme-specific color values
- Provides `applyTheme()` function to apply variables to the DOM
- **Never modify CSS variables elsewhere** - all changes go here

**Location:** `/js/colors.js`

**Structure:**
```javascript
PROYECTUAL_COLORS = {
  brand: { /* immutable brand colors */ },
  cssVariables: {
    lightTheme: { /* all CSS variables for light mode */ },
    darkTheme: { /* all CSS variables for dark mode */ }
  }
}
```

#### 2. **theme.js** - Theme Switching Logic
- Manages theme state (light vs dark)
- Handles localStorage persistence
- Provides `toggleTheme()` and `setTheme()` functions
- Sets/removes `data-theme` attribute on document root
- Integrates with HTML theme toggle button

**Location:** `/js/theme.js`

**Key Behavior:**
- Light Mode: `data-theme` attribute **removed** (default state)
- Dark Mode: `data-theme="light"` attribute **set**

#### 3. **styles.css** - CSS Implementation
- Defines `:root` selector for light mode (default)
- Defines `:root[data-theme="light"]` selector for dark mode
- Uses CSS variables throughout - **no hardcoded colors**
- Smooth transitions between themes

**Location:** `/css/styles.css`

## Color System

### Light Mode (Default)
- **Background:** White (#FFFFFF)
- **Text:** Black (#000000)
- **Accents:** Blue (#0099FF)
- **Borders:** Black
- **Shadows:** Black with full opacity

### Dark Mode (data-theme="light")
- **Background:** Black (#000000)
- **Text:** White (#FFFFFF)
- **Accents:** Yellow (#FFD500)
- **Borders:** Yellow
- **Shadows:** Yellow with full opacity

## CSS Variables Reference

### Core Brutalist Colors
```css
--brutalist-yellow    /* Accent color (mode-dependent) */
--brutalist-black     /* Always #000000 */
--brutalist-white     /* Always #FFFFFF */
```

### Theme-Specific Colors
```css
--bg-primary          /* Main background */
--bg-secondary        /* Secondary background */
--text-primary        /* Main text color */
--text-secondary      /* Secondary text color */
--accent-primary      /* Primary accent */
--accent-secondary    /* Secondary accent */
```

### Effects & Styling
```css
--brutalist-shadow    /* Drop shadow effect */
--glass-bg           /* Semi-transparent background */
--glass-border       /* Glass effect border */
--glass-overlay      /* Overlay color */
--shadow-color       /* Shadow color (mode-dependent) */
--panel-border-radius /* Standard border radius */
```

### Utility Colors
```css
--button-blue                /* Blue button color */
--bg-white-ultra-light      /* Very light white overlay */
--bg-white-opaque           /* Opaque white background */
--bg-semi-dark              /* Semi-transparent dark overlay */
```

## Usage Rules

### ✅ DO
1. Use CSS variables for ALL colors: `color: var(--text-primary);`
2. Add new color definitions to `colors.js` in both `lightTheme` and `darkTheme`
3. Update CSS selectors to use the new variable
4. Use localStorage theme preference through theme.js

### ❌ DON'T
1. Hardcode hex colors in CSS or inline styles
2. Modify CSS variables directly in styles.css `:root` selectors
3. Use old color naming conventions
4. Implement separate color systems for different pages

## Theme Detection

The system uses:
- **HTML Attribute:** `data-theme="light"` on `<html>` element for dark mode
- **localStorage:** `theme` key stores user preference (`"light"` or `"dark"`)
- **Default:** Light mode (no attribute = light mode)

## Implementation Checklist

When adding new elements or pages:

- [ ] All colors use CSS variables: `var(--variable-name)`
- [ ] No hardcoded hex values or rgba in CSS
- [ ] Theme toggle button includes `id="theme-toggle"`
- [ ] Both theme.js and colors.js are loaded before custom scripts
- [ ] CSS imports styles.css
- [ ] Test both light and dark modes

## File Dependencies

```
theme.js
  ↓
colors.js (applies variables to DOM)
  ↓
styles.css (uses CSS variables)
  ↓
HTML pages (inherit colors from CSS)
```

## Testing the System

1. Open any page in light mode (default)
2. Click theme toggle button (half/full circle)
3. Page should switch to dark mode
4. Refresh page - dark mode should persist
5. Click toggle again to return to light mode
6. Refresh page - light mode should persist

## Troubleshooting

**Theme not applying:**
- Verify `colors.js` loads before `theme.js`
- Check localStorage theme value: `localStorage.getItem('theme')`
- Check `data-theme` attribute on `<html>` element
- Verify CSS variables are set: Right-click → Inspect → Computed Styles

**Colors look wrong:**
- Ensure no hardcoded colors override CSS variables
- Check that element uses correct CSS variable
- Verify variable exists in both lightTheme and darkTheme in colors.js
- Check CSS specificity - CSS variables shouldn't be overridden by more specific selectors

**Variables not defined:**
- Add to both `lightTheme` and `darkTheme` in colors.js
- Ensure consistent naming (kebab-case with -- prefix)
- Don't create page-specific variables - use unified system

## Notes

- The naming `data-theme="light"` for dark mode is counterintuitive but retained for backward compatibility
- CSS variables cascade, so dark mode overrides only what's necessary
- All variables default to light mode and are overridden by dark mode selectors
- The system supports instant theme switching with smooth CSS transitions

---
Last updated: 2026-05-18
