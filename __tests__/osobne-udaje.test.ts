import { validate } from '../src/pages/osobne-udaje'
import { testValidation } from './utils/testValidation'

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    autoformPublicToken: 'foobar',
  },
}))

describe('osobne-udaje', () => {
  describe('#validate', () => {
    testValidation(validate, [
      {
        input: {
          r001_dic: '',
          r004_priezvisko: '',
          r005_meno: '',
          r007_ulica: '',
          r008_cislo: '',
          r009_psc: '',
          r010_obec: '',
          r011_stat: '',
        },
        expected: [
          'r001_dic',
          'r005_meno',
          'r004_priezvisko',
          'r008_cislo',
          'r009_psc',
          'r010_obec',
          'r011_stat',
        ],
      },
      {
        input: {
          r001_dic: 'foo',
          r005_meno: 'Johnny',
          r004_priezvisko: 'Bravo',
          r007_ulica: 'Hollywood Blvd',
          r008_cislo: '9',
          r009_psc: 'foo',
          r010_obec: 'Los Angeles',
          r011_stat: 'California',
        },
        expected: ['r001_dic', 'r009_psc'],
      },
      {
        input: {
          r001_dic: '123123123',
          r005_meno: 'Johnny',
          r004_priezvisko: 'Bravo',
          r007_ulica: 'Hollywood Blvd',
          r008_cislo: '9',
          r009_psc: '841 04',
          r010_obec: 'Los Angeles',
          r011_stat: 'California',
        },
        expected: [],
      },
    ])
  })
})
