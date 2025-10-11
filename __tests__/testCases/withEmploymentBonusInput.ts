import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

export const withEmploymentBonusInput: E2eTestUserInput = {
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
  hasChildren: true,
  children: [
    {
      id: 1,
      priezviskoMeno: 'Morty Smith',
      rodneCislo: '1607201167',

      wholeYear: true,
    },
    {
      id: 2,
      priezviskoMeno: 'Summer Smith',
      rodneCislo: '1057201167',

      wholeYear: true,
    },
  ],
  datum: '22.02.2020',
  ziadamVyplatitDanovyBonusUrokPreplatok: true,
  iban: 'SK6807200002891987426353',

  expectNgoDonationValue: false,
}
