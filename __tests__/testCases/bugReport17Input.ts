import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

export const bugReport17Input: E2eTestUserInput = {
  t1r10_prijmy: "13062.35",
  priloha3_r11_socialne: "3004.34",
  priloha3_r13_zdravotne: "3788.08",
  zaplatenePreddavky: "65140.39",
  employed: true,
  hasChildren: true,
  children: [
    {
      id: 0,
      priezviskoMeno: "Fake Child 0",
      rodneCislo: "0953152046",
      wholeYear: false,
      monthFrom: "4",
      monthTo: "7"
    },
    {
      id: 1,
      priezviskoMeno: "Fake Child 1",
      rodneCislo: "0502150297",
      wholeYear: false,
      monthFrom: "1",
      monthTo: "7"
    },
    {
      id: 2,
      priezviskoMeno: "Fake Child 2",
      rodneCislo: "1807152831",
      wholeYear: true,
      monthFrom: "0",
      monthTo: "11"
    },
    {
      id: 3,
      priezviskoMeno: "Fake Child 3",
      rodneCislo: "9903158639",
      wholeYear: true,
      monthFrom: "0",
      monthTo: "11"
    },
    {
      id: 4,
      priezviskoMeno: "Fake Child 4",
      rodneCislo: "0655154005",
      wholeYear: false,
      monthFrom: "4",
      monthTo: "6"
    }
  ],
  r005_meno: "Fake",
  r004_priezvisko: "Name",
  r001_dic: "233123123",
  r003_nace: "62010 - Počítačové programovanie",
  r007_ulica: "Mierova",
  r008_cislo: "4",
  r009_psc: "82105",
  r010_obec: "Bratislava 3",
  r011_stat: "Slovensko",
  datum: "22.02.2020",
  uhrnPrijmovOdVsetkychZamestnavatelov: "27145.84",
  uhrnPovinnehoPoistnehoNaSocialnePoistenie: "72375.06",
  uhrnPovinnehoPoistnehoNaZdravotnePoistenie: "23608.71",
  udajeODanovomBonuseNaDieta: "89728.56",
  uhrnPreddavkovNaDan: "63727.89",
  partner_bonus_na_deti: true,
  r034_priezvisko_a_meno: "Beth Smith",
  r034_rodne_cislo: "975917/1565",
  partner_bonus_na_deti_od: "0",
  partner_bonus_na_deti_do: "11",
  partner_bonus_na_deti_typ_prijmu: "1",
  r034a: "6037.97",
  platil_prispevky_na_dochodok: true,
  zaplatene_prispevky_na_dochodok: "66.72"
}