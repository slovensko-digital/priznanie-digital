import { validate } from '../src/features/odklad/2-osobne-udaje/osobne-udaje'
import { testValidation } from './utils/testValidation'

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    autoformPublicToken: 'foobar',
  },
}))

describe('odklad/osobne-udaje', () => {
  describe('#validate', () => {
    testValidation(validate, [
      {
        input: {
          dic: '',
          meno_priezvisko: '',
          titul: '',
          meno: '',
          priezvisko: '',
          ulica: '',
          cislo: '',
          psc: '',
          obec: '',
          stat: '',
        },
        expected: ['dic', 'meno', 'priezvisko', 'cislo', 'psc', 'obec', 'stat'],
      },
      {
        input: {
          dic: 'foo',
          meno: 'Johnny',
          priezvisko: 'Bravo',
          ulica: 'Hollywood Blvd',
          cislo: '9',
          psc: 'foo',
          obec: 'Los Angeles',
          stat: 'California',
        },
        expected: ['dic', 'psc'],
      },
      {
        input: {
          dic: '123123123',
          meno: 'Johnny',
          priezvisko: 'Bravo',
          ulica: 'Hollywood Blvd',
          cislo: '9',
          psc: '841 04',
          obec: 'Los Angeles',
          stat: 'California',
        },
        expected: [],
      },
    ])
  })
})
