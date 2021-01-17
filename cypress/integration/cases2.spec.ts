import { executeAllTestCases } from './executeCase'

describe('Cases', () => {
  executeAllTestCases([
    'withPension',
    'withChildren',
    'with2percent',
    'with3percent',
    'withSpa',
    'withBonus',
  ])
})
