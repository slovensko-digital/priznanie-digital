import { validate } from '../src/plugins/steps/4-dochodok/dochodok'
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
        expected: ['zaplatene_prispevky_na_dochodok'],
      },
      {
        input: {
          platil_prispevky_na_dochodok: true,
          zaplatene_prispevky_na_dochodok: 'a',
        },
        expected: ['zaplatene_prispevky_na_dochodok'],
      },
      {
        input: {
          platil_prispevky_na_dochodok: true,
          zaplatene_prispevky_na_dochodok: '180,01',
        },
        expected: ['zaplatene_prispevky_na_dochodok'],
      },
      {
        input: {
          platil_prispevky_na_dochodok: true,
          zaplatene_prispevky_na_dochodok: '10',
        },
        expected: [],
      },
    ])
  })
})
