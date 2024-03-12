import {
  parseStreetAndNumber,
  encodeUnicodeCharacters,
  getStreetNumber,
  round,
} from '../src/lib/utils'
import {
  sortObjectKeys,
  formatCurrency,
  setDate,
  formatDate,
  numberInputRegexp,
  formatPsc,
  translit,
  formatRodneCislo,
  validateRodneCislo,
  formatIban,
  validateIbanFormat,
  validateIbanCountry,
  getRodneCisloAgeAtYearAndMonth,
  boolToString,
  decimalToString
} from '../src/lib/utils'
import Decimal from 'decimal.js'

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

  describe('#getStreetNumber', () => {
    const scenarios = [
      {
        input: {
          reg_number: 712,
          building_number: '5H',
        },
        output: '712/5H',
      },
      {
        input: {
          reg_number: 453,
          building_number: null,
        },
        output: '453',
      },
      {
        input: {
          reg_number: null,
          building_number: '4',
        },
        output: '4',
      },
      {
        input: {
          reg_number: null,
          building_number: '477/32',
        },
        output: '477/32',
      },
      {
        input: {
          reg_number: 0,
          building_number: '32',
        },
        output: '0/32',
      },
    ]

    scenarios.forEach(({ input, output }) => {
      it(`should format to ${output}`, () => {
        expect(getStreetNumber(input)).toBe(output)
      })
    })
  })

  describe('#formatCurrency', () => {
    const scenarios = [
      { input: 1234.564, output: '1 234,56 EUR' },
      { input: 123.455, output: '123,46 EUR' },
      { input: 1000000, output: '1 000 000,00 EUR' },
    ]

    scenarios.forEach(({ input, output }) => {
      it(`should format ${input} to ${output}`, () => {
        expect(formatCurrency(input)).toBe(output)
      })
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

  describe('#translit', () => {
    it('should replace accented characters', () => {
      expect(translit('ľščťžýáíéúäôň-qwe123')).toBe('lsctzyaieuaon-qwe123')
    })
  })

  describe('#formatRodneCislo', () => {
    it('should add slash (with spaces) after first 6 digits', () => {
      expect(formatRodneCislo('801010', '')).toBe('801010 / ')
    })

    it('should remove last number and slash (with spaces) when using backspace after slash (with spaces)', () => {
      expect(formatRodneCislo('801010 /', '801010 / ')).toBe('80101')
    })
  })

  describe('#validateRodneCislo', () => {
    describe('for valid values', () => {
      const validInputs = [
        '111111 / 111',
        '110124 / 041',
        '110124 / 0415',
        '110124 / 0426',
      ]

      validInputs.forEach((value) => {
        it(`should return true for value "${value}"`, () => {
          expect(validateRodneCislo(value)).toBe(true)
        })
      })
    })

    describe('for invalid values', () => {
      const validInputs = [
        '950215453',
        '9502154530',
        '950215/4530',
        '950215 4530',
        '950215 / 453',
        '110124 / 0422',
        '521111 / 1114',
        '950215 / 45301',
      ]

      validInputs.forEach((value) => {
        it(`should return false for value "${value}"`, () => {
          expect(validateRodneCislo(value)).toBe(false)
        })
      })
    })
  })

  describe('#getRodneCisloAgeAtYearAndMonth', () => {
    const year = 2020
    const month = 5
    const inputs = [
      { rc: '8007010011', age: 39, year, month },
      { rc: '8006180017', age: 39, year, month },
      { rc: '8005310016', age: 40, year, month },
      { rc: '8057010016', age: 39, year, month },
      { rc: '8056190010', age: 39, year, month },
      { rc: '8055310010', age: 40, year, month },
      { rc: '0557170009', age: 14, year, month },
      { rc: '0556180009', age: 14, year, month },
      { rc: '0555180010', age: 15, year, month },
      { rc: '0552180013', age: 15, year, month },
      { rc: '2055180017', age: 0, year, month },
    ]

    inputs.forEach(({ rc, age, year, month }) => {
      it(`should return age "${age}" for value "${rc}"`, () => {
        expect(getRodneCisloAgeAtYearAndMonth(rc, year, month)).toBe(age)
      })
    })
  })

  describe('#formatIban', () => {
    describe('should add space after every 4 characters', () => {
      expect(formatIban('SK6807200002891987426353')).toBe(
        'SK68 0720 0002 8919 8742 6353',
      )
    })

    describe('should allow non-numberic characters only in prefix', () => {
      expect(formatIban('XX11YY33ZZ44ABCD1234-2-2-2-2 Q_W/E.R 12345678')).toBe(
        'XX11 3344 1234 2222 1234 5678',
      )
    })

    describe('should remove last number and space when using backspace', () => {
      expect(formatIban('SK68 ', 'SK68 7')).toBe('SK68')
    })
  })

  describe('#validateIbanFormat', () => {
    describe('for valid values', () => {
      const validInputs = [
        'SK6807200002891987426353',
        ' SK68 0720 0002   8919 8742 6353 ',
        'CZ65 0800 0000 1920 0014 5399',
        'DE89 3704 0044 0532 0130 00',
      ]

      validInputs.forEach((value) => {
        it(`should return true for value "${value}"`, () => {
          expect(validateIbanFormat(value)).toBe(true)
        })
      })
    })

    describe('for invalid values', () => {
      const validInputs = [
        'SK680720000289198742635',
        '6807200002891987426353',
        'SK6807200002891987426350',
        '1987426353/0720',
        '19874263530720',
      ]

      validInputs.forEach((value) => {
        it(`should return false for value "${value}"`, () => {
          expect(validateIbanFormat(value)).toBe(false)
        })
      })
    })
  })

  describe('#validateIbanCountry', () => {
    describe('for valid values', () => {
      const validInputs = [
        'SK6807200002891987426353',
        ' SK68 0720 0002   8919 8742 6353 ',
      ]

      validInputs.forEach((value) => {
        it(`should return true for value "${value}"`, () => {
          expect(validateIbanCountry(value)).toBe(true)
        })
      })
    })

    describe('for invalid values', () => {
      const validInputs = [
        'CZ65 0800 0000 1920 0014 5399',
        'DE89370400440532013000',
      ]

      validInputs.forEach((value) => {
        it(`should return false for value "${value}"`, () => {
          expect(validateIbanCountry(value)).toBe(false)
        })
      })
    })
  })

  describe('#parseStreetAndNumber', () => {
    const scenarios = [
      { input: '  A. Bernoláka 6 ', output: ['A. Bernoláka', '6'] },
      { input: 'Hrušková 10009/44A', output: ['Hrušková', '10009/44A'] },
      { input: 'Ševčenkova 902/25', output: ['Ševčenkova', '902/25'] },
      { input: 'Bošániho 7', output: ['Bošániho', '7'] },
      { input: 'Ulica bez čísla ', output: ['Ulica bez čísla', ''] },
    ]

    scenarios.forEach(({ input, output }) => {
      it(`should return "${output}" for "${input}"`, () => {
        expect(parseStreetAndNumber(input)).toEqual(output)
      })
    })
  })

  describe('encodeUnicodeCharacters', () => {
    const scenarios = [
      { input: 'ľščťžýáíé', output: 'Ä¾Å¡ÄÅ¥Å¾Ã½Ã¡Ã­Ã©' },
      { input: 'Ján Mrkvička', output: 'JÃ¡n MrkviÄka' },
      { input: 'No Changes Here 123', output: 'No Changes Here 123' },
    ]

    scenarios.forEach(({ input, output }) => {
      it(`should return "${output}" for "${input}"`, () => {
        expect(encodeUnicodeCharacters(input)).toEqual(output)
      })
    })

    it('should process complete XML correctly', () => {
      expect(
        encodeUnicodeCharacters(require('./fixtures/unicodeInput.xml')),
      ).toEqual(require('./fixtures/unicodeOutput.xml'))
    })
  })

  describe('#boolToString', () => {
    it('should return 1', () => {
      expect(boolToString(true)).toBe('1')
    })

    it('should return 0', () => {
      expect(boolToString(false)).toBe('0')
    })
  })

  describe('#decimalToString', () => {
    it('should return empty string for zero', () => {
      expect(decimalToString(new Decimal(0))).toBe('0.00')
    })

    it('should return rounded number to 2 decimals', () => {
      const input = new Decimal(3)
      const result = decimalToString(input)
      expect(result).toBe('3.00')
    })
  })

  describe('#roundDecimal', () => {
    const scenarios = [
      { input: new Decimal(123.45), output: '123.45' },
      { input: new Decimal(123.4509), output: '123.45' },
      { input: new Decimal(123.451), output: '123.45' },
      { input: new Decimal(123.454), output: '123.45' },
      { input: new Decimal(123.455), output: '123.46' },
      { input: new Decimal(123.454449), output: '123.45' },
      { input: new Decimal(123.459), output: '123.46' },
      { input: new Decimal(123.46), output: '123.46' },
      { input: new Decimal(123.461), output: '123.46' },
      { input: new Decimal(123.464), output: '123.46' },
      { input: new Decimal(123.465), output: '123.47' },
      { input: new Decimal(123.466), output: '123.47' },
      { input: new Decimal(123.469), output: '123.47' },
    ]

    scenarios.forEach(({ input, output }) => {
      it(`should round ${input} to ${output}`, () => {
        expect(round(input).toString()).toBe(output)
      })
    })

    it('should roundDecimal to 2 decimal places by default', () => {
      expect(round(new Decimal(10)).toString()).toBe('10')
    })
  })

  describe('#round', () => {
    const scenarios = [
      { input: new Decimal(123.45), output: '123.45' },
      { input: new Decimal(123.4509), output: '123.45' },
      { input: new Decimal(123.451), output: '123.45' },
      { input: new Decimal(123.454), output: '123.45' },
      { input: new Decimal(123.455), output: '123.46' },
      { input: new Decimal(123.454449), output: '123.45' },
      { input: new Decimal(123.459), output: '123.46' },
      { input: new Decimal(123.46), output: '123.46' },
      { input: new Decimal(123.461), output: '123.46' },
      { input: new Decimal(123.464), output: '123.46' },
      { input: new Decimal(123.465), output: '123.47' },
      { input: new Decimal(123.466), output: '123.47' },
      { input: new Decimal(123.469), output: '123.47' },
    ]

    scenarios.forEach(({ input, output }) => {
      it(`should round ${input} to ${output}`, () => {
        expect(round(input).valueOf()).toBe(output)
      })
    })
  })
})
