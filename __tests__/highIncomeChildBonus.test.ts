import { calculate } from '../src/lib/calculation'
import { highIncomeChildBonus01Input } from './testCases/highIncomeChildBonus01Input'
import { highIncomeChildBonus02Input } from './testCases/highIncomeChildBonus02Input'
import { highIncomeChildBonus03Input } from './testCases/highIncomeChildBonus03Input'
import { highIncomeChildBonus04Input } from './testCases/highIncomeChildBonus04Input'

/**
 * Tests for high-income child bonus reduction.
 * These validate the E2E test case inputs produce expected results.
 */
describe('High-income child bonus E2E test cases', () => {
  test('highIncomeChildBonus01 - child under 15, income 35740€ → 200€', () => {
    const result = calculate(highIncomeChildBonus01Input)
    expect(result.r038.plus(result.r045).toNumber()).toBe(35740)
    expect(result.r117.toNumber()).toBe(200)
  })

  test('highIncomeChildBonus02 - child 15-17, income 35740€ → 0€', () => {
    const result = calculate(highIncomeChildBonus02Input)
    expect(result.r038.plus(result.r045).toNumber()).toBe(35740)
    expect(result.r117.toNumber()).toBe(0)
  })

  test('highIncomeChildBonus03 - two children, income 30740€ → 800€', () => {
    const result = calculate(highIncomeChildBonus03Input)
    expect(result.r038.plus(result.r045).toNumber()).toBe(30740)
    expect(result.r117.toNumber()).toBe(800)
  })

  test('highIncomeChildBonus04 - at threshold 25740€, full bonus 1200€', () => {
    const result = calculate(highIncomeChildBonus04Input)
    expect(result.r038.plus(result.r045).toNumber()).toBe(25740)
    expect(result.r117.toNumber()).toBe(1200)
  })
})
