import { validate } from '../src/plugins/steps/3c-hypoteka/hypoteka'
import { testValidation } from './utils/testValidation'

describe('hypoteka', () => {
  describe('#validate', () => {
    testValidation(validate, [
      {
        input: { r037_uplatnuje_uroky: undefined },
        expected: ['r037_uplatnuje_uroky'],
      },
      { input: { r037_uplatnuje_uroky: false }, expected: [] },
      {
        input: { r037_uplatnuje_uroky: true },
        expected: ['r037_zaplatene_uroky', 'r037_pocetMesiacov'],
      },
      {
        input: {
          r037_uplatnuje_uroky: true,
          r037_zaplatene_uroky: 'a',
          r037_pocetMesiacov: 'b',
        },
        expected: ['r037_zaplatene_uroky', 'r037_pocetMesiacov'],
      },
      {
        input: {
          r037_uplatnuje_uroky: true,
          r037_zaplatene_uroky: '10',
          r037_pocetMesiacov: '20',
        },
        expected: ['r037_pocetMesiacov'],
      },
      {
        input: {
          r037_uplatnuje_uroky: true,
          r037_zaplatene_uroky: '10',
          r037_pocetMesiacov: '12',
        },
        expected: [],
      },
    ])
  })
})
