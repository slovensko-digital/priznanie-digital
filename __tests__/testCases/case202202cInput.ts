import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

export const case202202cInput: E2eTestUserInput = {
  t1r10_prijmy: '78000',
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

  /** SECTION Dohoda */
  uhrnPrijmovZoVsetkychDohod: '0',
  uhrnPovinnehoPoistnehoNaSocialnePoistenieDohody: '0',
  uhrnPovinnehoPoistnehoNaZdravotnePoistenieDohody: '0',
  uhrnPreddavkovNaDanDohody: '0',
  udajeODanovomBonuseNaDietaDohody: '0',
  dohoda: false,

  /** SECTION Pension */
  platil_prispevky_na_dochodok: false,
  zaplatene_prispevky_na_dochodok: '0',

  /** SECTION Partner */
  r031_priezvisko_a_meno: 'Fake Fake',
  r031_rodne_cislo: '9609226286',
  r032_partner_pocet_mesiacov: '12',
  r032_partner_vlastne_prijmy: '50',
  r032_uplatnujem_na_partnera: true,
  partner_spolocna_domacnost: true,
  partner_podmienky: { '1': ['on'] },

  /** SECTION Children */
  children: [
    {
      id: 1,
      priezviskoMeno: 'Morty Smith',
      rodneCislo: '090430/0925',
      wholeYear: true,
      monthFrom: '0',
      monthTo: '0',
    },
    {
      id: 2,
      priezviskoMeno: 'Summer Smith',
      rodneCislo: '220908/0016',
      wholeYear: false,
      monthFrom: `8`,
      monthTo: '11',
    },
  ],
  hasChildren: true,

  expectNgoDonationValue: true,

  /** SECTION Two Percent */
  percent2: '166,44',
  percent3: '321,15',
}
