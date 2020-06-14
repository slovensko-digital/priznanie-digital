import { validate } from '../src/pages/dochodok'
import { testValidation } from './utils/testValidation'

describe('dochodok', () => {
  describe('#validate', () => {
    testValidation(validate, [
      {
        input: { platil_prispevky_na_dochodok: undefined },
        expected: ['platil_prispevky_na_dochodok'],
      },
      { input: { platil_prispevky_na_dochodok: false }, expected: [] },
      {
        input: { platil_prispevky_na_dochodok: true },
        expected: ['r075_zaplatene_prispevky_na_dochodok'],
      },
      {
        input: {
          platil_prispevky_na_dochodok: true,
          r075_zaplatene_prispevky_na_dochodok: 'a',
        },
        expected: ['r075_zaplatene_prispevky_na_dochodok'],
      },
      {
        input: {
          platil_prispevky_na_dochodok: true,
          r075_zaplatene_prispevky_na_dochodok: '180,01',
        },
        expected: ['r075_zaplatene_prispevky_na_dochodok'],
      },
      {
        input: {
          platil_prispevky_na_dochodok: true,
          r075_zaplatene_prispevky_na_dochodok: '10',
        },
        expected: [],
      },
    ])
  })
})
