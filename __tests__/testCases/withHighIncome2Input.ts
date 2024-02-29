import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

export const withHighIncome2Input: E2eTestUserInput = {
  priloha3_r11_socialne: '8000',
  priloha3_r13_zdravotne: '10000',
  t1r10_prijmy: '100000',
  zaplatenePreddavky: '6000',
  r005_meno: 'Fake',
  r004_priezvisko: 'Name',
  r001_dic: '233123123',
  r003_nace: '62010 - Počítačové programovanie',
  r007_ulica: 'Mierova',
  r008_cislo: '4',
  r009_psc: '82105',
  r010_obec: 'Bratislava 3',
  r011_stat: 'Slovensko',
  datum: '22.02.2024',
  employed: true,
  uhrnPrijmovOdVsetkychZamestnavatelov: '89992.31',
  uhrnPovinnehoPoistnehoNaSocialnePoistenie: '8880.12',
  uhrnPovinnehoPoistnehoNaZdravotnePoistenie: '8888.10',
  udajeODanovomBonuseNaDieta: '221.70',
  uhrnPreddavkovNaDan: '78.20',
  hasChildren: true,
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

  r031_priezvisko_a_meno: 'Fake Fake',
  r031_rodne_cislo: '9609226286',
  r032_partner_pocet_mesiacov: '12',
  r032_partner_vlastne_prijmy: '200',
  r032_uplatnujem_na_partnera: true,
  partner_spolocna_domacnost: true,
  partner_podmienky: { '1': true },

  /** Pension */
  platil_prispevky_na_dochodok: true,
  zaplatene_prispevky_na_dochodok: '170',

  expectNgoDonationValue: true,
  XIIoddiel_uplatnujem2percenta: true,
  r142_ico: '50158635',
  r142_obchMeno: 'Slovensko.Digital',
  XIIoddiel_suhlasZaslUdaje: true,

  percent2: '520,40',
  percent3: '780,60'
}
