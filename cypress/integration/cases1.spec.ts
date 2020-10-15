import { exectueTestcase } from './executeCase'

describe('Cases', () => {
  ;[
    'base',
    'complete',
    'completeDecimal',
    'withPartner',
    'withEmployment',
    // 'withMortgage',
  ].forEach(exectueTestcase)
})
