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

export type DohodaUserInput = Pick<
  TaxFormUserInput,
  | 'dohoda'
  | 'uhrnPrijmovZoVsetkychDohod'
  | 'uhrnPovinnehoPoistnehoNaSocialnePoistenieDohody'
  | 'uhrnPovinnehoPoistnehoNaZdravotnePoistenieDohody'
  | 'udajeODanovomBonuseNaDietaDohody'
  | 'uhrnPreddavkovNaDanDohody'
>

export type RentUserInput = Pick<
  TaxFormUserInput,
  | 'rent'
  | 'vyskaPrijmovZPrenajmu'
  | 'vyskaOslobodenia'
  | 'prenajomPrijemZPrilezitostnejCinnosti'
  | 'vydavkyZPrenajmu'
  | 'rent_step'
>

export type ChildrenUserInput = Pick<
  TaxFormUserInput,
  | 'hasChildren'
  | 'children'
  | 'partner_bonus_na_deti_chce_uplatnit'
  | 'partner_bonus_na_deti'
  | 'r034_priezvisko_a_meno'
  | 'r034_rodne_cislo'
  | 'r034a'
  | 'partner_bonus_na_deti_typ_prijmu'
  | 'partner_bonus_na_deti_od'
  | 'partner_bonus_na_deti_do'
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

export type UrokyUserInput = Pick<
  TaxFormUserInput,
  | 'r035_uplatnuje_uroky'
  | 'r035_zaplatene_uroky'
  | 'uroky_zmluva_den_uzatvorenia'
  | 'uroky_zmluva_mesiac_uzatvorenia'
  | 'uroky_zmluva_rok_uzatvorenia'
  | 'uroky_zaciatok_urocenia_den'
  | 'uroky_zaciatok_urocenia_mesiac'
  | 'uroky_zaciatok_urocenia_rok'
  | 'uroky_dalsi_dlznik'
  | 'uroky_pocet_dlznikov'
  | 'uroky_dalsi_uver_uplatnuje'
  | 'uroky_splnam_vek_kriteria'
  | 'uroky_splnam_prijem'
  | 'hypoteka_step'
>

export type TwoPercentUserInput = Pick<
  TaxFormUserInput,
  | 'dve_percenta_podporujem'
  | 'XIIoddiel_uplatnujem2percenta'
  | 'splnam3per'
  | 'r142_ico'
  | 'r142_obchMeno'
  | 'XIIoddiel_suhlasZaslUdaje'
>

export type TaxBonusUserInput = Pick<
  TaxFormUserInput,
  'ziadamVyplatitDanovyBonusUrokPreplatok' | 'iban'
>

export type IncomeSourceCountryUserInput = Pick<
  PostponeUserInput,
  'prijmy_zo_zahranicia'
>

export type FormErrors<FormInput extends {}> = Record<keyof FormInput, string>
