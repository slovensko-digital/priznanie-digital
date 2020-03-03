export interface TaxFormUserInput {
  // 01 - DIČ (ak nie je pridelené| uvádza sa rodné číslo)
  r001_dic: string;
  // 02 - Dátum narodenia
  // TODO Aky format?
  // r002_datum_narodenia: string;
  // 03 - SK NACE - Hlavná, prevažná činnosť
  // TODO tu treba odkial natahat cinnosti do dropdownu, mozno to bude enum, UX musi byt zvladnute
  r003_nace: string;
  // Oddiel I
  // 04 - Priezvisko
  r004_priezvisko: string;
  // 05 - Meno
  r005_meno: string;
  // 07 - Ulica
  r007_ulica: string;
  // 08 - Súpisné/orientačné číslo *
  r008_cislo: string;
  // 09 - PSČ *
  r009_psc: string;
  // 10 - Obec *
  r010_obec: string;
  // 11 - Štát *
  r011_stat: string;
  /** Musi byt sucastou user inputu, aj ked sa generuje automaticky, inac by
   * failovali test */
  datum?: string;
  // Partner
  r031_priezvisko_a_meno?: string;
  r031_rodne_cislo?: string;
  r032_uplatnujem_na_partnera?: boolean;
  r032_partner_vlastne_prijmy?: number;
  r032_partner_pocet_mesiacov?: number;
  r033_partner_kupele?: boolean;
  // max 50
  r033_partner_kupele_uhrady?: number;
  // VI.Príjmy z tabuľky č. 1, stĺ. 1, r. 10
  t1r10_prijmy: number; // TODO asi zrkadlenie do VI.Príjmy z tabuľky č. 1, stĺ. 1, r. 2
  // Preukázateľne zaplatené poistné na sociálne poistenie z príjmov
  priloha3_r11_socialne: number;
  // Preukázateľne zaplatené poistné na zdravotné poistenie z príjmov
  priloha3_r13_zdravotne: number;
  // Zamestnanie
  employed?: boolean;
  r038?: number;
  r039?: number;
  // Deti
  kids?: boolean;
  r034?: [
    {
      priezviskoMeno: string;
      rodneCislo: string;
      kupelnaStarostlivost: boolean;
      m00: boolean;
      m01: boolean;
      m02: boolean;
      m03: boolean;
      m04: boolean;
      m05: boolean;
      m06: boolean;
      m07: boolean;
      m08: boolean;
      m09: boolean;
      m10: boolean;
      m11: boolean;
      m12: boolean;
    },
  ];
}
