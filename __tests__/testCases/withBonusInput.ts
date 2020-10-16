import { TaxFormUserInput } from '../../src/types/TaxFormUserInput'

export const withBonusInput: TaxFormUserInput = {
  priloha3_r11_socialne: '1000',
  priloha3_r13_zdravotne: '1000',
  r005_meno: 'Fake',
  r004_priezvisko: 'Name',
  r001_dic: '233123123',
  r003_nace: '62010 - Počítačové programovanie',
  r007_ulica: 'Mierova',
  r008_cislo: '4',
  r009_psc: '82105',
  r010_obec: 'Bratislava 3',
  r011_stat: 'Slovensko',
  t1r10_prijmy: '25000',
  datum: '22.02.2020',

  /** SECTION Partner */
  r031_priezvisko_a_meno: 'Fake Fake',
  r031_rodne_cislo: '9609226286',
  r032_partner_pocet_mesiacov: '12',
  r032_partner_vlastne_prijmy: '3000',
  r032_uplatnujem_na_partnera: true,
  partner_spolocna_domacnost: true,
  partner_bonus_uplatneny: false,
  partner_podmienky: { '1': true },

  /** SECTION Kids */
  children: [
    {
      id: 1,
      priezviskoMeno: 'Morty Smith',
      rodneCislo: '1607201167',
      kupelnaStarostlivost: true,
      wholeYear: true,
      monthFrom: '6',
      monthTo: '11',
    },
    {
      id: 2,
      priezviskoMeno: 'Summer Smith',
      rodneCislo: '1057201167',
      kupelnaStarostlivost: true,
      wholeYear: true,
      monthFrom: '6',
      monthTo: '11',
    },
  ],
  hasChildren: true,

  /** SECTION SPA */
  kupele: true,
  r033_partner_kupele: true,
  r033_partner_kupele_uhrady: '45',
  childrenInSpa: true,
  r036_deti_kupele: '60',
  danovnikInSpa: true,
  r076a_kupele_danovnik: '41',

  /** SECTION Danovy bonus */
  ziadamVyplatitDanovyBonus: true,
  iban: 'SK6807200002891987426353',
}
