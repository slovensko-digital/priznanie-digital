import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

export const bugReport19Input: E2eTestUserInput = {
  t1r10_prijmy: "19781.27",
  priloha3_r11_socialne: "1186.88",
  priloha3_r13_zdravotne: "3165.00",
  zaplatenePreddavky: "89593.31",
  employed: false,
  hasChildren: true,
  children: [
    {
      id: 0,
      priezviskoMeno: "Fake Child 0",
      rodneCislo: "2258156373",
      wholeYear: true,
      monthFrom: "0",
      monthTo: "11"
    },
    {
      id: 1,
      priezviskoMeno: "Fake Child 1",
      rodneCislo: "0252159853",
      wholeYear: false,
      monthFrom: "6",
      monthTo: "6"
    },
    {
      id: 2,
      priezviskoMeno: "Fake Child 2",
      rodneCislo: "0455159903",
      wholeYear: true,
      monthFrom: "0",
      monthTo: "11"
    },
    {
      id: 3,
      priezviskoMeno: "Fake Child 3",
      rodneCislo: "0752150256",
      wholeYear: false,
      monthFrom: "11",
      monthTo: "11"
    },
    {
      id: 4,
      priezviskoMeno: "Fake Child 4",
      rodneCislo: "0106150924",
      wholeYear: false,
      monthFrom: "4",
      monthTo: "9"
    },
    {
      id: 5,
      priezviskoMeno: "Fake Child 5",
      rodneCislo: "1108154014",
      wholeYear: true,
      monthFrom: "0",
      monthTo: "11"
    },
    {
      id: 6,
      priezviskoMeno: "Fake Child 6",
      rodneCislo: "0708151191",
      wholeYear: true,
      monthFrom: "0",
      monthTo: "11"
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
  r032_partner_pocet_mesiacov: "2",
  r032_partner_vlastne_prijmy: "3715.49",
  r032_uplatnujem_na_partnera: true,
  partner_spolocna_domacnost: true,
  partner_podmienky: {
    1: true
  },
  r035_uplatnuje_uroky: true,
  uroky_rok_uzatvorenia: "2021",
  uroky_zaciatok_urocenia_den: "21",
  uroky_zaciatok_urocenia_mesiac: "8",
  uroky_zaciatok_urocenia_rok: "2021",
  uroky_dalsi_dlznik: true,
  uroky_pocet_dlznikov: "2",
  r035_zaplatene_uroky: "4949.12",
  uroky_dalsi_uver_uplatnuje: false,
  uroky_splnam_vek_kriteria: true,
  uroky_splnam_prijem: true,
  platil_prispevky_na_dochodok: true,
  zaplatene_prispevky_na_dochodok: "173.02"
}