import { executeAllTestCases } from './executeCase'

describe('Cases', () => {
  executeAllTestCases([
    'base',
    'complete',
    'completeDecimal',
    'withPartner',
    'withEmployment',
    // 'withMortgage',
  ])
})
