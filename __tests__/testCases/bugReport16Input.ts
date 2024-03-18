import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

export const bugReport16Input: E2eTestUserInput = {
  t1r10_prijmy: "30668.64",
  priloha3_r11_socialne: "1533.43",
  priloha3_r13_zdravotne: "613.37",
  zaplatenePreddavky: "99798.51",
  employed: false,
  hasChildren: true,
  children: [
    {
      id: 0,
      priezviskoMeno: "Fake Child 0",
      rodneCislo: "0957154737",
      wholeYear: false,
      monthFrom: "7",
      monthTo: "10"
    },
    {
      id: 1,
      priezviskoMeno: "Fake Child 1",
      rodneCislo: "0956156982",
      wholeYear: true,
      monthFrom: "0",
      monthTo: "11"
    },
    {
      id: 2,
      priezviskoMeno: "Fake Child 2",
      rodneCislo: "0108151868",
      wholeYear: false,
      monthFrom: "6",
      monthTo: "7"
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
  rent: true,
  vyskaPrijmovZPrenajmu: "4794.78",
  vydavkyZPrenajmu: "8596.86",
  prenajomPrijemZPrilezitostnejCinnosti: true,
  vyskaOslobodenia: "460.59",
  r035_uplatnuje_uroky: true,
  uroky_rok_uzatvorenia: "2019",
  uroky_zaciatok_urocenia_den: "21",
  uroky_zaciatok_urocenia_mesiac: "8",
  uroky_zaciatok_urocenia_rok: "2019",
  uroky_dalsi_dlznik: true,
  uroky_pocet_dlznikov: "2",
  r035_zaplatene_uroky: "2866.75",
  uroky_dalsi_uver_uplatnuje: false,
  uroky_splnam_vek_kriteria: true,
  uroky_splnam_prijem: true,
  platil_prispevky_na_dochodok: true,
  zaplatene_prispevky_na_dochodok: "99.90"
}