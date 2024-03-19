import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

export const bugReport18Input: E2eTestUserInput = {
  t1r10_prijmy: "23253.01",
  priloha3_r11_socialne: "8836.14",
  priloha3_r13_zdravotne: "465.06",
  zaplatenePreddavky: "3738.14",
  employed: true,
  hasChildren: true,
  children: [
    {
      id: 0,
      priezviskoMeno: "Fake Child 0",
      rodneCislo: "1059154800",
      wholeYear: true,
      monthFrom: "0",
      monthTo: "11"
    },
    {
      id: 1,
      priezviskoMeno: "Fake Child 1",
      rodneCislo: "1404153432",
      wholeYear: false,
      monthFrom: "2",
      monthTo: "10"
    },
    {
      id: 2,
      priezviskoMeno: "Fake Child 2",
      rodneCislo: "0359153773",
      wholeYear: false,
      monthFrom: "5",
      monthTo: "10"
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
  uhrnPrijmovOdVsetkychZamestnavatelov: "76729.75",
  uhrnPovinnehoPoistnehoNaSocialnePoistenie: "16066.56",
  uhrnPovinnehoPoistnehoNaZdravotnePoistenie: "84892.67",
  udajeODanovomBonuseNaDieta: "5295.12",
  uhrnPreddavkovNaDan: "14529.67",
  rent: true,
  vyskaPrijmovZPrenajmu: "1594.31",
  vydavkyZPrenajmu: "517.05",
  prenajomPrijemZPrilezitostnejCinnosti: false,
  vyskaOslobodenia: "500",
  r035_uplatnuje_uroky: true,
  uroky_rok_uzatvorenia: "2021",
  uroky_zaciatok_urocenia_den: "21",
  uroky_zaciatok_urocenia_mesiac: "8",
  uroky_zaciatok_urocenia_rok: "2021",
  uroky_dalsi_dlznik: true,
  uroky_pocet_dlznikov: "2",
  r035_zaplatene_uroky: "1069.84",
  uroky_dalsi_uver_uplatnuje: false,
  uroky_splnam_vek_kriteria: true,
  uroky_splnam_prijem: true,
  platil_prispevky_na_dochodok: true,
  zaplatene_prispevky_na_dochodok: "41.36"
}