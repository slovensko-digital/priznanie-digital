import { executeAllTestCases } from './executeCase'

describe.skip('Cases', () => {
  executeAllTestCases([
    'complete',
    'completeDecimal',
    'bugReport1',
    // 'bugReport2',
    'bugReport3',
    'bugReport4',
  ])
})
