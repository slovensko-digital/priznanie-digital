export interface TaxFormUserInputBase<T> {
  /**   01 - DIČ (ak nie je pridelené| uvádza sa rodné číslo)*/
  r001_dic: string;
  /** 03 - SK NACE - Hlavná, prevažná činnosť
   *  TODO tu treba odkial natahat cinnosti do dropdownu, mozno to bude enum,
   *  UX musi byt zvladnute */
  r003_nace: string;
  /**   04 - Priezvisko*/
  r004_priezvisko: string;
  /**   05 - Meno*/
  r005_meno: string;
  /**   07 - Ulica*/
  r007_ulica: string;
  /**   08 - Súpisné/orientačné číslo **/
  r008_cislo: string;
  /**   09 - PSČ **/
  r009_psc: string;
  /**   10 - Obec **/
  r010_obec: string;
  /**   11 - Štát **/
  r011_stat: string;
  /** Musi byt sucastou user inputu, aj ked sa generuje automaticky, inac by
   * failovali test */
  datum: string;

  /**  Partner*/
  r031_priezvisko_a_meno?: string;
  r031_rodne_cislo?: string;
  r032_uplatnujem_na_partnera?: boolean;
  r032_partner_vlastne_prijmy?: T;
  r032_partner_pocet_mesiacov?: T;
  r033_partner_kupele?: boolean;
  /**   max 50*/
  r033_partner_kupele_uhrady?: T;
  /**   VIs.Príjmy z tabuľky č. 1, stĺ. 1, r. 10 TODO asi zrkadlenie do VI.Príjmy z tabuľky č. 1, stĺ. 1, r. 2*/
  t1r10_prijmy: T;
  /**   Preukázateľne zaplatené poistné na sociálne poistenie z príjmov*/
  priloha3_r11_socialne: T;
  /**   Preukázateľne zaplatené poistné na zdravotné poistenie z príjmov*/
  priloha3_r13_zdravotne: T;
  /**   Zamestnanie */
  r038?: T;
  r039?: T;
  /**   Deti*/
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

  children?: boolean;
  employed?: boolean;
}

export type TaxFormUserInput<T = string> = TaxFormUserInputBase<T>;
