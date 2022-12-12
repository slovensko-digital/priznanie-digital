import { executeAllTestCases } from './executeCase'

describe('Cases', () => {
  executeAllTestCases([
    'complete',
    'completeDecimal',
    'bugReport1',
    // 'bugReport2',
    'bugReport3',
    'bugReport4',
  ])
})
