import { calculate } from '../src/lib/calculation'
import { TaxFormUserInput } from '../src/types/TaxFormUserInput'
import { initTaxFormUserInputValues } from '../src/lib/initialValues'

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
