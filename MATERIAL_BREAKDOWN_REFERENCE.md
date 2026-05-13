# Construction Process Carbon Breakdown Reference

This document outlines the process-based carbon lifecycle data integrated into the carbon footprint calculator (`pages/carbon-calculator.html`), organized by construction stages (A1-A5 framework).

## Lifecycle Assessment Framework

The calculator uses the **A1-A5 standard framework** from ISO 14040/14044:

- **A1: Extraction** — Raw material extraction, mining, quarrying (including initial processing)
- **A2-A3: Processing** — Manufacturing, refining, smelting, kiln drying, lamination
- **A4: Transportation** — Moving finished products to construction site
- **A5: Installation** — On-site assembly, welding, mortar application, finishing

## Data Sources

Research compiled from:
- [Embodied Carbon 101: Building Materials - RMI](https://rmi.org/embodied-carbon-101/)
- [Embodied Carbon in Concrete (ARUP/IStructE)](https://www.istructe.org/IStructE/media/Public/Resources/ARUP-Embodied-carbon-concrete_1.pdf)
- [Embodied Carbon in Steel (ARUP/IStructE)](https://www.istructe.org/IStructE/media/Public/Resources/ARUP-Embodied-carbon-steel.pdf)
- [Embodied Carbon in Timber (ARUP/IStructE)](https://www.istructe.org/IStructE/media/Public/Resources/ARUP-Embodied-carbon-timber-v2.pdf)
- [SteelConstruction.info - Life Cycle Assessment](https://www.steelconstruction.info/Life_cycle_assessment_and_embodied_carbon)
- [Clearing the Air on A4 Emissions - Ramboll](https://www.ramboll.com/insights/decarbonise-for-net-zero/clearing-the-air-on-a4-emissions-a-guide-for-timber-construction)

## Process Breakdown by Material

### Concrete (400 kgCO₂e/m²)

| Process | kgCO₂e/m² | % | Activities |
|---------|-----------|-------|-----------|
| **Extraction (A1)** | 40 | 10% | Mining, quarrying aggregates |
| **Processing (A2-A3)** | 344 | 86% | Cement production, mixing, casting |
| **Transportation (A4)** | 16 | 4% | Transport to construction site |
| **Installation (A5)** | 0 | 0% | Placement & curing (energy negligible) |

**Key Insight:** Cement production dominates (86%), offering the largest decarbonization opportunity through low-carbon cement alternatives (e.g., supplementary cementitious materials, limestone calcined clay cement).

---

### Steel (600 kgCO₂e/m²)

| Process | kgCO₂e/m² | % | Activities |
|---------|-----------|-------|-----------|
| **Extraction (A1)** | 54 | 9% | Ore mining, preparation |
| **Processing (A2-A3)** | 480 | 80% | Blast furnace smelting, rolling, fabrication |
| **Transportation (A4)** | 36 | 6% | Transport to construction site |
| **Installation (A5)** | 30 | 5% | Welding, bolting, assembly |

**Key Insight:** Smelting dominates (80%). Electric arc furnaces (EAF) using scrap steel can reduce this to ~200 kgCO₂e/m², cutting total by 65%.

---

### Timber (80 kgCO₂e/m²)

| Process | kgCO₂e/m² | % | Activities |
|---------|-----------|-------|-----------|
| **Extraction (A1)** | 12 | 15% | Felling, initial sawmilling |
| **Processing (A2-A3)** | 45 | 56% | Kiln drying, kiln-dry lumber, lamination, gluing |
| **Transportation (A4)** | 20 | 25% | Transport to site (highly distance-sensitive) |
| **Installation (A5)** | 3 | 4% | Fastening, assembly |

**Key Insight:** Transportation (25%) is a major factor for timber — local sourcing can reduce footprint by 5-20 kgCO₂e/m². Drying method (kiln vs. air) significantly affects A3.

---

### Brick (180 kgCO₂e/m²)

| Process | kgCO₂e/m² | % | Activities |
|---------|-----------|-------|-----------|
| **Extraction (A1)** | 36 | 20% | Clay extraction, preparation |
| **Processing (A2-A3)** | 120 | 67% | Kiln firing (coal, gas, or biomass) |
| **Transportation (A4)** | 18 | 10% | Transport to construction site |
| **Installation (A5)** | 6 | 3% | Mortar application, pointing |

**Key Insight:** Firing (67%) is the critical stage. Alternative fuels (biomass), recovered heat, and waste clay bricks can reduce emissions by 30-50%.

---

## Implementation in Calculator

The process-based breakdown is stored in the JavaScript `MATERIAL_PROCESSES` object:

```javascript
const MATERIAL_PROCESSES = {
  'Concrete': {
    total: 400,
    processes: {
      'Extraction': { value: 40, pct: 10, label: 'Mining, Quarrying' },
      'Processing': { value: 344, pct: 86, label: 'Cement, Mixing, Casting' },
      'Transportation': { value: 16, pct: 4, label: 'To Construction Site' },
      'Installation': { value: 0, pct: 0, label: 'Casting, Finishing' }
    }
  },
  // ... (Steel, Timber, Brick similarly)
};
```

## Calculator Features

1. **Construction Process Display** — Below selection summary, shows:
   - 4 lifecycle stages (Extraction → Processing → Transportation → Installation)
   - Percentage contribution of each stage
   - Absolute CO₂ value scaled to project area
   - Descriptive labels for each process type

2. **Dynamic Charts** — Pie and polar area charts update to show process-based breakdown:
   - Different colors for each lifecycle stage
   - Visual comparison across materials
   - Easy identification of high-impact processes

3. **Area Scaling** — All values automatically recalculate based on construction area input

4. **Bilingual Support** — Process labels available in English and Spanish

## Design Decision: Why Process-Based?

**Architects benefit from process-focused data because:**

1. **Intervention Clarity** — Shows exactly where carbon reduction strategies apply:
   - Low-carbon cement (A3)
   - Local material sourcing (A4)
   - Recycled/scrap metals (A1)
   - Assembly efficiency (A5)

2. **Material Comparison** — Reveals where each material's "hotspots" are:
   - Concrete: Focus on cement
   - Steel: Focus on smelting method (BF-BOF vs EAF)
   - Timber: Focus on transportation distance
   - Brick: Focus on kiln fuel type

3. **Circular Economy Signals** — Recycled/reclaimed materials improve A1 & A2 stages

4. **Standards Alignment** — Follows ISO 14040/14044 and EPD (Environmental Product Declaration) conventions

## Future Enhancements

- **Regional Variation** — Grid decarbonization improves A3 (e.g., renewable electricity)
- **Alternative Materials** — Add low-carbon variants (low-carbon concrete, EAF steel, FSC timber)
- **End-of-Life (A5+)** — Include demolition, recycling potential
- **Scenario Modeling** — "What if we use X% recycled content?" or "What if sourced locally?"
