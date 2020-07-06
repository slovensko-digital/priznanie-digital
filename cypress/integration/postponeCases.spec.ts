import { executePostponeCase } from './executeCase'

describe.skip('Postpone cases', () => {
  ;['basic', 'foreignIncome'].forEach(executePostponeCase)
})
