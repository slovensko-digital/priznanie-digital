/* eslint-disable promise/no-callback-in-promise */
/* eslint-disable func-names */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/// <reference types="cypress" />

import { exectueTestcase, executePostponeCase } from './executeCase'

describe('Cases', () => {
  ;[
    'base',
    'complete',
    'completeDecimal',
    'withPartner',
    'withEmployment',
    // 'withMortgage',
  ].forEach(exectueTestcase)
})

describe.skip('Postpone cases', () => {
  ;['basic', 'foreignIncome'].forEach(executePostponeCase)
})
