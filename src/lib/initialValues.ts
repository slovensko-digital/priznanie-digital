import {
  PersonalInformationUserInput,
  PartnerUserInput,
  IncomeAndExpenseUserInput,
  EmployedUserInput,
  DohodaUserInput,
  ChildrenUserInput,
  PensionUserInput,
  UrokyUserInput,
  TwoPercentUserInput,
  TaxBonusUserInput,
  RentUserInput,
} from '../types/PageUserInputs'
import { ChildInput, TaxFormUserInput } from '../types/TaxFormUserInput'
import { PostponeUserInput } from '../types/PostponeUserInput'

export const incomeAndExpenseInitialValues: IncomeAndExpenseUserInput = {
  prijem_zo_zivnosti: undefined,
  t1r10_prijmy: '',
  priloha3_r11_socialne: '',
  priloha3_r13_zdravotne: '',
  zaplatenePreddavky: '',
}

export const partnerUserInitialValues: PartnerUserInput = {
  r031_priezvisko_a_meno: '',
  r031_rodne_cislo: '',
  r032_uplatnujem_na_partnera: undefined,
  partner_step: 0,
  partner_podmienky: {},
  r032_partner_vlastne_prijmy: '',
  r032_partner_pocet_mesiacov: '',
}
export const personalInformationUserInputInitialValues: PersonalInformationUserInput =
  {
    r001_dic: '',
    // r002_datum_narodenia: "",
    r003_nace: '',
    meno_priezvisko: '',
    r005_meno: '',
    r004_priezvisko: '',
    r006_titul: '',
    r007_ulica: '',
    r008_cislo: '',
    r009_psc: '',
    r010_obec: '',
    r011_stat: '',
  }

export const employmentUserInputInitialValues: EmployedUserInput = {
  employed: undefined,
  uhrnPrijmovOdVsetkychZamestnavatelov: '',
  uhrnPovinnehoPoistnehoNaSocialnePoistenie: '',
  uhrnPovinnehoPoistnehoNaZdravotnePoistenie: '',
  udajeODanovomBonuseNaDieta: '',
  uhrnPreddavkovNaDan: '',
}

export const dohodaUserInputInitialValues: DohodaUserInput = {
  dohoda: undefined,
  uhrnPrijmovZoVsetkychDohod: '',
  uhrnPovinnehoPoistnehoNaSocialnePoistenieDohody: '',
  uhrnPovinnehoPoistnehoNaZdravotnePoistenieDohody: '',
  udajeODanovomBonuseNaDietaDohody: '',
  uhrnPreddavkovNaDanDohody: '',
}

export const rentUserInputInitialValues: RentUserInput = {
  rent: undefined,
  vyskaPrijmovZPrenajmu: '',
  vyskaOslobodenia: '',
  prenajomPrijemZPrilezitostnejCinnosti: undefined,
  vydavkyZPrenajmu: '',
  rent_step: 0,
}

let childCounter = 0

export const makeEmptyChild = (): ChildInput => ({
  id: childCounter++,
  priezviskoMeno: '',
  rodneCislo: '',

  wholeYear: true,
  monthFrom: '0',
  monthTo: '11',
})

export const childrenUserInputInitialValues: ChildrenUserInput = {
  hasChildren: undefined,
  partner_bonus_na_deti: undefined,
  partner_bonus_na_deti_typ_prijmu: '0',
  partner_bonus_na_deti_od: '',
  partner_bonus_na_deti_do: '',
  r034a: '',
  children: [makeEmptyChild()],
}

export const pensionInitialValues: PensionUserInput = {
  platil_prispevky_na_dochodok: undefined,
  zaplatene_prispevky_na_dochodok: '',
}

export const urokyInitialValues: UrokyUserInput = {
  r035_zaplatene_uroky: '',
  r035_uplatnuje_uroky: undefined,
  hypoteka_step: 0,
}

export const twoPercentInitialValues: TwoPercentUserInput = {
  XIIoddiel_uplatnujem2percenta: undefined,
  dve_percenta_podporujem: 'ano-sk-digital',
  splnam3per: false,
  r142_ico: '',
  r142_obchMeno: '',
  XIIoddiel_suhlasZaslUdaje: false,
}

export const taxBonusInitialInput: TaxBonusUserInput = {
  iban: '',
  ziadamVyplatitDanovyBonusUrokPreplatok: undefined,
}

export const initTaxFormUserInputValues: TaxFormUserInput = {
  ...incomeAndExpenseInitialValues,
  ...partnerUserInitialValues,
  ...personalInformationUserInputInitialValues,
  ...employmentUserInputInitialValues,
  ...rentUserInputInitialValues,
  ...childrenUserInputInitialValues,
  ...pensionInitialValues,
  ...urokyInitialValues,
  ...twoPercentInitialValues,
  ...taxBonusInitialInput,
  ...{ datum: '' },
  ...{ email: '' },
}

export const initialPostponeUserInput: PostponeUserInput = {
  prijmy_zo_zahranicia: undefined,
  dic: '',
  meno_priezvisko: '',
  titul_pred: '',
  titul_za: '',
  meno: '',
  priezvisko: '',
  psc: '',
  obec: '',
  ulica: '',
  cislo: '',
  stat: '',
  datum: '',
}
