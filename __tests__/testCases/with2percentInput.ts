import { TaxFormUserInput } from '../../src/types/TaxFormUserInput'

export const with2percentInput: TaxFormUserInput = {
  priloha3_r11_socialne: '1000',
  priloha3_r13_zdravotne: '1000',
  meno_priezvisko: 'Fake Name',
  r001_dic: '233123123',
  r003_nace: '62010 - Počítačové programovanie',
  r007_ulica: 'Mierova',
  r008_cislo: '4',
  psc: '82105',
  r010_obec: 'Bratislava 3',
  r011_stat: 'Slovensko',
  t1r10_prijmy: '25000',
  datum: '22.02.2020',
  hasChildren: false,
  children: [],
  twoPercent: true,
  NGO: {
    ico: '50158635',
    obchMeno: 'Slovensko.Digital',
    ulica: 'Staré Grunty',
    cislo: '205/18',
    psc: '84104',
    obec: 'Bratislava - mestská časť Karlova Ves',
    suhlasZaslUdaje: true,
  },
}
