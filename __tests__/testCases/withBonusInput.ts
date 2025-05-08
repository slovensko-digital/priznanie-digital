import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

export const withBonusInput: E2eTestUserInput = {
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
  partner_podmienky: { '1': ['on'] },

  /** SECTION Kids */
  children: [
    {
      id: 1,
      priezviskoMeno: 'Morty Smith',
      rodneCislo: '1607201167',

      wholeYear: true,
      m01: false,
      m02: false,
      m03: false,
      m04: false,
      m05: false,
      m06: false,
      m07: true,
      m08: true,
      m09: true,
      m10: true,
      m11: true,
      m12: true,
    },
    {
      id: 2,
      priezviskoMeno: 'Summer Smith',
      rodneCislo: '1057201167',

      wholeYear: true,
      m01: false,
      m02: false,
      m03: false,
      m04: false,
      m05: false,
      m06: false,
      m07: true,
      m08: true,
      m09: true,
      m10: true,
      m11: true,
      m12: true,
    },
  ],
  hasChildren: true,

  /** SECTION Danovy bonus */
  ziadamVyplatitDanovyBonusUrokPreplatok: true,
  iban: 'SK6807200002891987426353',

  expectNgoDonationValue: false,
}
