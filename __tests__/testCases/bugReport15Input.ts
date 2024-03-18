import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

export const bugReport15Input: E2eTestUserInput = {
  t1r10_prijmy: "38621.12",
  priloha3_r11_socialne: "1544.84",
  priloha3_r13_zdravotne: "6951.80",
  zaplatenePreddavky: "6128.50",
  employed: false,
  hasChildren: true,
  children: [
    {
      id: 0,
      priezviskoMeno: "Fake Child 0",
      rodneCislo: "0454153260",
      wholeYear: true,
      monthFrom: "0",
      monthTo: "11"
    },
    {
      id: 1,
      priezviskoMeno: "Fake Child 1",
      rodneCislo: "0854157348",
      wholeYear: false,
      monthFrom: "8",
      monthTo: "9"
    },
    {
      id: 2,
      priezviskoMeno: "Fake Child 2",
      rodneCislo: "0410152787",
      wholeYear: true,
      monthFrom: "0",
      monthTo: "11"
    },
    {
      id: 3,
      priezviskoMeno: "Fake Child 3",
      rodneCislo: "2257150192",
      wholeYear: true,
      monthFrom: "0",
      monthTo: "11"
    },
    {
      id: 4,
      priezviskoMeno: "Fake Child 4",
      rodneCislo: "0305157017",
      wholeYear: false,
      monthFrom: "2",
      monthTo: "6"
    },
    {
      id: 5,
      priezviskoMeno: "Fake Child 5",
      rodneCislo: "1508152074",
      wholeYear: false,
      monthFrom: "5",
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
  vyskaPrijmovZPrenajmu: "8111.00",
  vydavkyZPrenajmu: "3320.64",
  prenajomPrijemZPrilezitostnejCinnosti: false,
  vyskaOslobodenia: "500",
  r035_uplatnuje_uroky: true,
  uroky_rok_uzatvorenia: "2021",
  uroky_zaciatok_urocenia_den: "21",
  uroky_zaciatok_urocenia_mesiac: "8",
  uroky_zaciatok_urocenia_rok: "2021",
  uroky_dalsi_dlznik: true,
  uroky_pocet_dlznikov: "2",
  r035_zaplatene_uroky: "1965.27",
  uroky_dalsi_uver_uplatnuje: false,
  uroky_splnam_vek_kriteria: true,
  uroky_splnam_prijem: true,
  platil_prispevky_na_dochodok: true,
  zaplatene_prispevky_na_dochodok: "2.26"
}