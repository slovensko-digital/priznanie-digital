import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

export const bugReport7Input: E2eTestUserInput = {
  t1r10_prijmy: '200000',
  priloha3_r11_socialne: '10000',
  priloha3_r13_zdravotne: '5000',
  zaplatenePreddavky: '30000',

  employed: true,
  uhrnPrijmovOdVsetkychZamestnavatelov: '400000',
  uhrnPovinnehoPoistnehoNaSocialnePoistenie: '200000',
  uhrnPovinnehoPoistnehoNaZdravotnePoistenie: '300000',
  udajeODanovomBonuseNaDieta: '99999,99',
  uhrnPreddavkovNaDan: '400000',

  r031_priezvisko_a_meno: 'Fake Fake',
  r031_rodne_cislo: '9609226286',
  r032_partner_pocet_mesiacov: '2',
  r032_partner_vlastne_prijmy: '300',
  r032_uplatnujem_na_partnera: true,
  partner_spolocna_domacnost: true,
  partner_podmienky: { '1': ['on'] },

  r005_meno: 'Fake',
  r004_priezvisko: 'Name',
  r001_dic: '233123123',
  r003_nace: '62010 - Počítačové programovanie',
  r007_ulica: 'Mierova',
  r008_cislo: '4',
  r009_psc: '82105',
  r010_obec: 'Bratislava 3',
  r011_stat: 'Slovensko',
  datum: '22.02.2020',
  hasChildren: false,
  children: [],

  expectNgoDonationValue: true,
  percent2: '766,87',
}
