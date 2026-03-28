import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

/**
 * Test case: Child under 15, income (zakladDane) 35740€ → bonus reduced to 200€
 *
 * Income breakdown:
 * - SZCO (self-employed) income: t1r10_prijmy = 20000€
 * - SZCO paušál: min(20000*0.6, 20000) = 12000€
 * - SZCO insurance: 1000 + 500 = 1500€
 * - t1r10_vydavky = 12000 + 1500 = 13500€
 * - r045 = 20000 - 13500 = 6500€
 * - Employment (TPP) income: 31500€
 * - Employment insurance: 2260€
 * - r038 = 31500 - 2260 = 29240€
 * - zakladDane = r038 + r045 = 29240 + 6500 = 35740€
 *
 * Child: Born 15.07.2015 (age 9-10 in 2025, under 15 whole year)
 * - Full bonus without reduction: 12 * 100€ = 1200€
 * - Reduction: (35740 - 25740) / 10 / 12 * 12 = 1000€
 * - Final bonus: 1200 - 1000 = 200€
 */
export const highIncomeChildBonus01Input: E2eTestUserInput = {
  // SZCO income (self-employed)
  prijem_zo_zivnosti: true,
  t1r10_prijmy: '20000',
  priloha3_r11_socialne: '1000',
  priloha3_r13_zdravotne: '500',

  // Employment (TPP) income
  employed: true,
  uhrnPrijmovOdVsetkychZamestnavatelov: '31500',
  uhrnPovinnehoPoistnehoNaSocialnePoistenie: '1700',
  uhrnPovinnehoPoistnehoNaZdravotnePoistenie: '560',
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
  hasChildren: 'yes',
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
  percent2: '114,55',
}
