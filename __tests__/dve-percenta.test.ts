import { validate } from '../src/pages/dve-percenta'
import { testValidation } from './utils/testValidation'

describe('dve-percenta', () => {
  describe('#validate', () => {
    testValidation(validate, [
      {
        input: { XIIoddiel_uplatnujem2percenta: undefined },
        expected: ['XIIoddiel_uplatnujem2percenta'],
      },
      { input: { XIIoddiel_uplatnujem2percenta: false }, expected: [] },
      {
        input: { XIIoddiel_uplatnujem2percenta: true },
        expected: [
          'r142_ico',
          'r142_obchMeno',
          'r142_ulica',
          'r142_cislo',
          'r142_psc',
          'r142_obec',
        ],
      },
      {
        input: {
          XIIoddiel_uplatnujem2percenta: true,
          r142_ico: '1',
          r142_obchMeno: 'Fake, o.z.',
          r142_ulica: 'Hlavna',
          r142_cislo: '1',
          r142_psc: '12',
          r142_obec: 'Bratislava',
        },
        expected: ['r142_ico', 'r142_psc'],
      },
      {
        input: {
          XIIoddiel_uplatnujem2percenta: true,
          r142_ico: '12 345 67',
          r142_obchMeno: 'Fake, o.z.',
          r142_ulica: 'Hlavna',
          r142_cislo: '1',
          r142_psc: '81102',
          r142_obec: 'Bratislava',
        },
        expected: ['r142_ico', 'r142_psc'],
      },
      {
        input: {
          XIIoddiel_uplatnujem2percenta: true,
          r142_ico: '12 345 678',
          r142_obchMeno: 'Fake, o.z.',
          r142_ulica: 'Hlavna',
          r142_cislo: '1',
          r142_psc: '811 02',
          r142_obec: 'Bratislava',
        },
        expected: [],
      },
      {
        input: {
          XIIoddiel_uplatnujem2percenta: true,
          r142_ico: '12 345 6',
          r142_obchMeno: 'Fake, o.z.',
          r142_ulica: 'Hlavna',
          r142_cislo: '1',
          r142_psc: '811 02',
          r142_obec: 'Bratislava',
        },
        expected: [],
      },
    ])
  })
})
