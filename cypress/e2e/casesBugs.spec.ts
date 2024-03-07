import { executeAllTestCases } from './executeCase'

describe('Cases', () => {
  executeAllTestCases([
    'complete',
    'completeDecimal',
    'bugReport1',
    'bugReport2a',
    'bugReport2b',
    'bugReport3',
    'bugReport4',
    'bugReport5',
    'bugReport6',
    'bugReport8',
    'employmentWrongChildBonus'
  ])
})
