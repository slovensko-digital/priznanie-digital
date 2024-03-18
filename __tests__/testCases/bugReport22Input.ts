import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

export const bugReport22Input: E2eTestUserInput = {
  t1r10_prijmy: "92715.60",
  priloha3_r11_socialne: "5562.94",
  priloha3_r13_zdravotne: "18543.12",
  zaplatenePreddavky: "5764.27",
  employed: true,
  hasChildren: true,
  children: [
    {
      id: 0,
      priezviskoMeno: "Fake Child 0",
      rodneCislo: "0060159913",
      wholeYear: false,
      monthFrom: "3",
      monthTo: "7"
    },
    {
      id: 1,
      priezviskoMeno: "Fake Child 1",
      rodneCislo: "9956153405",
      wholeYear: false,
      monthFrom: "0",
      monthTo: "7"
    },
    {
      id: 2,
      priezviskoMeno: "Fake Child 2",
      rodneCislo: "2055159238",
      wholeYear: true,
      monthFrom: "0",
      monthTo: "11"
    },
    {
      id: 3,
      priezviskoMeno: "Fake Child 3",
      rodneCislo: "1660157169",
      wholeYear: false,
      monthFrom: "4",
      monthTo: "11"
    },
    {
      id: 4,
      priezviskoMeno: "Fake Child 4",
      rodneCislo: "1860157805",
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
  uhrnPrijmovOdVsetkychZamestnavatelov: "96336.64",
  uhrnPovinnehoPoistnehoNaSocialnePoistenie: "13134.97",
  uhrnPovinnehoPoistnehoNaZdravotnePoistenie: "76737.20",
  udajeODanovomBonuseNaDieta: "31652.09",
  uhrnPreddavkovNaDan: "12122.53",
  r034a: "14990.61",
  r031_priezvisko_a_meno: "Partner Fake",
  r031_rodne_cislo: "9609226286",
  r032_partner_pocet_mesiacov: "1",
  r032_partner_vlastne_prijmy: "959.39",
  r032_uplatnujem_na_partnera: true,
  partner_spolocna_domacnost: true,
  partner_podmienky: {
    1: true
  },
  rent: true,
  vyskaPrijmovZPrenajmu: "2143.43",
  vydavkyZPrenajmu: "860.33",
  prenajomPrijemZPrilezitostnejCinnosti: true,
  vyskaOslobodenia: "55.54",
  r035_uplatnuje_uroky: true,
  uroky_rok_uzatvorenia: "2018",
  uroky_zaciatok_urocenia_den: "21",
  uroky_zaciatok_urocenia_mesiac: "8",
  uroky_zaciatok_urocenia_rok: "2018",
  uroky_dalsi_dlznik: true,
  uroky_pocet_dlznikov: "7",
  r035_zaplatene_uroky: "4328.81",
  uroky_dalsi_uver_uplatnuje: false,
  uroky_splnam_vek_kriteria: true,
  uroky_splnam_prijem: true,
  platil_prispevky_na_dochodok: true,
  zaplatene_prispevky_na_dochodok: "13.78",
  expectNgoDonationValue: true,
  percent2: '115,27'
}