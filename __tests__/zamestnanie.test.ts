import { validate } from '../src/pages/zamestnanie'
import { testValidation } from './utils/testValidation'

describe('zamestnanie', () => {
  describe('#validate', () => {
    testValidation(validate, [
      {
        input: { employed: undefined },
        expected: ['employed'],
      },
      { input: { employed: false }, expected: [] },
      {
        input: { employed: true },
        expected: [
          'uhrnPrijmovOdVsetkychZamestnavatelov',
          'uhrnPovinnehoPoistnehoNaSocialnePoistenie',
          'uhrnPovinnehoPoistnehoNaZdravotnePoistenie',
          'uhrnPreddavkovNaDan',
          'udajeODanovomBonuseNaDieta',
        ],
      },
      {
        input: {
          employed: true,
          r029_poberal_dochodok: true,
          uhrnPrijmovOdVsetkychZamestnavatelov: 'a',
          uhrnPovinnehoPoistnehoNaSocialnePoistenie: '-1',
          uhrnPovinnehoPoistnehoNaZdravotnePoistenie: '-1',
          udajeODanovomBonuseNaDieta: 'a',
          uhrnPreddavkovNaDan: '-1',
        },
        expected: [
          'uhrnPrijmovOdVsetkychZamestnavatelov',
          'uhrnPovinnehoPoistnehoNaSocialnePoistenie',
          'uhrnPovinnehoPoistnehoNaZdravotnePoistenie',
          'uhrnPreddavkovNaDan',
          'udajeODanovomBonuseNaDieta',
        ],
      },
      {
        input: {
          employed: true,
          r029_poberal_dochodok: true,
          uhrnPrijmovOdVsetkychZamestnavatelov: '10',
          uhrnPovinnehoPoistnehoNaSocialnePoistenie: '20',
          uhrnPovinnehoPoistnehoNaZdravotnePoistenie: '20',
          udajeODanovomBonuseNaDieta: '30',
          uhrnPreddavkovNaDan: '40',
        },
        expected: [],
      },
    ])
  })
})
