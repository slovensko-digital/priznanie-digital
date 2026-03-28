import { calculate } from '../src/lib/calculation'
import { TaxFormUserInput } from '../src/types/TaxFormUserInput'
import { initTaxFormUserInputValues } from '../src/lib/initialValues'

const makeRentInput = (
  prijmy: string,
  vydavky: string,
  oslobodenie?: string,
): TaxFormUserInput => ({
  ...initTaxFormUserInputValues,
  rent: true,
  vyskaPrijmovZPrenajmu: prijmy,
  vydavkyZPrenajmu: vydavky,
  ...(oslobodenie
    ? {
        prenajomPrijemZPrilezitostnejCinnosti: true,
        vyskaOslobodenia: oslobodenie,
      }
    : {}),
})

describe('Zaokrúhlenie pomeru výdavkov pri prenájme nehnuteľnosti', () => {
  describe('príklady z finančnej správy', () => {
    test('FS poučenie: príjmy 9948, výdavky 3785, oslobodenie 500 → pomer 0.95 → výdavky 3595.75', () => {
      const result = calculate(makeRentInput('9948', '3785'))
      // pomer = 9448 / 9948 = 0.94976... → zaokrúhlený na 0.95
      // výdavky = 0.95 × 3785 = 3595.75
      expect(result.t1r11s1.toNumber()).toBe(9448)
      expect(result.t1r11s2.toNumber()).toBe(3595.75)
    })

    test('FS č.1: príjmy 3200, výdavky 1200, oslobodenie 500 → pomer 0.84 → výdavky 1008', () => {
      const result = calculate(makeRentInput('3200', '1200'))
      // pomer = 2700 / 3200 = 0.84375 → zaokrúhlený na 0.84
      // výdavky = 0.84 × 1200 = 1008
      expect(result.t1r11s1.toNumber()).toBe(2700)
      expect(result.t1r11s2.toNumber()).toBe(1008)
    })

    test('FS č.2: príjmy 6000, výdavky 3850, oslobodenie 500 → pomer 0.92 → výdavky 3542', () => {
      const result = calculate(makeRentInput('6000', '3850'))
      // pomer = 5500 / 6000 = 0.91667 → zaokrúhlený na 0.92
      // výdavky = 0.92 × 3850 = 3542
      expect(result.t1r11s1.toNumber()).toBe(5500)
      expect(result.t1r11s2.toNumber()).toBe(3542)
    })

    test('FS č.3: príjmy 3720, výdavky 3840, oslobodenie 500 → pomer 0.87 → výdavky 3340.80, capped na 3220', () => {
      const result = calculate(makeRentInput('3720', '3840'))
      // pomer = 3220 / 3720 = 0.86559 → zaokrúhlený na 0.87
      // výdavky = 0.87 × 3840 = 3340.80, ale max = t1r11s1 = 3220
      expect(result.t1r11s1.toNumber()).toBe(3220)
      expect(result.t1r11s2.toNumber()).toBe(3220)
    })
  })

  describe('hraničné prípady', () => {
    test('bez oslobodenia (oslobodenie = 0) → výdavky sa berú v plnej výške', () => {
      const input: TaxFormUserInput = {
        ...initTaxFormUserInputValues,
        rent: true,
        vyskaPrijmovZPrenajmu: '5000',
        vydavkyZPrenajmu: '2000',
        prenajomPrijemZPrilezitostnejCinnosti: true,
        vyskaOslobodenia: '0',
      }
      const result = calculate(input)
      expect(result.t1r11s1.toNumber()).toBe(5000)
      expect(result.t1r11s2.toNumber()).toBe(2000)
    })

    test('príjmy nižšie ako oslobodenie → príjem aj výdavky sú 0', () => {
      const result = calculate(makeRentInput('400', '200'))
      expect(result.t1r11s1.toNumber()).toBe(0)
      expect(result.t1r11s2.toNumber()).toBe(0)
    })

    test('vlastné oslobodenie s desatinnými číslami', () => {
      const result = calculate(makeRentInput('5537.98', '3431.75', '321.19'))
      // pomer = 5216.79 / 5537.98 = 0.94200 → zaokrúhlený na 0.94
      // výdavky = 0.94 × 3431.75 = 3225.85
      expect(result.t1r11s1.toNumber()).toBe(5216.79)
      expect(result.t1r11s2.toNumber()).toBe(3225.85)
    })
  })
})
