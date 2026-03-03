import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

export const case202506Input: E2eTestUserInput = {
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
  t1r10_prijmy: '55000',
  priloha3_r11_socialne: '3500',
  priloha3_r13_zdravotne: '2500',
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
  r032_uplatnujem_na_partnera: true,
  r031_priezvisko_a_meno: 'Holá Jana',
  r031_rodne_cislo: '9452154338',
  r032_partner_vlastne_prijmy: '0',
  r032_partner_pocet_mesiacov: '12',
  partner_spolocna_domacnost: true,
  partner_podmienky: { '1': ['on'] },

  /** SECTION Children */
  children: [
    {
      id: 1,
      priezviskoMeno: 'Mrkvička Ferko',
      rodneCislo: '1007038978',
      wholeYear: true,
      monthFrom: '0',
      monthTo: '11',
    },
    {
      id: 2,
      priezviskoMeno: 'Mrkvička Janko',
      rodneCislo: '2502154996',
      wholeYear: false,
      monthFrom: '1',
      monthTo: '11',
    },
  ],
  hasChildren: 'yes',
  partner_bonus_na_deti_chce_uplatnit: false,
  partner_bonus_na_deti: false,

  /** SECTION Mortgage */
  r035_uplatnuje_uroky: true,
  r035_zaplatene_uroky: '8000',
  uroky_zaciatok_urocenia_den: '12',
  uroky_zaciatok_urocenia_mesiac: '3',
  uroky_zaciatok_urocenia_rok: '2025',
  uroky_zmluva_den_uzatvorenia: '16',
  uroky_zmluva_mesiac_uzatvorenia: '1',
  uroky_zmluva_rok_uzatvorenia: '2025',
  uroky_dalsi_uver_uplatnuje: false,
  uroky_splnam_vek_kriteria: true,
  uroky_splnam_prijem: true,

  /** SECTION Two percent to parents */
  dve_percenta_rodicom: 'nie',

  expectNgoDonationValue: true,
  percent2: '36,18',
  percent3: '54,26',
}
