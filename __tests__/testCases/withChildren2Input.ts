import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'
import { generateRodneCislo } from '../utils/generateRodneCislo'

const currentYear = new Date().getFullYear()

export const withChildren2Input: E2eTestUserInput = {
  prijem_zo_zivnosti: true,
  priloha3_r11_socialne: '1000',
  priloha3_r13_zdravotne: '1000',
  r001_dic: '233123123',
  r003_nace: '62010 - Počítačové programovanie',
  r005_meno: 'Fake',
  r004_priezvisko: 'Name',
  r007_ulica: 'Mierova',
  r008_cislo: '4',
  r009_psc: '82105',
  r010_obec: 'Bratislava 3',
  r011_stat: 'Slovensko',
  t1r10_prijmy: '27000',
  datum: '22.02.2020',
  children: [
    {
      id: 1,
      priezviskoMeno: 'Morty Smith',
      rodneCislo: generateRodneCislo({
        birthDate: new Date(currentYear - 10, 6, 20),
        gender: 'MALE',
      }).pure,
      wholeYear: false,
      monthFrom: '6',
      monthTo: '11',
    },
  ],
  hasChildren: 'yes',

  expectNgoDonationValue: false,

  percent2: '5,63',
  percent3: '6,39',
}
