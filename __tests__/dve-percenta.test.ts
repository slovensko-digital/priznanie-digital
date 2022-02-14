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
        expected: ['r142_ico', 'r142_obchMeno'],
      },
      {
        input: {
          XIIoddiel_uplatnujem2percenta: true,
          r142_ico: '1',
          r142_obchMeno: 'Fake, o.z.',
        },
        expected: ['r142_ico'],
      },
      {
        input: {
          XIIoddiel_uplatnujem2percenta: true,
          r142_ico: '12 345 67',
          r142_obchMeno: 'Fake, o.z.',
        },
        expected: ['r142_ico'],
      },
      {
        input: {
          XIIoddiel_uplatnujem2percenta: true,
          r142_ico: '12 345 678',
          r142_obchMeno: 'Fake, o.z.',
        },
        expected: [],
      },
      {
        input: {
          XIIoddiel_uplatnujem2percenta: true,
          r142_ico: '12 345 6',
          r142_obchMeno: 'Fake, o.z.',
        },
        expected: [],
      },
    ])
  })
})
