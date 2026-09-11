/**
 * Proyectual Studio — Chart theme
 *
 * One place where every calculator diagram gets its surface, type and
 * palette. Before this file each page hard-coded its own colours inline,
 * which drifted badly: the carbon charts passed the literal string
 * `var(--color-black)` to Chart.js (a canvas cannot resolve a CSS custom
 * property, so the labels silently fell back to grey #666 on a black box)
 * and the investment charts drew white ticks on a white panel.
 *
 * The charts sit on a charcoal plot surface. Values come from the CSS
 * custom properties defined in css/tools.css, read once at load, so the
 * stylesheet stays the single source of truth for the palette.
 *
 * Load AFTER the Chart.js bundle and BEFORE the page's own chart code.
 */
(function (global) {
  'use strict';

  var FALLBACK = {
    surface: '#2B2B2B',
    ink: '#F2F2F2',        // ~13:1 on the surface
    inkMuted: '#C4C4C4',   // ~7.6:1 — axis ticks, secondary labels
    grid: 'rgba(255, 255, 255, 0.14)',
    border: 'rgba(255, 255, 255, 0.28)',
    accent: '#38B6FF'
  };

  var FONT_FAMILY = "'Space Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

  /**
   * Categorical series colours. Every entry clears 4.5:1 against the
   * charcoal surface, and neighbouring entries differ in hue *and*
   * lightness so the ramp survives greyscale printing and the common
   * forms of colour blindness.
   */
  var SERIES = [
    '#FFD500', // brand yellow    10.4:1
    '#F58A2E', // orange           5.8:1
    '#4EC9F5', // cyan             7.7:1
    '#8BE08A', // green            9.1:1
    '#FF8A8A', // coral            5.9:1
    '#C9A6FF', // violet           7.3:1
    '#E8E8E8', // light grey      11.8:1
    '#9AA7B8'  // slate            5.2:1
  ];

  var cache = null;

  function readToken(styles, name, fallback) {
    var value = styles.getPropertyValue(name);
    return value && value.trim() ? value.trim() : fallback;
  }

  /** Resolved theme tokens, read from the page's CSS custom properties. */
  function tokens() {
    if (cache) return cache;
    var host = document.body || document.documentElement;
    var styles = global.getComputedStyle(host);
    cache = {
      surface: readToken(styles, '--chart-surface', FALLBACK.surface),
      ink: readToken(styles, '--chart-ink', FALLBACK.ink),
      inkMuted: readToken(styles, '--chart-ink-muted', FALLBACK.inkMuted),
      grid: readToken(styles, '--chart-grid', FALLBACK.grid),
      border: readToken(styles, '--chart-border', FALLBACK.border),
      accent: readToken(styles, '--chart-accent', FALLBACK.accent)
    };
    return cache;
  }

  /** Drop the cache when the page theme changes under us. */
  function refresh() {
    cache = null;
    applyDefaults();
  }

  /** `#RRGGBB` plus an alpha, for fills under a solid stroke. */
  function alpha(color, a) {
    var hex = String(color).trim();
    if (hex.charAt(0) !== '#' || (hex.length !== 7 && hex.length !== 4)) return hex;
    if (hex.length === 4) {
      hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    }
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
  }

  /**
   * Axis and tooltip money. The sign goes before the currency symbol —
   * the axes read "-$800k", not "$-800k" — and `compact` shortens
   * thousands so a tick column stays narrow.
   */
  function money(symbol, value, compact) {
    var sign = value < 0 ? '-' : '';
    var abs = Math.abs(value);
    var body;
    if (compact && abs >= 1000000) {
      body = (abs / 1000000).toFixed(abs >= 10000000 ? 0 : 1) + 'M';
    } else if (compact && abs >= 1000) {
      body = Math.round(abs / 1000) + 'k';
    } else {
      body = Math.round(abs).toLocaleString();
    }
    return sign + symbol + body;
  }

  /** n distinct series colours, cycling once the palette runs out. */
  function palette(n) {
    var out = [];
    for (var i = 0; i < n; i++) out.push(SERIES[i % SERIES.length]);
    return out;
  }

  function seriesColor(i) {
    return SERIES[i % SERIES.length];
  }

  /**
   * Axis config. `opts.title` adds a unit caption, `opts.tickCallback`
   * formats the values, `opts.grid: false` drops the grid lines (right
   * hand axes, categorical axes on small charts).
   */
  function axis(opts) {
    opts = opts || {};
    var t = tokens();
    var config = {
      border: { color: t.border },
      grid: {
        color: opts.grid === false ? 'transparent' : t.grid,
        drawOnChartArea: opts.grid !== false,
        tickColor: t.border,
        lineWidth: 1
      },
      ticks: {
        color: opts.tickColor || t.inkMuted,
        font: { family: FONT_FAMILY, size: opts.tickSize || 11 },
        padding: 8,
        // `autoSkip: false` keeps every category label on a bar chart —
        // a dropped label leaves a bar with nothing naming it. Rotation
        // is the escape valve when the column is too narrow.
        autoSkip: opts.autoSkip !== false,
        autoSkipPadding: 12,
        minRotation: 0,
        maxRotation: opts.maxRotation != null ? opts.maxRotation : 0
      }
    };
    if (opts.tickCallback) config.ticks.callback = opts.tickCallback;
    if (opts.beginAtZero) config.beginAtZero = true;
    if (opts.title) {
      config.title = {
        display: true,
        text: opts.title,
        color: opts.titleColor || t.ink,
        font: { family: FONT_FAMILY, size: 11, weight: 'bold' },
        padding: { top: 4, bottom: 6 }
      };
    }
    return config;
  }

  /** Legend config: square swatches, generous hit area, readable ink. */
  function legend(opts) {
    opts = opts || {};
    var t = tokens();
    var config = {
      display: opts.display !== false,
      position: opts.position || 'bottom',
      align: 'start',
      labels: {
        color: t.ink,
        font: { family: FONT_FAMILY, size: opts.size || 11, weight: 'bold' },
        boxWidth: 12,
        boxHeight: 12,
        borderRadius: 2,
        useBorderRadius: true,
        padding: opts.padding || 14
      }
    };
    // `hide` drops datasets from the key by index. A bar series coloured
    // per category would otherwise show one swatch in the first bar's
    // colour, which reads as a claim about the whole series. Indices,
    // not labels: the labels are translated at runtime.
    if (opts.hide && opts.hide.length) {
      config.labels.filter = function (item) {
        return opts.hide.indexOf(item.datasetIndex) === -1;
      };
    }
    return config;
  }

  /** Tooltip config: solid, high contrast, never translucent over data. */
  function tooltip(opts) {
    opts = opts || {};
    var t = tokens();
    var config = {
      backgroundColor: '#111111',
      titleColor: t.accent,
      bodyColor: '#FFFFFF',
      borderColor: t.accent,
      borderWidth: 2,
      cornerRadius: 6,
      padding: 10,
      displayColors: true,
      boxPadding: 4,
      titleFont: { family: FONT_FAMILY, size: 12, weight: 'bold' },
      bodyFont: { family: FONT_FAMILY, size: 12 }
    };
    if (opts.callbacks) config.callbacks = opts.callbacks;
    return config;
  }

  /**
   * Pie and doughnut arcs: a border in the surface colour so adjacent
   * slices stay separable even when their fills are close in value.
   */
  function arcBorder() {
    return { borderColor: tokens().surface, borderWidth: 3 };
  }

  /** Chart.js global defaults, so anything not passed explicitly is sane. */
  function applyDefaults() {
    if (!global.Chart) return;
    var t = tokens();
    var C = global.Chart;
    C.defaults.font.family = FONT_FAMILY;
    C.defaults.font.size = 12;
    C.defaults.color = t.ink;
    C.defaults.borderColor = t.grid;
    C.defaults.plugins.legend.labels.color = t.ink;
    C.defaults.plugins.legend.labels.boxWidth = 12;
    C.defaults.plugins.legend.labels.boxHeight = 12;
    C.defaults.plugins.tooltip.backgroundColor = '#111111';
    C.defaults.plugins.tooltip.bodyColor = '#FFFFFF';
    C.defaults.plugins.tooltip.titleColor = t.accent;
    C.defaults.plugins.tooltip.borderColor = t.accent;
    C.defaults.plugins.tooltip.borderWidth = 2;
    C.defaults.plugins.tooltip.padding = 10;
    C.defaults.maintainAspectRatio = false;
    C.defaults.layout = C.defaults.layout || {};
    C.defaults.layout.padding = { top: 8, right: 12, bottom: 4, left: 4 };
    // Honour the OS reduced-motion setting, same as the CSS layer does.
    if (global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      C.defaults.animation = false;
    }
  }

  global.ProyectualCharts = {
    FONT_FAMILY: FONT_FAMILY,
    SERIES: SERIES,
    tokens: tokens,
    refresh: refresh,
    alpha: alpha,
    money: money,
    palette: palette,
    seriesColor: seriesColor,
    axis: axis,
    legend: legend,
    tooltip: tooltip,
    arcBorder: arcBorder,
    applyDefaults: applyDefaults
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyDefaults);
  } else {
    applyDefaults();
  }
})(window);
