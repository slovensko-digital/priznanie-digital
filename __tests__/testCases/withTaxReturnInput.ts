import { TaxFormUserInput } from '../../src/types/TaxFormUserInput'

export const withTaxReturnInput: TaxFormUserInput = {
  priloha3_r11_socialne: '1000',
  priloha3_r13_zdravotne: '1000',
  r122: '5000',
  r005_meno: 'Fake',
  r004_priezvisko: 'Name',
  r001_dic: '233123123',
  r003_nace: '62010 - Počítačové programovanie',
  r007_ulica: 'Mierova',
  r008_cislo: '4',
  r009_psc: '82105',
  r010_obec: 'Bratislava 3',
  r011_stat: 'Slovensko',
  t1r10_prijmy: '25000',
  datum: '22.02.2020',
  hasChildren: false,
  children: [],

  /** SECTION Danovy preplatok */
  ziadamVratitDanovyPreplatok: true,
  iban: 'SK6807200002891987426353',
}
