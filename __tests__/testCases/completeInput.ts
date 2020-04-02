import { TaxFormUserInput } from '../../src/types/TaxFormUserInput'

export const completeInput: TaxFormUserInput = {
  priloha3_r11_socialne: '1000',
  priloha3_r13_zdravotne: '1000',
  r001_dic: '233123123',
  r003_nace: '62010 - Počítačové programovanie',
  meno_priezvisko: 'Fake Name',
  r007_ulica: 'Mierova',
  r008_cislo: '4',
  r009_psc: '82105',
  r010_obec: 'Bratislava 3',
  r011_stat: 'Slovensko',
  t1r10_prijmy: '25000',
  datum: '22.02.2020',

  /** SECTION Employment */
  r038: '4000',
  r039: '1000',
  employed: true,

  /** SECTION Mortgage */
  r037_uplatnuje_uroky: true,
  r037_zaplatene_uroky: '200',
  r037_pocetMesiacov: '12',

  /** SECTION Pension */
  r029_poberal_dochodok: true,
  r030_vyska_dochodku: '800',

  /** SECTION Partner */
  r031_priezvisko_a_meno: 'Fake Fake',
  r031_rodne_cislo: '9609226286',
  r032_partner_pocet_mesiacov: '12',
  r032_partner_vlastne_prijmy: '4000',
  r032_uplatnujem_na_partnera: true,

  /** SECTION Spa */
  r036_deti_kupele: '30',
  r033_partner_kupele: true,
  r033_partner_kupele_uhrady: '20',
  r076a_kupele_danovnik: '20',

  /** SECTION Children */
  children: [
    {
      id: 1,
      priezviskoMeno: 'Morty Smith',
      rodneCislo: '1607201167',
      kupelnaStarostlivost: true,
      wholeYear: false,
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
}
