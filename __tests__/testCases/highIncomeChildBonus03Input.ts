import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

/**
 * Test case: Two children (under 15 + 15-17), income (zakladDane) 30740€ → bonus 800€
 *
 * Income breakdown:
 * - SZCO (self-employed) income: t1r10_prijmy = 15000€
 * - SZCO paušál: min(15000*0.6, 20000) = 9000€
 * - SZCO insurance: 800 + 400 = 1200€
 * - t1r10_vydavky = 9000 + 1200 = 10200€
 * - r045 = 15000 - 10200 = 4800€
 * - Employment (TPP) income: 27200€
 * - Employment insurance: 1260€
 * - r038 = 27200 - 1260 = 25940€
 * - zakladDane = r038 + r045 = 25940 + 4800 = 30740€
 *
 * Child 1: Born 15.07.2015 (age 9-10 in 2025, under 15 whole year)
 * - Full bonus without reduction: 12 * 100€ = 1200€
 * - Reduction: (30740 - 25740) / 10 / 12 * 12 = 500€
 * - Final bonus: 1200 - 500 = 700€
 *
 * Child 2: Born 15.03.2008 (age 16-17 in 2025, 15+ whole year)
 * - Full bonus without reduction: 12 * 50€ = 600€
 * - Reduction: (30740 - 25740) / 10 / 12 * 12 = 500€
 * - Final bonus: max(0, 600 - 500) = 100€
 *
 * Total: 700 + 100 = 800€
 */
export const highIncomeChildBonus03Input: E2eTestUserInput = {
  // SZCO income (self-employed)
  t1r10_prijmy: '15000',
  priloha3_r11_socialne: '800',
  priloha3_r13_zdravotne: '400',

  // Employment (TPP) income
  employed: true,
  uhrnPrijmovOdVsetkychZamestnavatelov: '27200',
  uhrnPovinnehoPoistnehoNaSocialnePoistenie: '950',
  uhrnPovinnehoPoistnehoNaZdravotnePoistenie: '310',
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

  // Two children: one under 15, one 15-17
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
    {
      id: 2,
      priezviskoMeno: 'Testovací Starší',
      rodneCislo: '0853150001',
      wholeYear: true,
      monthFrom: '1',
      monthTo: '12',
    },
  ],

  datum: '15.03.2026',

  expectNgoDonationValue: true,
  percent2: '80,16',
}
