import { TaxFormUserInput } from './TaxFormUserInput';

export type IncomeAndExpenseUserInput<T = string> = Pick<
  TaxFormUserInput<T>,
  't1r10_prijmy' | 'priloha3_r11_socialne' | 'priloha3_r13_zdravotne'
>;

export type EmployedUserInput<T = string> = Pick<
  TaxFormUserInput<T>,
  'employed' | 'r038' | 'r039'
>;

export type ChildrenUserInput<T = string> = Pick<
  TaxFormUserInput<T>,
  'children' | 'r034'
>;

export type PartnerUserInput<T = string> = Pick<
  TaxFormUserInput<T>,
  | 'r031_priezvisko_a_meno'
  | 'r031_rodne_cislo'
  | 'r032_uplatnujem_na_partnera'
  | 'r032_partner_vlastne_prijmy'
  | 'r032_partner_pocet_mesiacov'
  | 'r033_partner_kupele'
  | 'r033_partner_kupele_uhrady'
>;
export type PersonalInformationUserInput<T = string> = Pick<
  TaxFormUserInput<T>,
  | 'r001_dic'
  // | "r002_datum_narodenia"
  | 'r003_nace'
  | 'r004_priezvisko'
  | 'r005_meno'
  | 'r007_ulica'
  | 'r008_cislo'
  | 'r009_psc'
  | 'r010_obec'
  | 'r011_stat'
>;

export type PensionUserInput<T = string> = Pick<
  TaxFormUserInput<T>,
  'r029_poberal_dochodok' | 'r030_vyska_dochodku'
>;
