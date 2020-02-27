import {
  PersonalInformationUserInput,
  PartnerUserInput,
  IncomeAndExpenseUserInput,
  TaxFormUserInput,
  EmployedUserInput,
  KidsUserInput,
} from "./types";

export const incomeAndExpenseInitialValues: IncomeAndExpenseUserInput = {
  t1r10_prijmy: 0,
  priloha3_r11_socialne: 0,
  priloha3_r13_zdravotne: 0,
};

export const partnerUserInitialValues: PartnerUserInput = {
  r031_priezvisko_a_meno: "",
  r031_rodne_cislo: "",
  r032_uplatnujem_na_partnera: undefined,
  r032_partner_vlastne_prijmy: 0,
  r032_partner_pocet_mesiacov: 0,
  r033_partner_kupele: false,
  r033_partner_kupele_uhrady: 0,
};
export const personalInformationUserInputInitialValues: PersonalInformationUserInput = {
  r001_dic: "",
  r002_datum_narodenia: "",
  r003_nace: "",
  r004_priezvisko: "",
  r005_meno: "",
  r007_ulica: "",
  r008_cislo: "",
  r009_psc: "",
  r010_obec: "",
  r011_stat: "",
  datum: new Date().toLocaleString("sk-sk"),
};

export const employmentUserInputInitialValues: EmployedUserInput = {
  employed: undefined,
  r038: 0,
  r039: 0,
};

export const kidsUserInputInitialValues: KidsUserInput = {
  kids: undefined,
};

export const initTaxFormUserInputValues: TaxFormUserInput = {
  ...incomeAndExpenseInitialValues,
  ...partnerUserInitialValues,
  ...personalInformationUserInputInitialValues,
  ...employmentUserInputInitialValues,
  ...kidsUserInputInitialValues,
};
