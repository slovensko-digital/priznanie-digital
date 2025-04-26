import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

export const withEmploymentInput: E2eTestUserInput = {
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
  t1r10_prijmy: '25000',
  uhrnPrijmovOdVsetkychZamestnavatelov: '4000',
  uhrnPovinnehoPoistnehoNaSocialnePoistenie: '700',
  uhrnPovinnehoPoistnehoNaZdravotnePoistenie: '300',
  employed: true,
  hasChildren: false,
  children: [],
  datum: '22.02.2022',
  expectNgoDonationValue: true,

  percent2: '16,06',
  percent3: '28,89',
}
