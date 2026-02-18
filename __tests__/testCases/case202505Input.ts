import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

export const case202505Input: E2eTestUserInput = {
  r001_dic: '524985744',
  r003_nace: '01150 - Pestovanie tabaku',
  r005_meno: 'Fero',
  r004_priezvisko: 'Mrkva',
  r006_titul: '',
  r006_titul_za: '',
  r007_ulica: 'Pekná',
  r008_cislo: '56',
  r009_psc: '91707',
  r010_obec: 'Trnava',
  r011_stat: 'Slovensko',
  datum: '08.02.2026',

  prijem_zo_zivnosti: true,
  t1r10_prijmy: '11000',
  priloha3_r11_socialne: '1200',
  priloha3_r13_zdravotne: '650',
  zaplatenePreddavky: '0',

  /** SECTION Rental income */
  rent: true,
  vyskaPrijmovZPrenajmu: '12000',
  vydavkyZPrenajmu: '4300',
  prenajomPrijemZPrilezitostnejCinnosti: false,
  vyskaOslobodenia: '500',

  /** SECTION Employment */
  employed: false,

  /** SECTION Pension */
  platil_prispevky_na_dochodok: false,

  /** SECTION Partner */
  r032_uplatnujem_na_partnera: false,

  /** SECTION Children */
  children: [
    {
      id: 1,
      priezviskoMeno: 'Mrkvička Ferko',
      rodneCislo: '2307051802',
      wholeYear: true,
      monthFrom: '0',
      monthTo: '11',
    },
    {
      id: 2,
      priezviskoMeno: 'Mrkvička Janko',
      rodneCislo: '2510075315',
      wholeYear: false,
      monthFrom: '9',
      monthTo: '11',
    },
  ],
  hasChildren: 'yes',
  partner_bonus_na_deti_chce_uplatnit: true,
  partner_bonus_na_deti: true,
  r034_priezvisko_a_meno: 'Záchranca Jana',
  r034_rodne_cislo: '9454063267',
  partner_bonus_na_deti_od: '0',
  partner_bonus_na_deti_do: '10',
  r034a: '28000',
  partner_bonus_na_deti_typ_prijmu: '1',

  /** SECTION Two percent to parents */
  dve_percenta_rodicom: 'nie',

  expectNgoDonationValue: true,
  percent2: '4,23',
  percent3: '6,35',
}
