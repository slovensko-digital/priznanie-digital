import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'
import { generateRodneCislo } from '../utils/generateRodneCislo'

export const withEmploymentBonusInput: E2eTestUserInput = {
  prijem_zo_zivnosti: true,
  priloha3_r11_socialne: '435.22',
  priloha3_r13_zdravotne: '217.33',
  r001_dic: '233123123',
  r003_nace: '62010 - Počítačové programovanie',
  r005_meno: 'Fake',
  r004_priezvisko: 'Name',
  r007_ulica: 'Mierova',
  r008_cislo: '4',
  r009_psc: '82105',
  r010_obec: 'Bratislava 3',
  r011_stat: 'Slovensko',
  t1r10_prijmy: '5445',
  uhrnPrijmovOdVsetkychZamestnavatelov: '3248.30',
  uhrnPovinnehoPoistnehoNaSocialnePoistenie: '305.12',
  uhrnPovinnehoPoistnehoNaZdravotnePoistenie: '130.10',
  udajeODanovomBonuseNaDieta: '2000.70',
  uhrnPreddavkovNaDan: '1178.93',
  employed: true,
  hasChildren: 'yes',
  children: [
    {
      id: 1,
      priezviskoMeno: 'Morty Smith',
      rodneCislo: generateRodneCislo({
        turnsAge: 9,
        turnsAgeInMonth: 7,
        gender: 'MALE',
      }).pure,

      wholeYear: true,
    },
    {
      id: 2,
      priezviskoMeno: 'Summer Smith',
      rodneCislo: generateRodneCislo({
        turnsAge: 15,
        turnsAgeInMonth: 7,
        gender: 'FEMALE',
      }).pure,

      wholeYear: true,
    },
  ],
  datum: '22.02.2020',
  ziadamVyplatitDanovyBonusUrokPreplatok: true,
  iban: 'SK6807200002891987426353',

  expectNgoDonationValue: false,
}
