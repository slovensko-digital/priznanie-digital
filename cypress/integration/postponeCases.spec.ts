import { executePostponeCase } from './executeCase'

describe('Postpone cases', () => {
  ;['basic', 'foreignIncome'].forEach(executePostponeCase)
})
