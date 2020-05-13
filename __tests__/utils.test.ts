import {
  sortObjectKeys,
  formatCurrency,
  setDate,
  formatDate,
  numberInputRegexp,
  formatPsc,
  formatIco,
} from '../src/lib/utils'

describe('utils', () => {
  describe('#sortObjectKeys', () => {
    it('should sort object by key', () => {
      expect(sortObjectKeys({ c: 1, '2': 2, b: 3, a: 4, '1': 5 })).toEqual({
        '1': 5,
        '2': 2,
        a: 4,
        b: 3,
        c: 1,
      })
    })
  })

  describe('#setDate', () => {
    it('should set date property to object', () => {
      const date = new Date(2018, 1, 3)
      expect(setDate({ children: true }, date)).toEqual({
        children: true,
        datum: '03.02.2018',
      })
    })
  })
  describe('#formatDate', () => {
    it('should format date case 1', () => {
      const date = new Date(2018, 1, 3)
      expect(formatDate(date)).toBe('03.02.2018')
    })
    it('should format date case 2', () => {
      const date = new Date(2020, 10, 22)
      expect(formatDate(date)).toBe('22.11.2020')
    })
  })

  describe('#formatCurrency', () => {
    it('should format number', () => {
      expect(formatCurrency(1234.564)).toBe('1 234,56 EUR')
    })
  })

  describe('numberInputRegexp', () => {
    describe('for valid values', () => {
      const validInputs = ['0', '10', '120,3', '120,34', '120.3', '120.34']

      validInputs.forEach((value) => {
        it(`should return true for ${value}`, () => {
          expect(new RegExp(numberInputRegexp).test(value)).toBe(true)
        })
      })
    })

    describe('for invalid values', () => {
      const invalidInputs = [
        '120,345',
        ',2',
        ',',
        '120.345',
        '.2',
        '.',
        '1,',
        '1.',
        'abc',
        '-5',
        '-15.20',
      ]

      invalidInputs.forEach((value) => {
        it(`should return false for ${value}`, () => {
          expect(new RegExp(numberInputRegexp).test(value)).toBe(false)
        })
      })
    })
  })

  describe('#formatPsc', () => {
    it('should add space after first 3 digits', () => {
      expect(formatPsc('84104', '')).toBe('841 04')
    })

    it('should remove last number and space when using backspace', () => {
      expect(formatPsc('841', '841 ')).toBe('84')
    })
  })

  describe('#formatIco', () => {
    it('should add space after first 2 digits', () => {
      expect(formatIco('12', '')).toBe('12 ')
    })

    it('should add space after next 3 digits', () => {
      expect(formatIco('12345678', '')).toBe('12 345 678')
    })

    it('should remove last number and space when using backspace after first space', () => {
      expect(formatIco('12', '12 ')).toBe('1')
    })

    it('should remove last number and space when using backspace after second space', () => {
      expect(formatIco('12 345', '12 345 ')).toBe('12 34')
    })
  })
})
