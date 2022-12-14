import { executeAllTestCases } from './executeCase'

describe.skip('Cases', () => {
  executeAllTestCases([
    'with2percent',
    'with3percent',
    'withBonus',
    'withTaxReturn',
    'withEmploymentBonus',
    'withHighIncome',
  ])
})
