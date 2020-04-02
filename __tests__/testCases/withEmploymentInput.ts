import { TaxFormUserInput } from '../../src/types/TaxFormUserInput'

export const withEmploymentInput: TaxFormUserInput = {
  priloha3_r11_socialne: '1000',
  priloha3_r13_zdravotne: '1000',
  r001_dic: '233123123',
  // R002_datum_narodenia: "22.02.1993",
  r003_nace: '62010 - Počítačové programovanie',
  meno_priezvisko: 'Fake Name',
  r007_ulica: 'Mierova',
  r008_cislo: '4',
  r009_psc: '82105',
  r010_obec: 'Bratislava 3',
  r011_stat: 'Slovensko',
  t1r10_prijmy: '25000',
  r038: '4000',
  r039: '1000',
  employed: true,
  hasChildren: false,
  children: [],
  datum: '22.02.2020',
}
