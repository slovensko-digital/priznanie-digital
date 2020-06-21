import { calculate, parse, round2decimal } from '../src/lib/calculation'
import { TaxFormUserInput } from '../src/types/TaxFormUserInput'
import { initTaxFormUserInputValues } from '../src/lib/initialValues'

describe('#parse', () => {
  const inputs = [
    { input: null, output: 0 },
    { input: undefined, output: 0 },
    { input: '', output: 0 },
    { input: '0', output: 0 },
    { input: '10.521', output: 10.521 },
    { input: '5,3', output: 5.3 },
    { input: '2', output: 2 },
    { input: 'foo', output: NaN },
  ]

  inputs.forEach(({ input, output }) => {
    it(`for "${input}" should return "${output}"`, () => {
      expect(parse(input)).toBe(output)
    })
  })
})

describe('#round2decimal', () => {
  it('should round down the number to 2 decimals', () => {
    expect(round2decimal(1.3333)).toBe(1.33)
  })

  it('should round up the number to 2 decimals down', () => {
    expect(round2decimal(1.3351)).toBe(1.34)
  })
})

describe('Basic use cases', () => {
  test('Case 1', () => {
    const input: TaxFormUserInput = {
      ...initTaxFormUserInputValues,
      t1r10_prijmy: '20000',
      meno_priezvisko: 'Johnny Mike Bravo',
    }
    const result = calculate(input as TaxFormUserInput)
    expect(result.r080_zaklad_dane_celkovo).toBe(4062.65)
    expect(result.r005_meno).toBe('Johnny')
    expect(result.r004_priezvisko).toBe('Mike Bravo')
  })

  test('Case 2', () => {
    const input: TaxFormUserInput = {
      ...initTaxFormUserInputValues,

      t1r10_prijmy: '20000',

      priloha3_r11_socialne: '1000',
      priloha3_r13_zdravotne: '1000',
    }
    const result = calculate(input as TaxFormUserInput)
    expect(result.r080_zaklad_dane_celkovo).toBe(2062.65)
    expect(result.r105_dan).toBe(391.9)
  })
  test('Case 3', () => {
    const input: TaxFormUserInput = {
      ...initTaxFormUserInputValues,
      t1r10_prijmy: '30000',
      priloha3_r11_socialne: '2000',
      priloha3_r13_zdravotne: '2000',
    }
    const result = calculate(input as TaxFormUserInput)
    expect(result.r105_dan).toBe(771.9)
  })
  test('Case 4 (high income)', () => {
    const input: TaxFormUserInput = {
      ...initTaxFormUserInputValues,
      t1r10_prijmy: '45000',
      priloha3_r11_socialne: '1000',
      priloha3_r13_zdravotne: '1000',
    }
    const result = calculate(input as TaxFormUserInput)
    expect(result.r105_dan).toBe(3740.32)
  })
  test('Case 5 (high income 2)', () => {
    const input: TaxFormUserInput = {
      ...initTaxFormUserInputValues,
      t1r10_prijmy: '51000',
      priloha3_r11_socialne: '1000',
      priloha3_r13_zdravotne: '1320',
    }
    const result = calculate(input as TaxFormUserInput)
    expect(result.r105_dan).toBe(5089.32)
  })
})

describe('With partner', () => {
  test('Case 1', () => {
    const input: TaxFormUserInput = {
      ...initTaxFormUserInputValues,
      t1r10_prijmy: '20000',
      r031_priezvisko_a_meno: 'Summer Smith',
      r031_rodne_cislo: '1111111',
      r032_uplatnujem_na_partnera: true,
      r032_partner_vlastne_prijmy: '1000',
      r032_partner_pocet_mesiacov: '12',
      r033_partner_kupele: true,
      r033_partner_kupele_uhrady: '50',
      priloha3_r11_socialne: '0',
      priloha3_r13_zdravotne: '0',
    }
    const result = calculate(input as TaxFormUserInput)
    expect(result.r080_zaklad_dane_celkovo).toBe(1075.3)
    expect(result.r105_dan).toBe(204.3)
    expect(result.r125_dan_na_uhradu).toBe(204.3)
  })
})

const child = {
  id: 0,
  priezviskoMeno: 'Johnny Bravo',
  rodneCislo: '150701 / 1234',
  kupelnaStarostlivost: true,
  wholeYear: false,
  monthFrom: '1',
  monthTo: '9',
}

const childUnder6 = { ...child, rodneCislo: '150701 / 1234' }
const childTurning6InFeb = { ...child, rodneCislo: '130201 / 1234' }
const childTurning6InJul = { ...child, rodneCislo: '130731 / 1234' }
const childOver6 = { ...child, rodneCislo: '100101 / 1234' }

describe('With child (for tax year 2019)', () => {
  test('should map child', () => {
    const result = calculate({
      ...initTaxFormUserInputValues,
      hasChildren: true,
      children: [child],
    })
    expect(result.r034[0].priezviskoMeno).toBe('Johnny Bravo')
    expect(result.r034[0].rodneCislo).toBe('1507011234')
    expect(result.r034[0].kupelnaStarostlivost).toBe(true)
    expect(result.r034[0].m00).toBe(false)
    expect(result.r034[0].m01).toBe(false)
    expect(result.r034[0].m02).toBe(true)
    expect(result.r034[0].m03).toBe(true)
    expect(result.r034[0].m04).toBe(true)
    expect(result.r034[0].m05).toBe(true)
    expect(result.r034[0].m06).toBe(true)
    expect(result.r034[0].m07).toBe(true)
    expect(result.r034[0].m08).toBe(true)
    expect(result.r034[0].m09).toBe(true)
    expect(result.r034[0].m10).toBe(true)
    expect(result.r034[0].m11).toBe(false)
    expect(result.r034[0].m12).toBe(false)
  })

  test('should map child with wholeYear', () => {
    const result = calculate({
      ...initTaxFormUserInputValues,
      hasChildren: true,
      children: [{ ...child, wholeYear: true, kupelnaStarostlivost: false }],
    })
    expect(result.r034[0].priezviskoMeno).toBe('Johnny Bravo')
    expect(result.r034[0].rodneCislo).toBe('1507011234')
    expect(result.r034[0].kupelnaStarostlivost).toBe(false)
    expect(result.r034[0].m00).toBe(true)
    expect(result.r034[0].m01).toBe(false)
    expect(result.r034[0].m02).toBe(false)
    expect(result.r034[0].m03).toBe(false)
    expect(result.r034[0].m04).toBe(false)
    expect(result.r034[0].m05).toBe(false)
    expect(result.r034[0].m06).toBe(false)
    expect(result.r034[0].m07).toBe(false)
    expect(result.r034[0].m08).toBe(false)
    expect(result.r034[0].m09).toBe(false)
    expect(result.r034[0].m10).toBe(false)
    expect(result.r034[0].m11).toBe(false)
    expect(result.r034[0].m12).toBe(false)
  })

  describe('children tax bonus (r106)', () => {
    test('Child under 6', () => {
      const result = calculate({
        ...initTaxFormUserInputValues,
        hasChildren: true,
        children: [childUnder6],
      })
      const part1 = 22.17 + 22.17 // februar, marec (suma pre januar - marec, nezavisla od veku)
      const part2 = 44.34 + 44.34 + 44.34 + 44.34 + 44.34 + 44.34 + 44.34 // april - oktober (vek < 6 rokov)
      expect(result.r106).toBe(round2decimal(part1 + part2))
    })

    test('Child turning 6 in 2019 (february)', () => {
      const result = calculate({
        ...initTaxFormUserInputValues,
        hasChildren: true,
        children: [childTurning6InFeb],
      })

      const part1 = 22.17 + 22.17 // februar, marec (suma pre januar - marec, nezavisla od veku)
      const part2 = 22.17 + 22.17 + 22.17 + 22.17 + 22.17 + 22.17 + 22.17 // april - september (vek > 6 rokov)
      expect(result.r106).toBe(round2decimal(part1 + part2))
    })

    test('Child turning 6 in 2019 (july)', () => {
      const result = calculate({
        ...initTaxFormUserInputValues,
        hasChildren: true,
        children: [childTurning6InJul],
      })

      const part1 = 22.17 + 22.17 // februar, marec (suma pre januar - marec)
      const part2 = 44.34 + 44.34 + 44.34 + 44.34 // april - jul (vek do 6 rokov vratane mesiaca dovrsenia)
      const part3 = 22.17 + 22.17 + 22.17 // august - oktober (ved nad 6 rokov)
      expect(result.r106).toBe(round2decimal(part1 + part2 + part3))
    })

    test('Child over 6', () => {
      const result = calculate({
        ...initTaxFormUserInputValues,
        hasChildren: true,
        children: [childOver6],
      })

      const part1 = 22.17 + 22.17 // februar, marec (suma pre januar - marec)
      const part2 = 22.17 * 7 // april - oktober (vek nad 6 rokov vratane mesiaca dovrsenia)
      expect(result.r106).toBe(round2decimal(part1 + part2))
    })

    test('More children', () => {
      const result = calculate({
        ...initTaxFormUserInputValues,
        hasChildren: true,
        children: [
          { ...childOver6 },
          { ...childTurning6InFeb },
          { ...childTurning6InJul },
          { ...childUnder6 },
        ],
      })

      // childOver6
      const childOver6Part1 = 22.17 + 22.17 // februar, marec (suma pre januar - marec, nezavisla od veku)
      const childOver6Part2 =
        44.34 + 44.34 + 44.34 + 44.34 + 44.34 + 44.34 + 44.34 // april - oktober (vek < 6 rokov)
      const childOver6Sum = round2decimal(childOver6Part1 + childOver6Part2)

      // childTurning6InFeb
      const childTurning6InFebPart1 = 22.17 + 22.17 // februar, marec (suma pre januar - marec, nezavisla od veku)
      const childTurning6InFebPart2 =
        22.17 + 22.17 + 22.17 + 22.17 + 22.17 + 22.17 + 22.17 // april - september (vek > 6 rokov)
      const childTurning6InFebPart2Sum = round2decimal(
        childTurning6InFebPart1 + childTurning6InFebPart2,
      )

      // childTurning6InJul
      const childTurning6InJulPart1 = 22.17 + 22.17 // februar, marec (suma pre januar - marec)
      const childTurning6InJulPart2 = 44.34 + 44.34 + 44.34 + 44.34 // april - jul (vek do 6 rokov vratane mesiaca dovrsenia)
      const childTurning6InJulPart3 = 22.17 + 22.17 + 22.17 // august - oktober (ved nad 6 rokov)
      const childTurning6InJulSum = round2decimal(
        childTurning6InJulPart1 +
          childTurning6InJulPart2 +
          childTurning6InJulPart3,
      )

      // childUnder6
      const childUnder6Part1 = 22.17 + 22.17 // februar, marec (suma pre januar - marec)
      const childUnder6Part2 = 22.17 * 7 // april - oktober (vek nad 6 rokov vratane mesiaca dovrsenia)
      const childUnder6Sum = round2decimal(childUnder6Part1 + childUnder6Part2)

      expect(result.r106).toBe(
        round2decimal(
          childOver6Sum +
            childTurning6InFebPart2Sum +
            childTurning6InJulSum +
            childUnder6Sum,
        ),
      )
    })
  })
})
