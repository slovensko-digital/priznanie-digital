import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

export const case202205Input: E2eTestUserInput = {
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
  partner_bonus_uplatneny: false,
  partner_podmienky: { '1': true },

  /** SECTION Children */
  children: [
    {
      id: 1,
      priezviskoMeno: 'Morty Smith',
      rodneCislo: '0606180014',
      wholeYear: true,
      monthFrom: '6',
      monthTo: '11',
    },
    {
      id: 2,
      priezviskoMeno: 'Summer Smith',
      rodneCislo: '0606180025',
      wholeYear: true,
      monthFrom: `9`,
      monthTo: '11',
    },
    {
      id: 3,
      priezviskoMeno: 'Rick Sanchez',
      rodneCislo: '0606180036',
      wholeYear: true,
      monthFrom: `9`,
      monthTo: '11',
    },
    {
      id: 4,
      priezviskoMeno: 'Beth Smith',
      rodneCislo: '0606180047',
      wholeYear: true,
      monthFrom: `9`,
      monthTo: '11',
    },
  ],
  hasChildren: true,

  expectNgoDonationValue: false,
}
