import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

export const bugReport13Input: E2eTestUserInput = 
{
  t1r10_prijmy: "75532.62",
  priloha3_r11_socialne: "21904.46",
  priloha3_r13_zdravotne: "29457.72",
  zaplatenePreddavky: "71417.47",
  employed: false,
  hasChildren: true,
  children: [
    {
      id: 0,
      priezviskoMeno: "Fake Child 0",
      rodneCislo: "9804156978",
      wholeYear: false,
      monthFrom: "1",
      monthTo: "3"
    },
    {
      id: 1,
      priezviskoMeno: "Fake Child 1",
      rodneCislo: "1858155101",
      wholeYear: true,
      monthFrom: "0",
      monthTo: "11"
    },
    {
      id: 2,
      priezviskoMeno: "Fake Child 2",
      rodneCislo: "1601154742",
      wholeYear: true,
      monthFrom: "4",
      monthTo: "1"
    },
    {
      id: 3,
      priezviskoMeno: "Fake Child 3",
      rodneCislo: "1758159436",
      wholeYear: true,
      monthFrom: "0",
      monthTo: "11"
    },
    {
      id: 4,
      priezviskoMeno: "Fake Child 4",
      rodneCislo: "0253153186",
      wholeYear: true,
      monthFrom: "0",
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
  r031_priezvisko_a_meno: "Partner Fake",
  r031_rodne_cislo: "9609226286",
  r032_partner_pocet_mesiacov: "6",
  r032_partner_vlastne_prijmy: "4453.82",
  r032_uplatnujem_na_partnera: true,
  partner_spolocna_domacnost: true,
  partner_podmienky: {
    1: true
  },
  platil_prispevky_na_dochodok: true,
  zaplatene_prispevky_na_dochodok: "15.30"
}