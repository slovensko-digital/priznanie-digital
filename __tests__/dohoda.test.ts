import { validate, validateItem } from '../src/pages/dohoda'
import { testValidation } from './utils/testValidation'

const validDohoda = {
  id: 1,
  prijmy: '5000',
  socialnePoistne: '500',
  zdravotnePoistne: '250',
  preddavkyNaDan: '400',
  danovyBonusNaDieta: '0',
}

describe('dohoda', () => {
  describe('#validate', () => {
    testValidation(validate, [
      {
        input: { dohoda: undefined },
        expected: ['dohoda'],
      },
      {
        input: { dohoda: false },
        expected: [],
      },
      {
        input: { dohoda: true },
        expected: ['dohody'],
      },
      {
        input: { dohoda: true, dohody: [] },
        expected: ['dohody'],
      },
      {
        input: { dohoda: true, dohody: [validDohoda] },
        expected: [],
      },
      {
        input: {
          dohoda: true,
          dohody: [validDohoda, { ...validDohoda, id: 2 }],
        },
        expected: [],
      },
    ])
  })

  describe('#validateItem', () => {
    it('returns errors for all empty fields', () => {
      const errors = validateItem({
        id: 1,
        prijmy: '',
        socialnePoistne: '',
        zdravotnePoistne: '',
        preddavkyNaDan: '',
        danovyBonusNaDieta: '',
      })
      expect(Object.keys(errors)).toEqual(
        expect.arrayContaining([
          'prijmy',
          'socialnePoistne',
          'zdravotnePoistne',
          'preddavkyNaDan',
          'danovyBonusNaDieta',
        ]),
      )
    })

    it('returns format errors for invalid values', () => {
      const errors = validateItem({
        id: 1,
        prijmy: 'a',
        socialnePoistne: '-1',
        zdravotnePoistne: '-1',
        preddavkyNaDan: '-1',
        danovyBonusNaDieta: 'a',
      })
      expect(Object.keys(errors)).toEqual(
        expect.arrayContaining([
          'prijmy',
          'socialnePoistne',
          'zdravotnePoistne',
          'preddavkyNaDan',
          'danovyBonusNaDieta',
        ]),
      )
    })

    it('returns no errors for valid item', () => {
      const errors = validateItem(validDohoda)
      expect(errors).toEqual({})
    })
  })
})
