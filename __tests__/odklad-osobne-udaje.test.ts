import { validate } from '../src/pages/odklad/osobne-udaje'
import { testValidation } from './utils/testValidation'

describe('odklad/osobne-udaje', () => {
  describe('#validate', () => {
    testValidation(validate, [
      {
        input: {
          dic: '',
          meno_priezvisko: '',
          ulica: '',
          cislo: '',
          psc: '',
          obec: '',
          stat: '',
        },
        expected: ['dic', 'meno_priezvisko', 'cislo', 'psc', 'obec', 'stat'],
      },
      {
        input: {
          dic: 'foo',
          meno_priezvisko: 'Johnny Bravo',
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
          meno_priezvisko: 'Johnny Bravo',
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
