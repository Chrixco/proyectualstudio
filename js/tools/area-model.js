/**
 * Area model — gross floor area vs. the area that actually earns
 *
 * Every tool here used to multiply one "size" figure by both a cost rate
 * and a rent rate. That quietly assumes the stair core, the plant room and
 * the garage ramp let for the same price per m² as a living room, and it
 * leaves an underground garage with nowhere to go: entered as "size" it
 * earns rent instead of eating the budget.
 *
 * So area is split in two. Everything above ground carries the
 * construction rate; only the sellable part carries the rent and the
 * selling price. The garage is its own object, with its own cost and its
 * own income.
 *
 *   Plot area                          -> achieved FAR (GFZ / CUS)
 *   |- Gross floor area above ground   -> COST basis
 *   |  |- Sellable / rentable (NFA)    -> REVENUE basis
 *   |  |- Structure and walls          (Konstruktionsgrundflaeche)
 *   |  |- Circulation                  (stairs, corridors, lobby, lifts)
 *   |  '- Technical and service        (plant, meters, waste, bikes)
 *   |- Balconies and terraces          cost a fraction of the rate,
 *   |                                  count a fraction toward lettable area
 *   '- Underground garage              own cost per space, own revenue
 *
 * The category names follow DIN 277-1, which splits gross floor area into
 * Nutzungsfläche, Verkehrsfläche, Technische Funktionsfläche and
 * Konstruktions-Grundfläche. The balcony credit follows the German
 * Wohnflächenverordnung (WoFlV) §4: balconies, loggias and terraces count
 * one quarter of their area toward living area, one half at most.
 *
 * The percentages below are planning-grade defaults for apartment
 * buildings, not survey figures — every one of them is editable in the
 * tool, and a real scheme should overwrite them from its own area
 * schedule. They are set from published benchmarks:
 *
 *   Germany, DIN 277 apartment buildings (MFH)
 *     Konstruktionsgrundflaeche  16-18% of BGF
 *     Verkehrsflaeche            12-18% of BGF
 *     Technische Funktionsflaeche 2-5%  of BGF
 *     Nutzungsflaeche landing at 65-70% of BGF as a result
 *   International apartment stock
 *     net-to-gross 70-75% typical, 82%+ for a tightly planned scheme,
 *     circulation and common area 15-30% depending on building type
 *
 * An underground space needs roughly 28-32 m² once ramps and aisles are
 * counted, well above the 12.5 m² of the bay itself. German underground
 * spaces cost EUR 25-50k each to build and let for EUR 87-117 a month in
 * the large cities; the Ecuadorian figures are the practice's own, and
 * carry no published source.
 *
 * Permitted density for reference: BauNVO §17 caps GFZ at 1.2 for German
 * residential zones (WR/WA), while Ecuadorian plot rights come from the
 * COS/CUS pair in the municipal regulation sheet (Quito's IRM), where a
 * CUS of 200-400% is ordinary in consolidated urban land.
 */
(function () {
  'use strict';

  window.AREA_DEFAULTS = {
    ecuador: {
      structurePct: 0.12,        // walls and structure, share of gross area
      circulationPct: 0.10,      // stairs, corridors, lobby, lifts
      technicalPct: 0.03,        // plant, meters, waste, storage
      // 75% sellable, the upper half of the 70-75% band apartment stock
      // usually reports — a frame-and-block envelope is thinner than a
      // German insulated one.
      balconyPct: 0.08,          // balcony area, share of gross area
      balconyCostFactor: 0.5,    // built at about half the interior rate
      balconyValueFactor: 0.30,  // share counting toward lettable area
      m2PerSpace: 28,            // incl. ramps and aisles
      costPerSpace: 12000,
      parkingRentPerSpace: 35,   // per month
      parkingSalePrice: 10000,
      typicalFar: 3.0            // CUS 300%, consolidated urban land
    },
    germany: {
      structurePct: 0.15,        // DIN 277 KGF, 16-18% band for MFH
      circulationPct: 0.12,      // DIN 277 VF, 12-18% band for MFH
      technicalPct: 0.04,        // DIN 277 TF, 2-5% band
      // Leaves 69% Nutzungsflaeche, inside the 65-70% reported for
      // German apartment buildings.
      balconyPct: 0.07,
      balconyCostFactor: 0.5,
      balconyValueFactor: 0.25,  // WoFlV §4
      m2PerSpace: 30,
      costPerSpace: 35000,       // EUR 25-50k per underground space
      parkingRentPerSpace: 95,   // EUR 87-117 in the large cities
      parkingSalePrice: 30000,
      typicalFar: 1.2            // BauNVO §17, WR/WA
    }
  };

  /**
   * Building types, as one click.
   *
   * A reader who knows they are drawing a point block should not have to
   * guess that its core is twice the width of a walk-up's stair. Each
   * type is stated as a factor on the market's own default programme
   * rather than as fixed percentages, so "standard block" stays the
   * German standard block in Germany and the Ecuadorian one in Ecuador —
   * the two markets do not build the same wall.
   *
   * The spread across the four follows the published bands: circulation
   * and common space runs 15-30% of gross area by building type, and
   * apartment net-to-gross runs 70-75% typically, 82%+ tightly planned.
   */
  window.AREA_PRESETS = [
    {
      id: 'lowrise',
      en: 'Low-rise / row', es: 'Baja altura / adosado',
      structure: 0.85, circulation: 0.5, technical: 0.6, balcony: 0.8,
      noteEn: 'Own front door, almost no shared circulation — the most efficient plan there is',
      noteEs: 'Puerta propia, casi sin circulación común — la planta más eficiente que existe'
    },
    {
      id: 'slab',
      en: 'Efficient slab', es: 'Bloque eficiente',
      structure: 0.92, circulation: 0.78, technical: 0.85, balcony: 0.9,
      noteEn: 'One corridor serving flats on both sides; a tightly planned scheme reaches 82% sellable',
      noteEs: 'Un pasillo sirviendo a ambos lados; bien planificado llega al 82% vendible'
    },
    {
      id: 'standard',
      en: 'Standard block', es: 'Bloque estándar',
      structure: 1, circulation: 1, technical: 1, balcony: 1,
      noteEn: 'The ordinary apartment building — lobby, two lifts, stair core. The market default.',
      noteEs: 'El edificio de vivienda corriente — vestíbulo, dos ascensores, núcleo de escaleras. El estándar del mercado.'
    },
    {
      id: 'tower',
      en: 'Tower / point block', es: 'Torre / bloque puntual',
      structure: 1.13, circulation: 1.25, technical: 1.25, balcony: 1.15,
      noteEn: 'Height costs area: thicker structure, more lifts, pressurised escape stairs',
      noteEs: 'La altura cuesta área: más estructura, más ascensores, escaleras presurizadas'
    }
  ];

  /**
   * A building type resolved against a market, in whole percent — the
   * unit the sliders are in, so applying a preset and recognising one
   * round-trip exactly.
   */
  window.typologyProgramme = function (country, id) {
    var d = window.AREA_DEFAULTS[country] || window.AREA_DEFAULTS.ecuador;
    var preset = window.AREA_PRESETS.filter(function (p) { return p.id === id; })[0];
    if (!preset) return null;
    return {
      structurePct: Math.round(d.structurePct * 100 * preset.structure),
      circulationPct: Math.round(d.circulationPct * 100 * preset.circulation),
      technicalPct: Math.round(d.technicalPct * 100 * preset.technical),
      balconyPct: Math.round(d.balconyPct * 100 * preset.balcony)
    };
  };

  /**
   * Parking provision, expressed the way a brief states it: one space per
   * so many square metres of sellable area. 80 m² stands in for one flat,
   * which is what a German Stellplatzschlüssel of 1.0 per dwelling means
   * in area terms.
   */
  window.PARKING_RATIOS = [
    { id: 'none', per: 0, en: 'No garage', es: 'Sin garaje' },
    { id: 'light', per: 120, en: '1 / 120 m²', es: '1 / 120 m²' },
    { id: 'flat', per: 80, en: '1 per flat', es: '1 por depto.' },
    { id: 'generous', per: 60, en: '1 / 60 m²', es: '1 / 60 m²' }
  ];

  /** Non-rentable deductions can never swallow the whole building. */
  var MAX_DEDUCTION = 0.6;

  function num(value, fallback) {
    var n = parseFloat(value);
    return (isFinite(n) && n >= 0) ? n : fallback;
  }

  /**
   * Turn an area programme into areas and construction cost.
   *
   * Returns plain numbers only; nothing here touches the DOM, so the
   * budget and carbon tools can adopt it without inheriting the
   * investment page's markup.
   */
  window.computeAreaSchedule = function (input) {
    input = input || {};
    var d = window.AREA_DEFAULTS[input.country] || window.AREA_DEFAULTS.ecuador;

    var gfa = num(input.gfa, 0);
    var ratePerM2 = num(input.ratePerM2, 0);
    var plotArea = num(input.plotArea, 0);

    var structurePct = num(input.structurePct, d.structurePct);
    var circulationPct = num(input.circulationPct, d.circulationPct);
    var technicalPct = num(input.technicalPct, d.technicalPct);
    var balconyPct = num(input.balconyPct, d.balconyPct);
    var balconyCostFactor = num(input.balconyCostFactor, d.balconyCostFactor);
    var balconyValueFactor = num(input.balconyValueFactor, d.balconyValueFactor);

    // A programme that deducts more than it builds is a typo, not a
    // scheme. Scale the three shares back proportionally and say so,
    // rather than reporting a negative sellable area.
    var deduction = structurePct + circulationPct + technicalPct;
    var overrun = deduction > MAX_DEDUCTION;
    if (overrun && deduction > 0) {
      var scale = MAX_DEDUCTION / deduction;
      structurePct *= scale;
      circulationPct *= scale;
      technicalPct *= scale;
      deduction = MAX_DEDUCTION;
    }

    var structureArea = gfa * structurePct;
    var circulationArea = gfa * circulationPct;
    var technicalArea = gfa * technicalPct;
    var sellableArea = gfa * (1 - deduction);

    var balconyArea = gfa * balconyPct;
    var balconyCredit = balconyArea * balconyValueFactor;
    // What rent and selling price are actually charged on: the interior
    // sellable area plus the balcony share the market pays for.
    var lettableArea = sellableArea + balconyCredit;

    var spaces = Math.max(0, Math.round(num(input.parkingSpaces, 0)));
    var m2PerSpace = num(input.m2PerSpace, d.m2PerSpace);
    var costPerSpace = num(input.costPerSpace, d.costPerSpace);
    var garageArea = spaces * m2PerSpace;
    var garageCost = spaces * costPerSpace;

    var aboveGroundCost = gfa * ratePerM2;
    var balconyCost = balconyArea * ratePerM2 * balconyCostFactor;
    var constructionCost = aboveGroundCost + balconyCost + garageCost;

    return {
      gfa: gfa,
      plotArea: plotArea,
      structureArea: structureArea,
      circulationArea: circulationArea,
      technicalArea: technicalArea,
      sellableArea: sellableArea,
      balconyArea: balconyArea,
      balconyCredit: balconyCredit,
      lettableArea: lettableArea,
      spaces: spaces,
      m2PerSpace: m2PerSpace,
      garageArea: garageArea,
      // Total built area including the basement, which is what the site
      // is really asked to carry.
      builtArea: gfa + garageArea,
      aboveGroundCost: aboveGroundCost,
      balconyCost: balconyCost,
      garageCost: garageCost,
      costPerSpace: costPerSpace,
      constructionCost: constructionCost,
      // Sellable over gross: the number a developer is judged on.
      efficiency: gfa > 0 ? sellableArea / gfa : 0,
      lettableEfficiency: gfa > 0 ? lettableArea / gfa : 0,
      // Gross area over plot area. Garages below grade are excluded, as
      // both GFZ and CUS generally are.
      achievedFar: plotArea > 0 ? gfa / plotArea : null,
      deductionOverrun: overrun
    };
  };

  /**
   * The inverse, for the tool's "calculate by construction cost" mode:
   * given a construction budget, how much gross area does it buy?
   *
   * The garage is paid for first — it is a fixed count of spaces, not a
   * residual — and the remaining budget is divided by the rate the
   * balcony allowance has been folded into.
   */
  window.gfaFromBudget = function (budget, input) {
    input = input || {};
    var d = window.AREA_DEFAULTS[input.country] || window.AREA_DEFAULTS.ecuador;

    var ratePerM2 = num(input.ratePerM2, 0);
    if (ratePerM2 <= 0) return 0;

    var spaces = Math.max(0, Math.round(num(input.parkingSpaces, 0)));
    var costPerSpace = num(input.costPerSpace, d.costPerSpace);
    var balconyPct = num(input.balconyPct, d.balconyPct);
    var balconyCostFactor = num(input.balconyCostFactor, d.balconyCostFactor);

    var remaining = num(budget, 0) - spaces * costPerSpace;
    var effectiveRate = ratePerM2 * (1 + balconyPct * balconyCostFactor);

    return Math.max(0, remaining / effectiveRate);
  };
})();
