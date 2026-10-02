import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

/**
 * Two employers (TPP) and two dohody entered through the "add to a list" UI.
 * The uhrn* fields must equal the sums of the list items - this is what the
 * pages store on submit and what calculation/XML is based on.
 */
export const case202510Input: E2eTestUserInput = {
  r001_dic: '1040000000',
  r003_nace: '01120 - Pestovanie ryže',
  r005_meno: 'Michal',
  r004_priezvisko: 'Čubák',
  r007_ulica: 'XXX',
  r008_cislo: '23',
  r009_psc: '06723',
  r010_obec: 'Senec',
  r011_stat: 'Slovensko',
  datum: '24.02.2026',

  prijem_zo_zivnosti: true,
  t1r10_prijmy: '555',
  priloha3_r11_socialne: '5',
  priloha3_r13_zdravotne: '75',

  /** SECTION Employment */
  employed: true,
  zamestnavatelia: [
    {
      id: 0,
      nazov: 'Firma A s.r.o.',
      prijmy: '12000,50',
      socialnePoistne: '1126,85',
      zdravotnePoistne: '480,02',
      preddavkyNaDan: '1200,10',
      danovyBonusNaDieta: '0',
    },
    {
      id: 1,
      prijmy: '8000.25',
      socialnePoistne: '751.22',
      zdravotnePoistne: '320',
      preddavkyNaDan: '650,40',
      danovyBonusNaDieta: '0',
    },
  ],
  uhrnPrijmovOdVsetkychZamestnavatelov: '20000,75',
  uhrnPovinnehoPoistnehoNaSocialnePoistenie: '1878,07',
  uhrnPovinnehoPoistnehoNaZdravotnePoistenie: '800,02',
  uhrnPreddavkovNaDan: '1850,50',

  /** SECTION Dohoda */
  dohoda: true,
  dohody: [
    {
      id: 0,
      nazov: 'DoVP 1',
      prijmy: '1500',
      socialnePoistne: '141',
      zdravotnePoistne: '60',
      preddavkyNaDan: '135,90',
      danovyBonusNaDieta: '0',
    },
    {
      id: 1,
      prijmy: '850,40',
      socialnePoistne: '79,94',
      zdravotnePoistne: '34,02',
      preddavkyNaDan: '77,02',
      danovyBonusNaDieta: '0',
    },
  ],
  uhrnPrijmovZoVsetkychDohod: '2350,40',
  uhrnPovinnehoPoistnehoNaSocialnePoistenieDohody: '220,94',
  uhrnPovinnehoPoistnehoNaZdravotnePoistenieDohody: '94,02',
  uhrnPreddavkovNaDanDohody: '212,92',

  /** SECTION Pension */
  platil_prispevky_na_dochodok: false,

  /** SECTION Partner */
  r032_uplatnujem_na_partnera: false,

  /** SECTION Children */
  hasChildren: 'no',
  children: [],

  /** SECTION Two percent to parents */
  dve_percenta_rodicom: 'nie',

  expectNgoDonationValue: true,
  percent2: '52,12',
  percent3: '78,18',
  r035_uplatnuje_uroky: false,
}
