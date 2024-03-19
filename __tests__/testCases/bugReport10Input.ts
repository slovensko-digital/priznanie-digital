import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

export const bugReport10Input: E2eTestUserInput = {
  t1r10_prijmy: "9678.43",
  priloha3_r11_socialne: "193.57",
  priloha3_r13_zdravotne: "1742.12",
  zaplatenePreddavky: "36750.48",
  employed: false,
  hasChildren: true,
  children: [
    {
      id: 0,
      priezviskoMeno: "Fake Child 0",
      rodneCislo: "0461156762",
      wholeYear: true,
      monthFrom: "9",
      monthTo: "5"
    },
    {
      id: 1,
      priezviskoMeno: "Fake Child 1",
      rodneCislo: "0410155801",
      wholeYear: true,
      monthFrom: "10",
      monthTo: "4"
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
  r032_partner_vlastne_prijmy: "1678.04",
  r032_uplatnujem_na_partnera: true,
  partner_spolocna_domacnost: true,
  partner_podmienky: {
    "1": true
  },
  r035_uplatnuje_uroky: true,
  uroky_rok_uzatvorenia: "2018",
  uroky_zaciatok_urocenia_den: "21",
  uroky_zaciatok_urocenia_mesiac: "8",
  uroky_zaciatok_urocenia_rok: "2018",
  uroky_dalsi_dlznik: true,
  uroky_pocet_dlznikov: "2",
  r035_zaplatene_uroky: "6540.37",
  uroky_dalsi_uver_uplatnuje: false,
  uroky_splnam_vek_kriteria: true,
  uroky_splnam_prijem: true,
  platil_prispevky_na_dochodok: true,
  zaplatene_prispevky_na_dochodok: "39.87"
}