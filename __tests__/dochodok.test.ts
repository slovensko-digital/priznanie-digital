import { validate } from '../src/pages/dochodok'
import { testValidation } from './utils/testValidation'

describe('dochodok', () => {
  describe('#validate', () => {
    testValidation(validate, [
      {
        input: { r029_poberal_dochodok: undefined },
        expected: ['r029_poberal_dochodok'],
      },
      { input: { r029_poberal_dochodok: false }, expected: [] },
      {
        input: { r029_poberal_dochodok: true },
        expected: ['r030_vyska_dochodku'],
      },
      {
        input: { r029_poberal_dochodok: true, r030_vyska_dochodku: 'a' },
        expected: ['r030_vyska_dochodku'],
      },
      {
        input: { r029_poberal_dochodok: true, r030_vyska_dochodku: '10' },
        expected: [],
      },
    ])
  })
})
