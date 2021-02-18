import { executeAllTestCases } from './executeCase'

describe('Cases', () => {
  executeAllTestCases([
    'withChildren',
    'with2percent',
    'with3percent',
    'withSpa',
    'withBonus',
    'withTaxReturn',
  ])
})
