import { executeAllTestCases } from './executeCase'

describe('Cases', () => {
  executeAllTestCases([
    'with2percent',
    'with3percent',
    'withBonus',
    'withTaxReturn',
    'withEmploymentBonus',
    'withHighIncome',
  ])
})
