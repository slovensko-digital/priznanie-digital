import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

export const case202301Input: E2eTestUserInput = {
  t1r10_prijmy: '11000',
  priloha3_r11_socialne: '1200',
  priloha3_r13_zdravotne: '650',
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
  uhrnPrijmovOdVsetkychZamestnavatelov: '0',
  uhrnPovinnehoPoistnehoNaSocialnePoistenie: '0',
  uhrnPovinnehoPoistnehoNaZdravotnePoistenie: '0',
  uhrnPreddavkovNaDan: '0',
  udajeODanovomBonuseNaDieta: '0',
  employed: false,

  /** SECTION Pension */
  platil_prispevky_na_dochodok: false,
  zaplatene_prispevky_na_dochodok: '0',

  /** SECTION Partner */
  r031_priezvisko_a_meno: 'Fake Fake',
  r031_rodne_cislo: '9609226286',
  r032_partner_pocet_mesiacov: '12',
  r032_partner_vlastne_prijmy: '3000',
  r032_uplatnujem_na_partnera: false,
  partner_spolocna_domacnost: true,
  partner_podmienky: { '1': true },

  /** SECTION Children */
  children: [
    {
      id: 1,
      priezviskoMeno: 'Morty Smith',
      rodneCislo: '2107123634',
      wholeYear: true,
      monthFrom: '6',
      monthTo: '11',
    },
    {
      id: 2,
      priezviskoMeno: 'Summer Smith',
      rodneCislo: '236017/4729',
      wholeYear: false,
      monthFrom: '9',
      monthTo: '11',
    },
  ],
  hasChildren: true,
  partner_bonus_na_deti: true,
  r034_priezvisko_a_meno: 'Beth Smith',
  r034_rodne_cislo: '895103/4169',
  partner_bonus_na_deti_od: '0',
  partner_bonus_na_deti_do: '5',
  r034a: '5000',

  expectNgoDonationValue: false,

  /** SECTION Two Percent */
  percent2: '15,99',
  percent3: '29,42',
}
