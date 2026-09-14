/**
 * Construction rates — one source of truth for every tool
 *
 * The budget calculator and the investment calculator each carried their own
 * figures, and they disagreed: the budget tool implied about $690/m² for
 * Ecuador where the investment tool called $1,200 typical, and €2,875/m² for
 * Germany against a €2,000 typical. Same studio, same markets, two answers
 * pointing in opposite directions.
 *
 * Both now read from here. Update a number once and every tool moves with it.
 *
 * Figures are all-in construction cost per m² of gross floor area, excluding
 * land, at the stated finish level.
 *
 * Ecuador 2024: basic/social housing $450-600, standard residential
 *   $750-1,100, luxury $1,200-1,600.
 *   https://grupoherreraec.com/blog/
 *   https://www.minimalstudioec.com/costo-de-construccion-por-mt2-en-ecuador/
 *
 * Germany 2024-25: simple houses €1,800-2,500, apartment buildings
 *   €2,000-3,000, luxury €4,000-5,000+. H1 2024 average for single-family
 *   homes was €2,510/m².
 *   https://www.smartest-home.com/en/construction-costs-square-meter-housebuilding/
 *   https://www.euroconstruct.org/
 */
(function () {
  'use strict';

  window.CONSTRUCTION_RATES = {
    ecuador: {
      currency: 'USD',
      symbol: '$',
      perM2: { essential: 600, standard: 900, premium: 1400 },
      typical: 1200,
      typicalRange: '800-1500 USD/m²',
      // Urban design is priced per project, not per m².
      urbanBaseProject: 50000
    },
    germany: {
      currency: 'EUR',
      symbol: '€',
      perM2: { essential: 1800, standard: 2500, premium: 4000 },
      typical: 2000,
      typicalRange: '1500-2500 EUR/m²',
      urbanBaseProject: 120000
    }
  };

  /**
   * Finish-level multipliers relative to "standard", averaged across the
   * markets above (Ecuador 0.67/1.56, Germany 0.72/1.60). Tools apply these
   * to the standard rate rather than hard-coding a second set of numbers.
   */
  window.FINISH_MULTIPLIERS = {
    essential: 0.7,
    standard: 1.0,
    premium: 1.6
  };
})();
