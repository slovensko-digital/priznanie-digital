import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

export const completeDecimalInput: E2eTestUserInput = {
  priloha3_r11_socialne: '1000,23',
  priloha3_r13_zdravotne: '1000,23',
  r001_dic: '233123123',
  r003_nace: '62010 - Počítačové programovanie',
  r005_meno: 'Fake',
  r004_priezvisko: 'Name',
  r006_titul: '',
  r007_ulica: 'Mierova',
  r008_cislo: '4',
  r009_psc: '82105',
  r010_obec: 'Bratislava 3',
  r011_stat: 'Slovensko',
  t1r10_prijmy: '35000.98',
  uhrnPreddavkovNaDan: '100.25',
  datum: '22.02.2020',

  /** SECTION Employment */
  uhrnPrijmovOdVsetkychZamestnavatelov: '4000,43',
  uhrnPovinnehoPoistnehoNaSocialnePoistenie: '650,32',
  uhrnPovinnehoPoistnehoNaZdravotnePoistenie: '350,22',
  zaplatenePreddavky: '80.50',
  udajeODanovomBonuseNaDieta: '50.75',
  employed: true,

  /** SECTION Pension */
  platil_prispevky_na_dochodok: true,
  zaplatene_prispevky_na_dochodok: '170,32',

  /** SECTION Partner */
  r031_priezvisko_a_meno: 'Fake Fake',
  r031_rodne_cislo: '9609226286',
  r032_partner_pocet_mesiacov: '12',
  r032_partner_vlastne_prijmy: '3000,76',
  r032_uplatnujem_na_partnera: true,
  partner_spolocna_domacnost: true,
  partner_podmienky: { '1': ['on'] },

  /** SECTION Children */
  children: [
    {
      id: 1,
      priezviskoMeno: 'Morty Smith',
      rodneCislo: '1607201167',

      wholeYear: false,
      monthFrom: '6',
      monthTo: '11',
    },
    {
      id: 2,
      priezviskoMeno: 'Summer Smith',
      rodneCislo: '1057201167',

      wholeYear: true,
      monthFrom: '6',
      monthTo: '11',
    },
  ],
  hasChildren: true,

  expectNgoDonationValue: false,

  percent2: '10,22',
  percent3: '12,24',
}
