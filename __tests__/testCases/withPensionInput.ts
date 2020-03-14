import { TaxFormUserInput } from '../../src/types/TaxFormUserInput';

export const withPensionInput: TaxFormUserInput = {
  priloha3_r11_socialne: '1000',
  priloha3_r13_zdravotne: '1000',
  t1r10_prijmy: '25000',
  r001_dic: '233123123',
  r003_nace: '123123',
  meno_priezvisko: 'Fake Name',
  r007_ulica: 'Mierova',
  r008_cislo: '4',
  r009_psc: '82105',
  r010_obec: 'Bratislava 3',
  r011_stat: 'Slovensko',
  datum: '22.02.2020',

  /** Pension */
  r029_poberal_dochodok: true,
  r030_vyska_dochodku: '800',
};
