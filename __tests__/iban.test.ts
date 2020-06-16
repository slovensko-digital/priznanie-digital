import { validate } from '../src/pages/iban'
import { testValidation } from './utils/testValidation'

describe('iban', () => {
  describe('#validate', () => {
    testValidation(validate, [
      {
        input: { ziadamVratitDanovyBonusAleboPreplatok: undefined },
        expected: ['ziadamVratitDanovyBonusAleboPreplatok'],
      },
      { input: { ziadamVratitDanovyBonusAleboPreplatok: false }, expected: [] },
      {
        input: { ziadamVratitDanovyBonusAleboPreplatok: true },
        expected: ['iban'],
      },
      {
        input: {
          ziadamVratitDanovyBonusAleboPreplatok: true,
          iban: 'a',
        },
        expected: ['iban'],
      },
      {
        input: {
          ziadamVratitDanovyBonusAleboPreplatok: true,
          iban: 'SK6807200002891987426353',
        },
        expected: [],
      },
    ])
  })
})
