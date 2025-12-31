import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

export const case202203Input: E2eTestUserInput = {
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
  datum: '22.02.2022',

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
  r032_partner_vlastne_prijmy: '0',
  r032_uplatnujem_na_partnera: false,
  partner_spolocna_domacnost: true,
  partner_podmienky: { '1': ['on'] },

  /** SECTION Children */
  children: [
    {
      id: 1,
      priezviskoMeno: 'Morty Smith',
      rodneCislo: '2107010015',
      wholeYear: true,
    },
    {
      id: 2,
      priezviskoMeno: 'Summer Smith',
      rodneCislo: '2210120011',
      wholeYear: false,
      m01: false,
      m02: false,
      m03: false,
      m04: false,
      m05: false,
      m06: false,
      m07: false,
      m08: false,
      m09: false,
      m10: true,
      m11: true,
      m12: true,
    },
  ],
  hasChildren: true,
  expectNgoDonationValue: false,
}
