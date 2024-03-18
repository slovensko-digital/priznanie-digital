import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

export const bugReport14Input: E2eTestUserInput = {
  t1r10_prijmy: "31398.49",
  priloha3_r11_socialne: "4081.80",
  priloha3_r13_zdravotne: "313.98",
  zaplatenePreddavky: "65119.42",
  employed: false,
  hasChildren: true,
  children: [
    {
      id: 0,
      priezviskoMeno: "Fake Child 0",
      rodneCislo: "0155157519",
      wholeYear: true,
      monthFrom: "1",
      monthTo: "11"
    },
    {
      id: 1,
      priezviskoMeno: "Fake Child 1",
      rodneCislo: "0755156941",
      wholeYear: true,
      monthFrom: "3",
      monthTo: "2"
    },
    {
      id: 2,
      priezviskoMeno: "Fake Child 2",
      rodneCislo: "1960152579",
      wholeYear: true,
      monthFrom: "8",
      monthTo: "9"
    },
    {
      id: 3,
      priezviskoMeno: "Fake Child 3",
      rodneCislo: "0161156259",
      wholeYear: true,
      monthFrom: "11",
      monthTo: "3"
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
  r035_uplatnuje_uroky: true,
  uroky_rok_uzatvorenia: "2019",
  uroky_zaciatok_urocenia_den: "21",
  uroky_zaciatok_urocenia_mesiac: "8",
  uroky_zaciatok_urocenia_rok: "2019",
  uroky_dalsi_dlznik: true,
  uroky_pocet_dlznikov: "2",
  r035_zaplatene_uroky: "9449.74",
  uroky_dalsi_uver_uplatnuje: false,
  uroky_splnam_vek_kriteria: true,
  uroky_splnam_prijem: true,
  platil_prispevky_na_dochodok: true,
  zaplatene_prispevky_na_dochodok: "144.30"
}