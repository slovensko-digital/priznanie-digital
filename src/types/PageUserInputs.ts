import { TaxFormUserInput } from './TaxFormUserInput'
import { PostponeUserInput } from './PostponeUserInput'

export type IncomeAndExpenseUserInput = Pick<
  TaxFormUserInput,
  't1r10_prijmy' | 'priloha3_r11_socialne' | 'priloha3_r13_zdravotne'
>

export type EmployedUserInput = Pick<
  TaxFormUserInput,
  'employed' | 'r038' | 'r039'
>

export type ChildrenUserInput = Pick<
  TaxFormUserInput,
  'hasChildren' | 'children'
>

export type PartnerUserInput = Pick<
  TaxFormUserInput,
  | 'r031_priezvisko_a_meno'
  | 'r031_rodne_cislo'
  | 'r032_uplatnujem_na_partnera'
  | 'r032_partner_vlastne_prijmy'
  | 'r032_partner_pocet_mesiacov'
  | 'r033_partner_kupele'
  | 'r033_partner_kupele_uhrady'
>

export type PersonalInformationUserInput = Pick<
  TaxFormUserInput,
  | 'r001_dic'
  // | "r002_datum_narodenia"
  | 'r003_nace'
  | 'meno_priezvisko'
  | 'r007_ulica'
  | 'r008_cislo'
  | 'psc'
  | 'r010_obec'
  | 'r011_stat'
>

export type PersonalInformationPostponePage = Pick<
  PostponeUserInput,
  'dic' | 'meno_priezvisko' | 'ulica' | 'cislo' | 'psc' | 'obec' | 'stat'
  // | 'rodne_cislo'
>

export type PensionUserInput = Pick<
  TaxFormUserInput,
  'r029_poberal_dochodok' | 'r030_vyska_dochodku'
>

export type MortgageUserInput = Pick<
  TaxFormUserInput,
  'r037_uplatnuje_uroky' | 'r037_zaplatene_uroky' | 'r037_pocetMesiacov'
>

export type IncomeSourceCountryUserInput = Pick<
  PostponeUserInput,
  'prijmy_zo_zahranicia'
>

export type FormErrors<FormInput extends {}> = Record<keyof FormInput, string>
