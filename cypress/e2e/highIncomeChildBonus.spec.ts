import { executeAllTestCases } from './executeCase'

/**
 * Cypress E2E tests for high-income child bonus reduction.
 *
 * These tests verify the income-based reduction for child bonus
 * when zakladDane (r038 + r045) exceeds 25,740€.
 *
 * All test cases use a combination of:
 * - SZCO income (self-employed / živnostník)
 * - TPP income (employment / trvalý pracovný pomer)
 *
 * Test cases:
 * - highIncomeChildBonus01: Child under 15, zakladDane 35740€ → bonus reduced to 200€
 *   (SZCO: 20000€, TPP: 31500€)
 * - highIncomeChildBonus02: Child 15-17, zakladDane 35740€ → bonus reduced to 0€
 *   (SZCO: 20000€, TPP: 31500€)
 * - highIncomeChildBonus03: Two children (under 15 + 15-17), zakladDane 30740€ → 800€
 *   (SZCO: 15000€, TPP: 27200€)
 * - highIncomeChildBonus04: Child under 15, zakladDane 25740€ (at threshold) → full 1200€
 *   (SZCO: 12000€, TPP: 23050€)
 */
describe('High-income child bonus reduction', () => {
  executeAllTestCases([
    'highIncomeChildBonus01',
    'highIncomeChildBonus02',
    'highIncomeChildBonus03',
    'highIncomeChildBonus04',
  ])
})
