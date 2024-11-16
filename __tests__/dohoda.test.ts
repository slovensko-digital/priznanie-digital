import { validate } from '../src/pages/dohoda'
import { testValidation } from './utils/testValidation'

describe('dohoda', () => {
  describe('#validate', () => {
    testValidation(validate, [
      {
        input: { dohoda: undefined },
        expected: ['dohoda'],
      },
      { input: { dohoda: false }, expected: [] },
      {
        input: { dohoda: true },
        expected: [
          'uhrnPrijmovZoVsetkychDohod',
          'uhrnPovinnehoPoistnehoNaSocialnePoistenieDohody',
          'uhrnPovinnehoPoistnehoNaZdravotnePoistenieDohody',
          'uhrnPreddavkovNaDanDohody',
          'udajeODanovomBonuseNaDietaDohody',
        ],
      },
      {
        input: {
          dohoda: true,
          r029_poberal_dochodok: true,
          uhrnPrijmovZoVsetkychDohod: 'a',
          uhrnPovinnehoPoistnehoNaSocialnePoistenieDohody: '-1',
          uhrnPovinnehoPoistnehoNaZdravotnePoistenieDohody: '-1',
          udajeODanovomBonuseNaDietaDohody: 'a',
          uhrnPreddavkovNaDanDohody: '-1',
        },
        expected: [
          'uhrnPrijmovZoVsetkychDohod',
          'uhrnPovinnehoPoistnehoNaSocialnePoistenieDohody',
          'uhrnPovinnehoPoistnehoNaZdravotnePoistenieDohody',
          'uhrnPreddavkovNaDanDohody',
          'udajeODanovomBonuseNaDietaDohody',
        ],
      },
      {
        input: {
          dohoda: true,
          r029_poberal_dochodok: true,
          uhrnPrijmovZoVsetkychDohod: '10',
          uhrnPovinnehoPoistnehoNaSocialnePoistenieDohody: '20',
          uhrnPovinnehoPoistnehoNaZdravotnePoistenieDohody: '20',
          udajeODanovomBonuseNaDietaDohody: '30',
          uhrnPreddavkovNaDanDohody: '40',
        },
        expected: [],
      },
    ])
  })
})
