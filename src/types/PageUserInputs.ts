import { TaxFormUserInput } from './TaxFormUserInput'
import { PostponeUserInput } from './PostponeUserInput'

export type IncomeAndExpenseUserInput = Pick<
  TaxFormUserInput,
  | 't1r10_prijmy'
  | 'priloha3_r11_socialne'
  | 'priloha3_r13_zdravotne'
  | 'zaplatenePreddavky'
>

export type EmployedUserInput = Pick<
  TaxFormUserInput,
  | 'employed'
  | 'uhrnPrijmovOdVsetkychZamestnavatelov'
  | 'uhrnPovinnehoPoistnehoNaSocialnePoistenie'
  | 'uhrnPovinnehoPoistnehoNaZdravotnePoistenie'
  | 'udajeODanovomBonuseNaDieta'
  | 'uhrnPreddavkovNaDan'
>

export type ChildrenUserInput = Pick<
  TaxFormUserInput,
  | 'hasChildren'
  | 'children'
  | 'partner_bonus_na_deti'
  | 'r034_priezvisko_a_meno'
  | 'r034_rodne_cislo'
  | 'r034a'
  | 'partner_bonus_na_deti_typ_prijmu'
>

export type PartnerUserInput = Pick<
  TaxFormUserInput,
  | 'r031_priezvisko_a_meno'
  | 'r031_rodne_cislo'
  | 'r032_uplatnujem_na_partnera'
  | 'r032_partner_vlastne_prijmy'
  | 'r032_partner_pocet_mesiacov'
  | 'partner_step'
  | 'partner_spolocna_domacnost'
  | 'partner_bonus_uplatneny'
  | 'partner_podmienky'
>

export type PersonalInformationUserInput = Pick<
  TaxFormUserInput,
  | 'r001_dic'
  | 'r003_nace'
  | 'meno_priezvisko'
  | 'r005_meno'
  | 'r004_priezvisko'
  | 'r006_titul'
  | 'r006_titul_za'
  | 'r007_ulica'
  | 'r008_cislo'
  | 'r009_psc'
  | 'r010_obec'
  | 'r011_stat'
>

export type PersonalInformationPostponePage = Pick<
  PostponeUserInput,
  | 'meno_priezvisko'
  | 'titul_pred'
  | 'titul_za'
  | 'meno'
  | 'priezvisko'
  | 'dic'
  | 'ulica'
  | 'cislo'
  | 'psc'
  | 'obec'
  | 'stat'
>

export type PensionUserInput = Pick<
  TaxFormUserInput,
  'platil_prispevky_na_dochodok' | 'zaplatene_prispevky_na_dochodok'
>

export type MortgageUserInput = Pick<
  TaxFormUserInput,
  'r037_uplatnuje_uroky' | 'r037_zaplatene_uroky' | 'r037_pocetMesiacov'
>

export type TwoPercentUserInput = Pick<
  TaxFormUserInput,
  | 'XIIoddiel_uplatnujem2percenta'
  | 'splnam3per'
  | 'r142_ico'
  | 'r142_obchMeno'
  | 'XIIoddiel_suhlasZaslUdaje'
>

export type TaxBonusUserInput = Pick<
  TaxFormUserInput,
  'ziadamVyplatitDanovyBonus' | 'ziadamVratitDanovyPreplatok' | 'iban'
>

export type IncomeSourceCountryUserInput = Pick<
  PostponeUserInput,
  'prijmy_zo_zahranicia'
>

export type FormErrors<FormInput extends {}> = Record<keyof FormInput, string>
