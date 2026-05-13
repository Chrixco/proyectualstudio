# Material Carbon Breakdown Reference

This document outlines the material composition data integrated into the carbon footprint calculator (`pages/carbon-calculator.html`).

## Data Sources
Research compiled from:
- [Environmental impact of concrete - Wikipedia](https://en.wikipedia.org/wiki/Environmental_impact_of_concrete)
- [Embodied Carbon in Concrete (ARUP/IStructE)](https://www.istructe.org/IStructE/media/Public/Resources/ARUP-Embodied-carbon-concrete_1.pdf)
- [Climate change and steel production - World Steel Association](https://worldsteel.org/climate-action/climate-change-and-the-production-of-iron-and-steel/)
- [Iron & Steel - IEA](https://www.iea.org/energy-system/industry/steel)
- [Embodied Carbon in Timber (ARUP/IStructE)](https://www.istructe.org/IStructE/media/Public/Resources/ARUP-Embodied-carbon-timber-v2.pdf)
- [Greenhouse Gas Emissions from Clay Brick Production - ACS Environmental Science & Technology](https://pubs.acs.org/doi/10.1021/acs.est.4c08994)

## Material Compositions

### Concrete (400 kgCO₂e/m²)
Based on lifecycle assessment data, typical concrete composition CO₂ distribution:

| Component | kgCO₂e/m² | % of Total |
|-----------|-----------|-----------|
| Cement Production | 352 | 88% |
| Steel Reinforcement | 40 | 10% |
| Aggregates & Admixtures | 8 | 2% |

**Notes:**
- Cement is the dominant carbon contributor due to clinker production (90% of cement emissions)
- Aggregates (sand, gravel) generate minimal emissions despite making up 70% of concrete volume
- Steel reinforcement contribution varies based on recycled content

### Steel (600 kgCO₂e/m²)
Based on Blast Furnace-Basic Oxygen Furnace (BF-BOF) production data:

| Component | kgCO₂e/m² | % of Total |
|-----------|-----------|-----------|
| Ore Extraction & Processing | 54 | 9% |
| Blast Furnace Smelting | 450 | 75% |
| Processing & Finishing | 96 | 16% |

**Notes:**
- Energy consumption is heavily concentrated in blast furnaces (75% of energy)
- Coal accounts for ~70% of feedstock in traditional steel production
- Electric Arc Furnaces (EAF) produce significantly lower emissions (~0.68 t CO₂/t steel vs 2.33 t/t for BF-BOF)

### Timber (80 kgCO₂e/m²)
Based on lifecycle assessment data for processed structural timber:

| Component | kgCO₂e/m² | % of Total |
|-----------|-----------|-----------|
| Extraction & Processing | 48 | 60% |
| Manufacturing (Drying, Gluing) | 28.8 | 36% |
| Transportation | 3.2 | 4% |

**Notes:**
- Transportation represents only 4% of total A1-A5 embodied energy
- Manufacturing includes energy for kiln drying (~15%) and glue application (~22% for CLT)
- Carbon impact varies significantly by forest location and processing methods
- Timber has the lowest embodied carbon among major structural materials

### Brick (180 kgCO₂e/m²)
Based on fired clay brick production data:

| Component | kgCO₂e/m² | % of Total |
|-----------|-----------|-----------|
| Clay Extraction | 36 | 20% |
| Firing Energy | 126 | 70% |
| Transportation | 18 | 10% |

**Notes:**
- Firing is the energy-intensive step (70% of emissions)
- Coal is the most commonly used kiln fuel, contributing to high GHG intensity
- Traditional clay brick: ~0.48 kg CO₂eq per kg of brick
- Alternative bricks (K-Briq, fly ash) can reduce emissions to <5% of traditional clay brick

## Implementation in Calculator

These breakdowns are stored in the JavaScript `MATERIAL_BREAKDOWN` object:

```javascript
const MATERIAL_BREAKDOWN = {
  'Concrete': {
    total: 400,
    components: {
      'Cement Production': { value: 352, pct: 88 },
      'Steel Reinforcement': { value: 40, pct: 10 },
      'Aggregates & Admix': { value: 8, pct: 2 }
    }
  },
  // ... (Steel, Timber, Brick similarly)
};
```

When a material is selected, the calculator:
1. Displays a material breakdown section with progress bars
2. Shows each component's CO₂ contribution (in kgCO₂e)
3. Updates the pie and polar charts to reflect the material composition
4. Recalculates based on project area (e.g., 352 kgCO₂e × area for cement in concrete)

## Calculator Features

- **Material Breakdown Display**: Below the selection summary, shows component percentages and CO₂ values as progress bars
- **Dynamic Charts**: Pie and polar area charts update to show material components when a specific material is selected
- **Area Scaling**: All values scale proportionally with the construction area input
- **Bilingual Support**: Labels support both English and Spanish

## Future Improvements

- Regional variation in cement and steel emissions (lime content, source energy mix)
- Low-carbon alternatives (bioplastics, recycled content, alternative binders)
- Time-of-life carbon accounting (carbon sequestration in timber over product lifetime)
