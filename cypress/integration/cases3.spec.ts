import { executeAllTestCases } from './executeCase'

describe('Cases', () => {
  executeAllTestCases([
    'withEmploymentBonus',
    'withHighIncome',
    'bugReport1',
    'bugReport2',
    'bugReport3',
    'bugReport4',
  ])
})
