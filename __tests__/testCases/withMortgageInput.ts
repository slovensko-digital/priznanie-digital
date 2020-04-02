import { TaxFormUserInput } from '../../src/types/TaxFormUserInput'

export const withMortgageInput: TaxFormUserInput = {
  priloha3_r11_socialne: '1000',
  priloha3_r13_zdravotne: '1000',
  r001_dic: '233123123',
  r003_nace: '62010 - Počítačové programovanie',
  meno_priezvisko: 'Fake Name',
  r007_ulica: 'Mierova',
  r008_cislo: '4',
  r009_psc: '82105',
  r010_obec: 'Bratislava 3',
  r011_stat: 'Slovensko',
  t1r10_prijmy: '25000',
  datum: '22.02.2020',

  r037_uplatnuje_uroky: true,
  r037_zaplatene_uroky: '200',
  r037_pocetMesiacov: '12',

  hasChildren: false,
  children: [],
}
