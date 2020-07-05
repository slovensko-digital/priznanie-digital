import { exectueTestcase, executePostponeCase } from './executeCase'

describe('Cases', () => {
  ;[
    'withPension',
    'withChildren',
    'with2percent',
    'withSpa',
    'withBonus',
  ].forEach(exectueTestcase)
})
