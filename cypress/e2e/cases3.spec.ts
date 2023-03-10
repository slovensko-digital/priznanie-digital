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
  ])
})
