import { calculate } from '../src/lib/calculation'
import { convertToJson } from '../src/lib/xml/xmlConverter'
import { TaxFormUserInput } from '../src/types/TaxFormUserInput'
import { initTaxFormUserInputValues } from '../src/lib/initialValues'

/**
 * Tests for daňový bonus na vyživované dieťa based on official FAQ examples
 * from the Slovak Financial Administration (Daňový úrad) for tax year 2025.
 * https://podpora.financnasprava.sk/790897-Da%C5%88ov%C3%BD-bonus-na-vy%C5%BEivovan%C3%A9-die%C5%A5a-za-rok-2025
 *
 * Key rules:
 * - 100€/month for children under 15
 * - 50€/month for children aged 15-17
 * - Percentage cap based on child count: 1→29%, 2→36%, 3→43%, 4→50%, 5→57%, 6+→64%
 * - High-income reduction when základ dane > 25,740€ (1.5× average wage ×12)
 */

/** Helper to build a test input with employment income only */
const makeInput = (overrides: Partial<TaxFormUserInput>): TaxFormUserInput => ({
  ...initTaxFormUserInputValues,
  prijem_zo_zivnosti: true,
  t1r10_prijmy: '0',
  priloha3_r11_socialne: '0',
  priloha3_r13_zdravotne: '0',
  employed: true,
  uhrnPovinnehoPoistnehoNaSocialnePoistenie: '0',
  uhrnPovinnehoPoistnehoNaZdravotnePoistenie: '0',
  uhrnPreddavkovNaDan: '0',
  udajeODanovomBonuseNaDieta: '0',
  r001_dic: '1234567890',
  r003_nace: '62010 - Počítačové programovanie',
  r005_meno: 'Test',
  r004_priezvisko: 'Testovací',
  r007_ulica: 'Testovacia',
  r008_cislo: '1',
  r009_psc: '81101',
  r010_obec: 'Bratislava',
  r011_stat: 'Slovensko',
  datum: '15.03.2026',
  hasChildren: 'yes',
  ...overrides,
})

describe('Daňový bonus na dieťa – official FAQ examples (2025)', () => {
  /**
   * FAQ 1: Two children (5yo + 10yo), základ dane 23,500€
   *
   * Both children under 15 → 100€/month each → 12 × 100 × 2 = 2,400€
   * Percentage limit for 2 children: 36% of 23,500 = 8,460€
   * Bonus (2,400) < limit (8,460) → full bonus applies
   * Expected: 2,400€
   */
  test('FAQ 1 – full bonus for two children under 15', () => {
    const input = makeInput({
      uhrnPrijmovOdVsetkychZamestnavatelov: '23500',
      children: [
        {
          id: 1,
          priezviskoMeno: 'Dieťa Prvé',
          rodneCislo: '2001150001', // born Jan 15, 2020 → age 5 in 2025
          wholeYear: true,
          monthFrom: '0',
          monthTo: '11',
        },
        {
          id: 2,
          priezviskoMeno: 'Dieťa Druhé',
          rodneCislo: '1501150001', // born Jan 15, 2015 → age 10 in 2025
          wholeYear: true,
          monthFrom: '0',
          monthTo: '11',
        },
      ],
    })

    const result = calculate(input)

    expect(result.r038.plus(result.r045).toNumber()).toBe(23500)
    expect(result.danovyBonusNaDieta.danovyBonus.toNumber()).toBe(2400)
    expect(result.danovyBonusNaDieta.nevyuzityDanovyBonus.toNumber()).toBe(0)
    expect(result.r117.toNumber()).toBe(2400)
  })

  /**
   * FAQ 2: Two children (2yo + 12yo), základ dane 6,250€
   *
   * Both children under 15 → 100€/month each → 12 × 100 × 2 = 2,400€
   * Percentage limit for 2 children: 36% of 6,250 = 2,250€
   * Bonus (2,400) > limit (2,250) → capped at 2,250€
   * Expected: 2,250€
   */
  test('FAQ 2 – bonus capped at 36% of základ dane for two children', () => {
    const input = makeInput({
      uhrnPrijmovOdVsetkychZamestnavatelov: '6250',
      children: [
        {
          id: 1,
          priezviskoMeno: 'Dieťa Prvé',
          rodneCislo: '2301150001', // born Jan 15, 2023 → age 2 in 2025
          wholeYear: true,
          monthFrom: '0',
          monthTo: '11',
        },
        {
          id: 2,
          priezviskoMeno: 'Dieťa Druhé',
          rodneCislo: '1301150001', // born Jan 15, 2013 → age 12 in 2025
          wholeYear: true,
          monthFrom: '0',
          monthTo: '11',
        },
      ],
    })

    const result = calculate(input)

    expect(result.r038.plus(result.r045).toNumber()).toBe(6250)
    expect(result.danovyBonusNaDieta.danovyBonus.toNumber()).toBe(2250)
    expect(result.danovyBonusNaDieta.nevyuzityDanovyBonus.toNumber()).toBe(150)
    expect(result.r117.toNumber()).toBe(2250)
  })

  /**
   * FAQ 3: One 12yo child (whole year) + second child born November 2025, základ dane 3,250€
   *
   * Jan-Oct (10 months, 1 child):
   *   Limit = 29% × 3,250 / 12 × 10 = 942.50 / 12 × 10 = 78.54 × 10 = 785.40
   *   Bonus = 100 × 10 = 1,000 → capped at 785.40
   *
   * Nov-Dec (2 months, 2 children):
   *   Limit = 36% × 3,250 / 12 × 2 = 1,170 / 12 × 2 = 97.50 × 2 = 195
   *   Bonus = (100 + 100) × 2 = 400 → capped at 195
   *
   * Total: 785.40 + 195 = 980.40€
   */
  test('FAQ 3 – changing child count mid-year with percentage cap', () => {
    const input = makeInput({
      uhrnPrijmovOdVsetkychZamestnavatelov: '3250',
      children: [
        {
          id: 1,
          priezviskoMeno: 'Dieťa Prvé',
          rodneCislo: '1301150001', // born Jan 15, 2013 → age 12 in 2025
          wholeYear: true,
          monthFrom: '0',
          monthTo: '11',
        },
        {
          id: 2,
          priezviskoMeno: 'Dieťa Druhé',
          rodneCislo: '2511150001', // born Nov 15, 2025
          wholeYear: false,
          monthFrom: '10', // November (0-based)
          monthTo: '11', // December (0-based)
        },
      ],
    })

    const result = calculate(input)

    expect(result.r038.plus(result.r045).toNumber()).toBe(3250)
    expect(result.danovyBonusNaDieta.danovyBonus.toNumber()).toBe(980.4)
    expect(result.r117.toNumber()).toBe(980.4)
  })

  /**
   * FAQ 4: Two children (2yo + 12yo), základ dane 30,000€ (high income)
   *
   * základ dane > 25,740 → high-income reduction algorithm
   * Reduction per child: (30,000 − 25,740) / 10 / 12 × 12 = 4,260 / 10 = 426€
   *
   * Child 1 (under 15, 12 months): 1,200 − 426 = 774€
   * Child 2 (under 15, 12 months): 1,200 − 426 = 774€
   * Total: 1,548€
   */
  test('FAQ 4 – high-income reduction for two children', () => {
    const input = makeInput({
      uhrnPrijmovOdVsetkychZamestnavatelov: '30000',
      children: [
        {
          id: 1,
          priezviskoMeno: 'Dieťa Prvé',
          rodneCislo: '2301150001', // born Jan 15, 2023 → age 2 in 2025
          wholeYear: true,
          monthFrom: '0',
          monthTo: '11',
        },
        {
          id: 2,
          priezviskoMeno: 'Dieťa Druhé',
          rodneCislo: '1301150001', // born Jan 15, 2013 → age 12 in 2025
          wholeYear: true,
          monthFrom: '0',
          monthTo: '11',
        },
      ],
    })

    const result = calculate(input)

    expect(result.r038.plus(result.r045).toNumber()).toBe(30000)
    expect(result.danovyBonusNaDieta.danovyBonus.toNumber()).toBe(1548)
    expect(result.r117.toNumber()).toBe(1548)
  })

  /**
   * FAQ 5: One 5yo child (whole year) + second child born November 2025, základ dane 30,000€
   *
   * základ dane > 25,740 → high-income reduction algorithm
   * basePom = (30,000 − 25,740) / 10 / 12 = 35.5
   *
   * Child 1 (5yo, 12 months under 15):
   *   pom = basePom (not rounded, 12 months)
   *   Reduction = round(35.5 × 12) = 426€
   *   Bonus = 1,200 − 426 = 774€
   *
   * Child 2 (born Nov, 2 months under 15):
   *   pom = round(35.5) = 35.50
   *   Reduction = round(35.50 × 2) = 71€
   *   Bonus = 200 − 71 = 129€
   *
   * Total: 774 + 129 = 903€
   */
  test('FAQ 5 – high-income reduction with partial-year child', () => {
    const input = makeInput({
      uhrnPrijmovOdVsetkychZamestnavatelov: '30000',
      children: [
        {
          id: 1,
          priezviskoMeno: 'Dieťa Prvé',
          rodneCislo: '2001150001', // born Jan 15, 2020 → age 5 in 2025
          wholeYear: true,
          monthFrom: '0',
          monthTo: '11',
        },
        {
          id: 2,
          priezviskoMeno: 'Dieťa Druhé',
          rodneCislo: '2511150001', // born Nov 15, 2025
          wholeYear: false,
          monthFrom: '10', // November (0-based)
          monthTo: '11', // December (0-based)
        },
      ],
    })

    const result = calculate(input)

    expect(result.r038.plus(result.r045).toNumber()).toBe(30000)
    expect(result.danovyBonusNaDieta.danovyBonus.toNumber()).toBe(903)
    expect(result.r117.toNumber()).toBe(903)
  })
})

describe('Rows r146 and r146a – based on hasChildren value', () => {
  test('r146 and r146a are filled when hasChildren is "yes"', () => {
    const input = makeInput({
      hasChildren: 'yes',
      uhrnPrijmovOdVsetkychZamestnavatelov: '10000',
      children: [
        {
          id: 1,
          priezviskoMeno: 'Dieťa Prvé',
          rodneCislo: '2001150001',
          wholeYear: true,
          monthFrom: '0',
          monthTo: '11',
        },
      ],
    })

    const result = calculate(input)

    expect(result.r146.toNumber()).toBeGreaterThan(0)
    expect(result.r146a.toNumber()).toBeGreaterThan(0)
    expect(result.r146.toNumber()).toBe(result.r146a.toNumber())

    const jsonForm = convertToJson(result)
    expect(jsonForm.dokument.telo.r146).toBeDefined()
    expect(jsonForm.dokument.telo.r146).not.toBe('')
    expect(jsonForm.dokument.telo.r146a).toBeDefined()
    expect(jsonForm.dokument.telo.r146a).not.toBe('')
  })

  test('r146 and r146a are filled when hasChildren is "income-used-by-someone-else"', () => {
    const input = makeInput({
      hasChildren: 'income-used-by-someone-else',
      uhrnPrijmovOdVsetkychZamestnavatelov: '10000',
      children: [],
    })

    const result = calculate(input)

    expect(result.r146.toNumber()).toBeGreaterThan(0)
    expect(result.r146a.toNumber()).toBeGreaterThan(0)
    expect(result.r146.toNumber()).toBe(result.r146a.toNumber())

    const jsonForm = convertToJson(result)
    expect(jsonForm.dokument.telo.r146).toBeDefined()
    expect(jsonForm.dokument.telo.r146).not.toBe('')
    expect(jsonForm.dokument.telo.r146a).toBeDefined()
    expect(jsonForm.dokument.telo.r146a).not.toBe('')
  })

  test('r146 and r146a are 0 when hasChildren is "no"', () => {
    const input = makeInput({
      hasChildren: 'no',
      uhrnPrijmovOdVsetkychZamestnavatelov: '10000',
      children: [],
    })

    const result = calculate(input)

    expect(result.r146.toNumber()).toBe(0)
    expect(result.r146a.toNumber()).toBe(0)

    const jsonForm = convertToJson(result)
    expect(jsonForm.dokument.telo.r146).toBe('')
    expect(jsonForm.dokument.telo.r146a).toBe('')
  })
})
