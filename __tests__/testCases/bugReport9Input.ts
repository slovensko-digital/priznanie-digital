import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

export const bugReport9Input: E2eTestUserInput = {
  t1r10_prijmy: '12000',
  priloha3_r11_socialne: '37',
  priloha3_r13_zdravotne: '0',
  zaplatenePreddavky: '0',

  employed: true,
  uhrnPrijmovOdVsetkychZamestnavatelov: '1200',
  uhrnPovinnehoPoistnehoNaSocialnePoistenie: '112,80',
  uhrnPovinnehoPoistnehoNaZdravotnePoistenie: '273,72',
  uhrnPreddavkovNaDan: '0',
  udajeODanovomBonuseNaDieta: '0',

  r032_uplatnujem_na_partnera: false,

  rent: false,

  r005_meno: 'Fake',
  r004_priezvisko: 'Name',
  r001_dic: '233123123',
  r003_nace: '62010 - Počítačové programovanie',
  r007_ulica: 'Mierova',
  r008_cislo: '4',
  r009_psc: '82105',
  r010_obec: 'Bratislava 3',
  r011_stat: 'Slovensko',
  hasChildren: true,
  children: [
    {
      id: 1,
      priezviskoMeno: 'anon',
      rodneCislo: '235322/1354',

      wholeYear: false,
      m01: false,
      m02: false,
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
  ],

  partner_bonus_na_deti: true,
  r034_priezvisko_a_meno: 'Beth Smith',
  r034_rodne_cislo: '975917/1565',
  partner_bonus_na_deti_m01: false,
  partner_bonus_na_deti_m02: false,
  partner_bonus_na_deti_m03: true,
  partner_bonus_na_deti_m04: true,
  partner_bonus_na_deti_m05: true,
  partner_bonus_na_deti_m06: true,
  partner_bonus_na_deti_m07: true,
  partner_bonus_na_deti_m08: true,
  partner_bonus_na_deti_m09: true,
  partner_bonus_na_deti_m10: true,
  partner_bonus_na_deti_m11: true,
  partner_bonus_na_deti_m12: true,
  r034a: '552,39',

  datum: '',

  expectNgoDonationValue: false,
}
