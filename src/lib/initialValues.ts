import {
  PersonalInformationUserInput,
  PartnerUserInput,
  IncomeAndExpenseUserInput,
  EmployedUserInput,
  ChildrenUserInput,
  PensionUserInput,
  MortgageUserInput,
} from '../types/PageUserInputs'
import { ChildInput, TaxFormUserInput } from '../types/TaxFormUserInput'
import { PostponeUserInput } from '../types/PostponeUserInput'

export const incomeAndExpenseInitialValues: IncomeAndExpenseUserInput = {
  t1r10_prijmy: '',
  priloha3_r11_socialne: '',
  priloha3_r13_zdravotne: '',
}

export const partnerUserInitialValues: PartnerUserInput = {
  r031_priezvisko_a_meno: '',
  r031_rodne_cislo: '',
  r032_uplatnujem_na_partnera: undefined,
  r032_partner_vlastne_prijmy: '',
  r032_partner_pocet_mesiacov: '',
  r033_partner_kupele: false,
  r033_partner_kupele_uhrady: '',
}
export const personalInformationUserInputInitialValues: PersonalInformationUserInput = {
  r001_dic: '',
  // r002_datum_narodenia: "",
  r003_nace: '',
  meno_priezvisko: '',
  r007_ulica: '',
  r008_cislo: '',
  psc: '',
  r010_obec: '',
  r011_stat: '',
}

export const employmentUserInputInitialValues: EmployedUserInput = {
  employed: undefined,
  r038: '',
  r039: '',
}

export const makeEmptyChild = (): ChildInput => ({
  id: Date.now(),
  priezviskoMeno: '',
  rodneCislo: '',
  kupelnaStarostlivost: false,
  wholeYear: false,
  monthFrom: '0',
  monthTo: '11',
})

export const childrenUserInputInitialValues: ChildrenUserInput = {
  hasChildren: undefined,
  children: [makeEmptyChild()],
}

export const pensionInitialValues: PensionUserInput = {
  r029_poberal_dochodok: undefined,
  r030_vyska_dochodku: '',
}

export const mortgageInitialValues: MortgageUserInput = {
  r037_pocetMesiacov: '',
  r037_zaplatene_uroky: '',
  r037_uplatnuje_uroky: undefined,
}

export const initTaxFormUserInputValues: TaxFormUserInput = {
  ...incomeAndExpenseInitialValues,
  ...partnerUserInitialValues,
  ...personalInformationUserInputInitialValues,
  ...employmentUserInputInitialValues,
  ...childrenUserInputInitialValues,
  ...pensionInitialValues,
  ...mortgageInitialValues,
  ...{ datum: '' },
}

export const initialPostponeUserInput: PostponeUserInput = {
  prijmy_zo_zahranicia: undefined,
  dic: '',
  meno_priezvisko: '',
  psc: '',
  obec: '',
  ulica: '',
  cislo: '',
  stat: '',
  // rodne_cislo: '',
  datum: '',
}
