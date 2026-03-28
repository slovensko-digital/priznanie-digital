import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'
import { generateRodneCislo } from '../utils/generateRodneCislo'

export const case202302Input: E2eTestUserInput = {
  prijem_zo_zivnosti: true,
  t1r10_prijmy: '2500',
  priloha3_r11_socialne: '250',
  priloha3_r13_zdravotne: '100',
  zaplatenePreddavky: '0',
  r001_dic: '233123123',
  r003_nace: '62010 - Počítačové programovanie',
  r005_meno: 'Fake',
  r004_priezvisko: 'Name',
  r006_titul: 'Ing.',
  r006_titul_za: 'PhD.',
  r007_ulica: 'Mierova',
  r008_cislo: '4',
  r009_psc: '82105',
  r010_obec: 'Bratislava 3',
  r011_stat: 'Slovensko',
  datum: '22.02.2024',

  /** SECTION Employment */
  uhrnPrijmovOdVsetkychZamestnavatelov: '1800',
  uhrnPovinnehoPoistnehoNaSocialnePoistenie: '180',
  uhrnPovinnehoPoistnehoNaZdravotnePoistenie: '72',
  uhrnPreddavkovNaDan: '80',
  udajeODanovomBonuseNaDieta: '0',
  employed: true,
  dohoda: false,

  /** SECTION Pension */
  platil_prispevky_na_dochodok: false,
  zaplatene_prispevky_na_dochodok: '0',

  /** SECTION Partner */
  r032_uplatnujem_na_partnera: false,
  r031_priezvisko_a_meno: 'Fake Fake',
  r031_rodne_cislo: '9609226286',
  r032_partner_pocet_mesiacov: '12',
  r032_partner_vlastne_prijmy: '3000',
  partner_spolocna_domacnost: true,
  partner_podmienky: { '1': ['on'] },

  /** SECTION Children */
  children: [
    {
      id: 1,
      priezviskoMeno: 'Morty Smith',
      rodneCislo: generateRodneCislo({
        turnsAge: 16,
        turnsAgeInMonth: 4,
        gender: 'MALE',
      }).pure,
      wholeYear: true,
    },
    {
      id: 2,
      priezviskoMeno: 'Summer Smith',
      rodneCislo: generateRodneCislo({
        turnsAge: 4,
        turnsAgeInMonth: 9,
        gender: 'FEMALE',
      }).pure,
      wholeYear: true,
    },
  ],
  hasChildren: 'yes',
  partner_bonus_na_deti: true,
  r034_priezvisko_a_meno: 'Beth Smith',
  r034_rodne_cislo: '895103/4169',
  partner_bonus_na_deti_m01: true,
  partner_bonus_na_deti_m02: true,
  partner_bonus_na_deti_m03: true,
  partner_bonus_na_deti_m04: true,
  partner_bonus_na_deti_m05: true,
  partner_bonus_na_deti_m06: true,
  r034a: '5000',

  expectNgoDonationValue: false,

  /** SECTION Two Percent */
  percent2: '15,99',
  percent3: '29,42',
}
