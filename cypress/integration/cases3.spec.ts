/* eslint-disable promise/no-callback-in-promise */
/* eslint-disable func-names */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/// <reference types="cypress" />

import { exectueTestcase, executePostponeCase } from './executeCase'

describe('Cases', () => {
  ;[
    'withEmploymentBonus',
    'withHighIncome',
    'bugReport1',
    'bugReport2',
    'bugReport3',
  ].forEach(exectueTestcase)
})

describe.skip('Postpone cases', () => {
  ;['basic', 'foreignIncome'].forEach(executePostponeCase)
})
