import { validate, validateItem } from '../src/pages/zamestnanie'
import { testValidation } from './utils/testValidation'

const validZamestnavatel = {
  id: 1,
  prijmy: '10000',
  socialnePoistne: '1000',
  zdravotnePoistne: '500',
  preddavkyNaDan: '800',
  danovyBonusNaDieta: '0',
}

describe('zamestnanie', () => {
  describe('#validate', () => {
    testValidation(validate, [
      {
        input: { employed: undefined },
        expected: ['employed'],
      },
      {
        input: { employed: false },
        expected: [],
      },
      {
        input: { employed: true },
        expected: ['zamestnavatelia'],
      },
      {
        input: { employed: true, zamestnavatelia: [] },
        expected: ['zamestnavatelia'],
      },
      {
        input: { employed: true, zamestnavatelia: [validZamestnavatel] },
        expected: [],
      },
      {
        input: {
          employed: true,
          zamestnavatelia: [validZamestnavatel, { ...validZamestnavatel, id: 2 }],
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
      const errors = validateItem(validZamestnavatel)
      expect(errors).toEqual({})
    })
  })
})
