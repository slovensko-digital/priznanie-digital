import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

export const bugReport8Input: E2eTestUserInput = {
  t1r10_prijmy: '28800',
  priloha3_r11_socialne: '0',
  priloha3_r13_zdravotne: '0',
  zaplatenePreddavky: '0',

  employed: false,

  r032_uplatnujem_na_partnera: false,

  rent: true,
  vyskaPrijmovZPrenajmu: '6500',
  vydavkyZPrenajmu: '1000',
  prenajomPrijemZPrilezitostnejCinnosti: false,

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
  hasChildren: false,
  children: [],

  expectNgoDonationValue: true,
  percent2: '39,08',
}
