import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'
import { generateRodneCislo } from '../utils/generateRodneCislo'
import { TAX_YEAR } from '../../src/lib/calculation'


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
        turnsAgeInYear: TAX_YEAR,
        turnsAgeInMonth: 8,
        gender: 'MALE',
      }).pure,
      wholeYear: true,
      monthFrom: '0',
      monthTo: '11',
    },
    {
      id: 2,
      priezviskoMeno: 'Mrkvička Janko',
      rodneCislo: generateRodneCislo({
        turnsAge: 0,
        turnsAgeInYear: TAX_YEAR,
        turnsAgeInMonth: 2,
        gender: 'MALE',
      }).pure,
      wholeYear: false,
      monthFrom: '1',
      monthTo: '11',
    },
    {
      id: 3,
      priezviskoMeno: 'Mrkvička Jozef',
      rodneCislo: generateRodneCislo({
        turnsAge: 18,
        turnsAgeInYear: TAX_YEAR,
        turnsAgeInMonth: 5,
        gender: 'MALE',
      }).pure,
      wholeYear: false,
      monthFrom: '0',
      monthTo: '4',
    },
  ],
  hasChildren: 'yes',
  partner_bonus_na_deti: false,

  expectNgoDonationValue: true,
  percent2: '2 867,15',
  percent3: '4 300,73',
  r035_uplatnuje_uroky: false,
}
