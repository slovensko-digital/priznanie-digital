import { executeAllTestCases } from './executeCase'

describe.skip('Cases', () => {
  executeAllTestCases([
    'base',
    'withPartner',
    'withEmployment',
    'withPension',
    'withChildren',
    'withChildren2',
  ])
})
