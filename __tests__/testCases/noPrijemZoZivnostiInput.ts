import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

export const noPrijemZoZivnostiInput: E2eTestUserInput = {
  prijem_zo_zivnosti: false,
  t1r10_prijmy: '',
  priloha3_r11_socialne: '',
  priloha3_r13_zdravotne: '',
  zaplatenePreddavky: '',

  r001_dic: '233123123',
  r003_nace: '62010 - Počítačové programovanie',
  r005_meno: 'Fake',
  r004_priezvisko: 'Name',
  r007_ulica: 'Mierova',
  r008_cislo: '4',
  r009_psc: '82105',
  r010_obec: 'Bratislava 3',
  r011_stat: 'Slovensko',
  datum: '22.02.2024',

  /** SECTION Employment */
  uhrnPrijmovOdVsetkychZamestnavatelov: '25000',
  uhrnPovinnehoPoistnehoNaSocialnePoistenie: '2350',
  uhrnPovinnehoPoistnehoNaZdravotnePoistenie: '1000',
  uhrnPreddavkovNaDan: '1500',
  udajeODanovomBonuseNaDieta: '0',
  employed: true,
  dohoda: false,

  /** SECTION Pension */
  platil_prispevky_na_dochodok: false,
  zaplatene_prispevky_na_dochodok: '0',

  /** SECTION Partner */
  r032_uplatnujem_na_partnera: false,

  /** SECTION Children */
  hasChildren: 'no',
  children: [],

  /** SECTION Rent */
  rent: true,
  vyskaPrijmovZPrenajmu: '8000',
  vydavkyZPrenajmu: '2500',
  prenajomPrijemZPrilezitostnejCinnosti: false,
  vyskaOslobodenia: '500',

  expectNgoDonationValue: true,
  percent2: '80,00',
}
