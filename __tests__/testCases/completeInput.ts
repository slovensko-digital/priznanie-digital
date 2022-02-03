import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

export const completeInput: E2eTestUserInput = {
  priloha3_r11_socialne: '1000',
  priloha3_r13_zdravotne: '1000',
  r001_dic: '233123123',
  r003_nace: '62010 - Počítačové programovanie',
  r005_meno: 'Fake',
  r004_priezvisko: 'Name',
  r006_titul: 'Ing. / PhD.',
  r007_ulica: 'Mierova',
  r008_cislo: '4',
  r009_psc: '82105',
  r010_obec: 'Bratislava 3',
  r011_stat: 'Slovensko',
  t1r10_prijmy: '25000',
  uhrnPreddavkovNaDan: '100',
  datum: '22.02.2020',

  /** SECTION Employment */
  uhrnPrijmovOdVsetkychZamestnavatelov: '4000',
  uhrnPovinnehoPoistnehoNaSocialnePoistenie: '600',
  uhrnPovinnehoPoistnehoNaZdravotnePoistenie: '400',
  zaplatenePreddavky: '80',
  udajeODanovomBonuseNaDieta: '50',
  employed: true,

  /** SECTION Mortgage */
  r037_uplatnuje_uroky: true,
  r037_zaplatene_uroky: '200',
  r037_pocetMesiacov: '12',

  /** SECTION Pension */
  platil_prispevky_na_dochodok: true,
  zaplatene_prispevky_na_dochodok: '180',

  /** SECTION Partner */
  r031_priezvisko_a_meno: 'Fake Fake',
  r031_rodne_cislo: '9609226286',
  r032_partner_pocet_mesiacov: '12',
  r032_partner_vlastne_prijmy: '3000',
  r032_uplatnujem_na_partnera: true,
  partner_spolocna_domacnost: true,
  partner_bonus_uplatneny: false,
  partner_podmienky: { '1': true },

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

  expectNgoDonationPage: true,
}
