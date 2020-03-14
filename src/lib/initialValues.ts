import {
  PersonalInformationUserInput,
  PartnerUserInput,
  IncomeAndExpenseUserInput,
  EmployedUserInput,
  ChildrenUserInput,
  PensionUserInput,
} from '../types/PageUserInputs';
import { TaxFormUserInput } from '../types/TaxFormUserInput';
import { PostponeUserInput } from '../types/PostponeUserInput';

export const incomeAndExpenseInitialValues: IncomeAndExpenseUserInput = {
  t1r10_prijmy: '',
  priloha3_r11_socialne: '',
  priloha3_r13_zdravotne: '',
};

export const partnerUserInitialValues: PartnerUserInput = {
  r031_priezvisko_a_meno: '',
  r031_rodne_cislo: '',
  r032_uplatnujem_na_partnera: undefined,
  r032_partner_vlastne_prijmy: '',
  r032_partner_pocet_mesiacov: '',
  r033_partner_kupele: false,
  r033_partner_kupele_uhrady: '',
};
export const personalInformationUserInputInitialValues: PersonalInformationUserInput = {
  r001_dic: '',
  // r002_datum_narodenia: "",
  r003_nace: '',
  meno_priezvisko: '',
  r007_ulica: '',
  r008_cislo: '',
  r009_psc: '',
  r010_obec: '',
  r011_stat: '',
};

export const employmentUserInputInitialValues: EmployedUserInput = {
  employed: undefined,
  r038: '',
  r039: '',
};

export const emptyChild = {
  priezviskoMeno: '',
  rodneCislo: '',
  kupelnaStarostlivost: false,
  m00: false,
  m01: false,
  m02: false,
  m03: false,
  m04: false,
  m05: false,
  m06: false,
  m07: false,
  m08: false,
  m09: false,
  m10: false,
  m11: false,
  m12: false,
};

export const kidsUserInputInitialValues: ChildrenUserInput = {
  children: undefined,
  r034: [emptyChild],
};

export const pensionInitialValues: PensionUserInput = {
  r029_poberal_dochodok: undefined,
  r030_vyska_dochodku: '',
};

export const initTaxFormUserInputValues: TaxFormUserInput = {
  ...incomeAndExpenseInitialValues,
  ...partnerUserInitialValues,
  ...personalInformationUserInputInitialValues,
  ...employmentUserInputInitialValues,
  ...kidsUserInputInitialValues,
  ...pensionInitialValues,
  ...{ datum: '' },
};

export const initialPostponeUserInput: PostponeUserInput = {
  prijmy_zo_zahranicia: undefined,
  dic: '',
  meno_priezvisko: '',
  psc: '',
  obec: '',
  stat: '',
  rodne_cislo: '',
  datum: '',
};
