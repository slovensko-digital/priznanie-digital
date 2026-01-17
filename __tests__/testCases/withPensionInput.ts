import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

export const withPensionInput: E2eTestUserInput = {
  priloha3_r11_socialne: '1000',
  priloha3_r13_zdravotne: '1000',
  t1r10_prijmy: '25000',
  r001_dic: '233123123',
  r003_nace: '62010 - Počítačové programovanie',
  r005_meno: 'Fake',
  r004_priezvisko: 'Name',
  r007_ulica: 'Mierova',
  r008_cislo: '4',
  r009_psc: '82105',
  r010_obec: 'Bratislava 3',
  r011_stat: 'Slovensko',
  datum: '22.02.2020',

  /** Pension */
  platil_prispevky_na_dochodok: true,
  zaplatene_prispevky_na_dochodok: '170',

  hasChildren: false,
  children: [],

  expectNgoDonationValue: true,

  percent2: '6,23',
  percent3: '14,63',
}
