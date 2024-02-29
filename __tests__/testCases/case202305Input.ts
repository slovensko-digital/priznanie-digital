import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

export const case202305Input: E2eTestUserInput = {
  t1r10_prijmy: '34800',
  priloha3_r11_socialne: '2253.36',
  priloha3_r13_zdravotne: '951.72',
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
  r032_uplatnujem_na_partnera: false,
  r031_priezvisko_a_meno: 'Fake Fake',
  r031_rodne_cislo: '9609226286',
  r032_partner_pocet_mesiacov: '12',
  r032_partner_vlastne_prijmy: '3000',
  partner_spolocna_domacnost: true,
  partner_podmienky: { '1': true },

  /** SECTION Children */
  children: [
    {
      id: 1,
      priezviskoMeno: 'Morty Smith',
      rodneCislo: '1106247406',
      wholeYear: true,
      monthFrom: '6',
      monthTo: '11',
    },
    {
      id: 2,
      priezviskoMeno: 'Summer Smith',
      rodneCislo: '1106240146',
      wholeYear: true,
      monthFrom: `9`,
      monthTo: '11',
    },
    {
      id: 3,
      priezviskoMeno: 'Rick Sanchez',
      rodneCislo: '1106248473',
      wholeYear: true,
      monthFrom: `9`,
      monthTo: '11',
    },
    {
      id: 4,
      priezviskoMeno: 'Beth Smith',
      rodneCislo: '1106240740',
      wholeYear: true,
      monthFrom: `9`,
      monthTo: '11',
    },
  ],
  hasChildren: true,
  partner_bonus_na_deti: true,
  r034_priezvisko_a_meno: 'Beth Smith',
  r034_rodne_cislo: '895103/4169',
  partner_bonus_na_deti_od: '0',
  partner_bonus_na_deti_do: '3',
  r034a: '13569',

  expectNgoDonationValue: false,

  /** SECTION Two Percent */
  percent2: '201,04',
  percent3: '29,42',
}
