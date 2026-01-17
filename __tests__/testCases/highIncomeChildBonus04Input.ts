import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

/**
 * Test case: Child under 15, at threshold 25740€ → full bonus 1200€
 *
 * Income breakdown:
 * - SZCO (self-employed) income: t1r10_prijmy = 12000€
 * - SZCO paušál: min(12000*0.6, 20000) = 7200€
 * - SZCO insurance: 700 + 350 = 1050€
 * - t1r10_vydavky = 7200 + 1050 = 8250€
 * - r045 = 12000 - 8250 = 3750€
 * - Employment (TPP) income: 23050€
 * - Employment insurance: 1060€
 * - r038 = 23050 - 1060 = 21990€
 * - zakladDane = r038 + r045 = 21990 + 3750 = 25740€
 *
 * At the threshold (25740€), no reduction applies.
 *
 * Child: Born 15.07.2015 (age 9-10 in 2025, under 15 whole year)
 * - Full bonus: 12 * 100€ = 1200€
 * - No reduction (at threshold)
 * - Final bonus: 1200€
 */
export const highIncomeChildBonus04Input: E2eTestUserInput = {
  // SZCO income (self-employed)
  t1r10_prijmy: '12000',
  priloha3_r11_socialne: '700',
  priloha3_r13_zdravotne: '350',

  // Employment (TPP) income
  employed: true,
  uhrnPrijmovOdVsetkychZamestnavatelov: '23050',
  uhrnPovinnehoPoistnehoNaSocialnePoistenie: '800',
  uhrnPovinnehoPoistnehoNaZdravotnePoistenie: '260',
  uhrnPreddavkovNaDan: '0',
  udajeODanovomBonuseNaDieta: '0',

  // Personal info
  r001_dic: '1234567890',
  r003_nace: '62010 - Počítačové programovanie',
  r005_meno: 'Ján',
  r004_priezvisko: 'Testovací',
  r007_ulica: 'Testovacia',
  r008_cislo: '1',
  r009_psc: '81101',
  r010_obec: 'Bratislava',
  r011_stat: 'Slovensko',

  // Child under 15 (born July 15, 2015)
  hasChildren: true,
  children: [
    {
      id: 1,
      priezviskoMeno: 'Testovací Junior',
      rodneCislo: '1557150001',
      wholeYear: true,
      monthFrom: '1',
      monthTo: '12',
    },
  ],

  datum: '15.03.2026',

  expectNgoDonationValue: true,
  percent2: '49,25',
}
