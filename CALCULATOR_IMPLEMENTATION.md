# Carbon Footprint Calculator - Complete Implementation

## Overview

The carbon footprint calculator (`pages/carbon-calculator.html`) provides architects and designers with an interactive tool to estimate embodied and operational carbon for construction projects. The calculator features process-based lifecycle analysis (A1-A5) with multiple visualization and analysis modes.

## Core Features

### 1. Process-Based Carbon Breakdown

The calculator uses the **A1-A5 Lifecycle Assessment Framework** to break down carbon across construction stages:

- **A1: Extraction** — Mining, quarrying, harvesting materials
- **A2-A3: Processing** — Manufacturing, smelting, kiln drying, refining
- **A4: Transportation** — Moving finished materials to construction site
- **A5: Installation** — On-site assembly, welding, mortar application

### 2. Material Support

Four primary construction materials with process-specific breakdowns:

#### Concrete (400 kgCO₂e/m²)
- Extraction: 10% (40 kgCO₂e) — Aggregate quarrying
- Processing: 86% (344 kgCO₂e) — Cement production, mixing
- Transportation: 4% (16 kgCO₂e)
- Installation: 0%

#### Steel (600 kgCO₂e/m²)
- Extraction: 9% (54 kgCO₂e) — Ore mining
- Processing: 80% (480 kgCO₂e) — Blast furnace smelting
- Transportation: 6% (36 kgCO₂e)
- Installation: 5% (30 kgCO₂e) — Welding, bolting

#### Timber (80 kgCO₂e/m²)
- Extraction: 15% (12 kgCO₂e) — Felling, milling
- Processing: 56% (45 kgCO₂e) — Kiln drying, lamination
- Transportation: 25% (20 kgCO₂e) — **Distance-sensitive**
- Installation: 4% (3 kgCO₂e)

#### Brick (180 kgCO₂e/m²)
- Extraction: 20% (36 kgCO₂e) — Clay extraction
- Processing: 67% (120 kgCO₂e) — Kiln firing
- Transportation: 10% (18 kgCO₂e)
- Installation: 3% (6 kgCO₂e)

### 3. Interactive Analysis Buttons

#### Pie Chart Analysis Modes

**Lifecycle** (Default)
- Shows 4-stage process breakdown (Extraction → Processing → Transportation → Installation)
- Best for: Understanding where in the construction process carbon originates
- Reveals material-specific hotspots

**Total Impact**
- Shows 3-category view: Embodied Carbon | Operational (50yr) | Tree Offset
- Best for: Comparing embodied vs operational carbon over building lifetime
- Helps prioritize between material choices vs operational energy

**Breakdown**
- Shows original 5-category analysis: Materials | Transport | Energy | Waste | Offset
- Best for: Detailed category analysis
- Useful for sustainability reporting

#### Density Histogram Analysis Modes

**Absolute** (Default)
- Y-axis: kgCO₂e (raw carbon values)
- Shows actual magnitude of each process contribution
- Bar height = real carbon amount

**Percentage**
- Y-axis: Percentage (%)
- Each process shown as % of total material carbon
- Enables proportional comparison across materials of different scales

**Cumulative**
- Y-axis: Cumulative kgCO₂e
- Shows running total carbon through construction lifecycle
- Reveals at which stages carbon becomes significant

### 4. Input Variables

Left panel (`.inputs-panel`) contains 7 interactive input sections:

1. **Project Type** — Residential / Commercial / Mixed-use (option cards)
2. **Construction Area** — 50–1000 m² (range slider)
3. **Primary Material** — Concrete / Steel / Timber / Brick (option cards)
4. **Transport Distance** — 0–500 km (range slider, affects A4 stage)
5. **Operational Energy** — Electric / Gas / Mixed / Renewable (option cards)
6. **Construction Waste** — % recycled 0–100 (range slider)
7. **Trees Planted** — 0–500 trees (range slider, for carbon offset)

### 5. Real-Time Calculations

The calculator performs live calculations as users adjust inputs:

```
Embodied Carbon = (Material CO₂ × Area) + (Transport × Distance × Area) + (Waste Reduction × Area)
Operational Carbon = Area × Energy CO₂ × 50 years
Offset Carbon = Trees × 22 kgCO₂e/tree × 30 years
Total = Embodied + Operational + Offset
```

### 6. Visualizations

#### Pie Chart
- **Purpose:** Show proportional distribution of carbon sources
- **Updates:** Changes based on selected analysis mode (Lifecycle/Impact/Breakdown)
- **Colors:** Yellow → Orange → Light Yellow → White gradient
- **Legend:** Bottom-positioned with white text

#### Density Histogram
- **Purpose:** Show carbon concentration across processes with distribution curve
- **Bar Chart:** Color-coded by process stage
- **Density Curve:** White line with yellow points showing Gaussian distribution
- **Updates:** Bars transform based on mode (Absolute/Percentage/Cumulative)
- **Y-Axis:** Dynamic label changes with mode (kgCO₂e → % → Cumulative kgCO₂e)

### 7. Right Panel Results

The sticky results panel (`.results-panel`) shows:

- **Selection Summary** — Project type, material, area
- **Construction Process Breakdown** — Progress bars showing each lifecycle stage
  - Percentage contribution
  - Absolute CO₂ value (scaled to project area)
  - Descriptive activity label
  
- **Charts** — Pie chart (left) and density histogram (right)
- **Total CO₂e Display** — Large yellow container showing final footprint
- **Equivalence Metrics** — Tree-years to offset, car travel days equivalent
- **Disclaimer** — Note about estimate accuracy
- **CTA Button** — "Support Tree Planting" link to plantme.html

### 8. Language Support

Full bilingual support (English/Spanish):
- All labels via `data-en` / `data-es` attributes
- Language toggle button in navbar
- Chart labels, button text, and descriptions auto-switch

### 9. Theme Support

Dark/Light mode compatible:
- Dark mode: White text, yellow highlights, dark backgrounds
- Light mode: Dark text maintained via theme-specific CSS
- CSS variables used throughout for consistent theming

## Technical Architecture

### File Structure

```
pages/carbon-calculator.html
├── HTML Structure
│   ├── Navigation navbar
│   ├── Page title & description
│   ├── Calculator wrapper
│   │   ├── Inputs panel (left)
│   │   │   └── 7 calculator sections
│   │   └── Results panel (right, sticky)
│   │       ├── Selection summary
│   │       ├── Process breakdown
│   │       ├── Charts with control buttons
│   │       └── Total container + CTA
│   └── Enhanced footer
│
├── CSS Styling
│   ├── Two-column grid layout (responsive)
│   ├── Neo-brutalist design system
│   ├── Chart wrapper styling
│   ├── Interactive button styling
│   └── Breakdown item progress bars
│
└── JavaScript Logic
    ├── Global State
    │   ├── carbonState: Current input values
    │   ├── MATERIAL_PROCESSES: Process breakdown data
    │   ├── CO2_FACTORS: Calculation constants
    │   ├── currentPieMode: Selected pie chart analysis
    │   └── currentHistogramMode: Selected histogram view
    │
    ├── Core Functions
    │   ├── selectOption(): Handle material/energy selection
    │   ├── updateDisplay(): Sync all input displays
    │   ├── calculateTotal(): Recalculate all values
    │   ├── updateProcessBreakdown(): Display lifecycle stages
    │   ├── updateCharts(): Dispatch to mode-specific updates
    │   ├── updatePieChart(): Render pie with selected mode
    │   ├── updateDensityHistogram(): Render histogram with mode
    │   ├── calculateDensity(): Compute Gaussian distribution
    │   └── updateLanguage(): Switch UI language
    │
    └── Event Listeners
        ├── Slider inputs: updateDisplay()
        ├── Option card clicks: selectOption()
        ├── Pie chart buttons: updatePieChart()
        ├── Histogram buttons: updateDensityHistogram()
        ├── Language toggle: updateLanguage()
        └── DOMContentLoaded: Initialize all
```

### Key Data Structures

#### MATERIAL_PROCESSES
```javascript
{
  'Concrete': {
    total: 400,
    processes: {
      'Extraction': { value: 40, pct: 10, label: 'Mining, Quarrying' },
      'Processing': { value: 344, pct: 86, label: 'Cement, Mixing, Casting' },
      'Transportation': { value: 16, pct: 4, label: 'To Construction Site' },
      'Installation': { value: 0, pct: 0, label: 'Casting, Finishing' }
    }
  },
  // ... Steel, Timber, Brick similarly
}
```

#### carbonState
```javascript
{
  projectType: 'Residential',
  area: 200,
  material: 'Concrete',
  materialCO2: 400,
  transport: 100,
  energy: 'Electric',
  energyCO2: 200,
  waste: 50,
  trees: 50
}
```

## User Workflows

### Workflow 1: Material Comparison
1. Select Material: Concrete
2. Pie Chart (Lifecycle): See that 86% is Processing (cement)
3. Pie Chart (Impact): See embodied vs operational breakdown
4. Histogram (Absolute): See actual kgCO₂e values
5. Switch Material: Steel → See different distribution
6. Histogram (Percentage): Compare proportions

### Workflow 2: Carbon Reduction Strategy
1. Start with default project (200m² concrete)
2. Histogram (Lifecycle): Identify that processing dominates
3. Decision: Switch to low-carbon cement (hypothetically reduces processing)
4. Pie Chart (Impact): See embodied vs operational tradeoff
5. Change Area slider: See how scale affects offset requirements
6. Adjust Trees: See needed tree planting to offset total

### Workflow 3: Location-Based Analysis
1. Select Timber material (transport-sensitive)
2. Histogram (Percentage): See transport is 25%
3. Transport Distance slider: Increase from 100km to 500km
4. Histogram (Absolute): See absolute carbon increase
5. Realize: Local sourcing critical for timber projects

## Responsive Design

- **Desktop (>992px):** Two-column grid, sticky right panel
- **Tablet (768-991px):** Single column, charts stack
- **Mobile (<768px):** Full-width, compact layout, simplified controls
- Charts adapt height and legend positioning for mobile

## Browser Compatibility

- Chart.js 4.4.0 from CDN
- ES6 JavaScript (modern browsers)
- CSS Grid and Flexbox support required
- Tested on Chrome, Firefox, Safari, Edge

## Future Enhancement Opportunities

1. **Regional Variation** — Grid decarbonization affects A3 emissions
2. **Material Alternatives** — Low-carbon cement, EAF steel, FSC timber variants
3. **End-of-Life Analysis** — A5+ stages (demolition, recycling)
4. **Scenario Comparison** — Save and compare multiple configurations
5. **PDF Export** — Generate detailed carbon report
6. **Integration** — Connect to BIM/CAD workflows
7. **Real Material Data** — Link to actual EPD (Environmental Product Declaration) databases

## Data Sources & References

- [ARUP Embodied Carbon Guides](https://www.istructe.org/resources/) — Concrete, Steel, Timber
- [World Steel Association](https://worldsteel.org/climate-action/) — Steel lifecycle data
- [IEA Iron & Steel Analysis](https://www.iea.org/energy-system/industry/steel)
- [RMI Embodied Carbon 101](https://rmi.org/embodied-carbon-101/)
- [NREL Mass Timber Carbon Study](https://www.nrel.gov/)
- [ACS Environmental Science & Technology](https://pubs.acs.org/) — Brick production

## Version History

- **v1.0** (Current): Complete process-based calculator with multiple analysis modes, interactive buttons, real-time calculations, bilingual support, responsive design
- **v0.2**: Added density histogram with cumulative/percentage modes
- **v0.1**: Initial calculator with 5-category breakdown and polar chart
