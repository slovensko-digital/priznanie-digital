import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'
import { generateRodneCislo } from '../utils/generateRodneCislo'

export const case202508Input: E2eTestUserInput = {
  r001_dic: '1040000000',
  r003_nace: '01120 - Pestovanie ryže',
  r005_meno: 'Michal',
  r004_priezvisko: 'Čubák',
  r006_titul: 'Ing.',
  r006_titul_za: 'Phd.',
  r007_ulica: 'XXX',
  r008_cislo: '23',
  r009_psc: '06723',
  r010_obec: 'Senec',
  r011_stat: 'Slovensko',
  datum: '24.02.2026',

  prijem_zo_zivnosti: true,
  t1r10_prijmy: '555',
  priloha3_r11_socialne: '5',
  priloha3_r13_zdravotne: '75',

  /** SECTION Employment */
  employed: true,
  uhrnPrijmovOdVsetkychZamestnavatelov: '585875',
  uhrnPovinnehoPoistnehoNaSocialnePoistenie: '857',
  uhrnPovinnehoPoistnehoNaZdravotnePoistenie: '47',
  uhrnPreddavkovNaDan: '747',

  /** SECTION Pension */
  platil_prispevky_na_dochodok: false,

  /** SECTION Partner */
  r032_uplatnujem_na_partnera: false,

  /** SECTION Children */
  children: [
    {
      id: 1,
      priezviskoMeno: 'Mrkvička Ferko',
      rodneCislo: generateRodneCislo({
        turnsAge: 15,
        turnsAgeInMonth: 8,
        gender: 'MALE',
      }).pure,
      wholeYear: true,
    },
    {
      id: 2,
      priezviskoMeno: 'Mrkvička Janko',
      rodneCislo: generateRodneCislo({
        turnsAge: 0,
        turnsAgeInMonth: 2,
        gender: 'MALE',
      }).pure,
      wholeYear: false,
      m02: true,
      m03: true,
      m04: true,
      m05: true,
      m06: true,
      m07: true,
      m08: true,
      m09: true,
      m10: true,
      m11: true,
      m12: true,
    },
    {
      id: 3,
      priezviskoMeno: 'Mrkvička Jozef',
      rodneCislo: generateRodneCislo({
        turnsAge: 18,
        turnsAgeInMonth: 5,
        gender: 'MALE',
      }).pure,
      wholeYear: false,
      m01: true,
      m02: true,
      m03: true,
      m04: true,
      m05: true,
    },
  ],
  hasChildren: 'yes',
  partner_bonus_na_deti: false,

  expectNgoDonationValue: true,
  percent2: '2 867,15',
  percent3: '4 300,73',
  r035_uplatnuje_uroky: false,
}
