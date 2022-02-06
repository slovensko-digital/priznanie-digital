import { executeAllTestCases } from './executeCase'

describe('Cases', () => {
  executeAllTestCases([
    'withChildren',
    'withChildren2',
    'with2percent',
    // 'with3percent',
    // 'withSpa',
    // 'withBonus',
    // 'withTaxReturn',
  ])
})
