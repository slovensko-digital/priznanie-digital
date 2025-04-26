import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

export const bugReport21Input: E2eTestUserInput = {
  t1r10_prijmy: '14395.50',
  priloha3_r11_socialne: '151.31',
  priloha3_r13_zdravotne: '200',
  zaplatenePreddavky: '0',
  employed: false,
  hasChildren: true,
  children: [
    {
      id: 0,
      priezviskoMeno: 'Fake Child 0',
      rodneCislo: '2258156373',
      wholeYear: true,
      monthFrom: '0',
      monthTo: '11',
    },
    {
      id: 1,
      priezviskoMeno: 'Fake Child 1',
      rodneCislo: '0252159853',
      wholeYear: false,
      monthFrom: '0',
      monthTo: '6',
    },
  ],
  r005_meno: 'Fake',
  r004_priezvisko: 'Name',
  r001_dic: '233123123',
  r003_nace: '62010 - Počítačové programovanie',
  r007_ulica: 'Mierova',
  r008_cislo: '4',
  r009_psc: '82105',
  r010_obec: 'Bratislava 3',
  r011_stat: 'Slovensko',
  datum: '22.02.2020',
}
