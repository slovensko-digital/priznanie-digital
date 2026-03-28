import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

export const case202507Input: E2eTestUserInput = {
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
  t1r10_prijmy: '8500',
  priloha3_r11_socialne: '800',
  priloha3_r13_zdravotne: '450',
  zaplatenePreddavky: '0',

  /** SECTION Rental income */
  rent: true,
  vyskaPrijmovZPrenajmu: '7500',
  vydavkyZPrenajmu: '3800',
  prenajomPrijemZPrilezitostnejCinnosti: false,
  vyskaOslobodenia: '500',

  /** SECTION Employment */
  employed: true,
  uhrnPrijmovOdVsetkychZamestnavatelov: '3918',
  uhrnPovinnehoPoistnehoNaSocialnePoistenie: '368.29',
  uhrnPovinnehoPoistnehoNaZdravotnePoistenie: '156.72',
  uhrnPreddavkovNaDan: '644.64',
  udajeODanovomBonuseNaDieta: '0',

  /** SECTION Pension */
  platil_prispevky_na_dochodok: false,

  /** SECTION Partner */
  r032_uplatnujem_na_partnera: false,

  /** SECTION Children */
  children: [
    {
      id: 1,
      priezviskoMeno: 'Mrkvička Ferko',
      rodneCislo: '1008154741',
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
    {
      id: 3,
      priezviskoMeno: 'Mrkvička Jozef',
      rodneCislo: '0705152371',
      wholeYear: false,
      monthFrom: '0',
      monthTo: '4',
    },
  ],
  hasChildren: 'yes',
  partner_bonus_na_deti_chce_uplatnit: true,
  partner_bonus_na_deti: false,
  r034_priezvisko_a_meno: 'Ernestová Elvíra',
  r034_rodne_cislo: '9755156631',
  partner_bonus_na_deti_od: '0',
  partner_bonus_na_deti_do: '11',
  r034a: '40000',
  partner_bonus_na_deti_typ_prijmu: '1',

  /** SECTION Mortgage */
  r035_uplatnuje_uroky: true,
  r035_zaplatene_uroky: '850',
  uroky_zaciatok_urocenia_den: '8',
  uroky_zaciatok_urocenia_mesiac: '7',
  uroky_zaciatok_urocenia_rok: '2025',
  uroky_zmluva_den_uzatvorenia: '16',
  uroky_zmluva_mesiac_uzatvorenia: '1',
  uroky_zmluva_rok_uzatvorenia: '2025',
  uroky_dalsi_uver_uplatnuje: false,
  uroky_splnam_vek_kriteria: true,
  uroky_splnam_prijem: true,

  /** SECTION Bank account */
  ziadamVyplatitDanovyBonusUrokPreplatok: true,
  iban: 'SK6611110000001527106009',
}
