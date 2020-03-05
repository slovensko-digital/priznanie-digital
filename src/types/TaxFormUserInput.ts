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

  /** SECTION Dochodok */
  /** Poberal (a) som na začiatku zdaňovacieho obdobia dôchodok (ky) uvedený (é) v § 11 ods. 6 zákona alebo mi bol tento (tieto) dôchodok (ky) priznaný (é) spätne k začiatku príslušného zdaňovacieho obdobia (vypĺňa sa, len ak daňovník bol poberateľom dôchodku uvedeného v § 11 ods. 6 zákona na začiatku zdaňovacieho obdobia alebo mu tento dôchodok bol priznaný spätne k začiatku príslušného zdaňovacieho obdobia)  */
  r029_poberal_dochodok?: boolean;
  /** Úhrnná suma dôchodku (ov) uvedeného (ných) v § 11 ods. 6 zákona za zdaňovacie obdobie (v eurách) */
  r030_vyska_dochodku?: T;

  /** SECTION  Partner*/
  r031_priezvisko_a_meno?: string;
  r031_rodne_cislo?: string;
  r032_uplatnujem_na_partnera?: boolean;
  r032_partner_vlastne_prijmy?: T;
  r032_partner_pocet_mesiacov?: T;
  r033_partner_kupele?: boolean;
  /**   max 50*/
  r033_partner_kupele_uhrady?: T;

  /** SECTION  Mortage */
  r037_uplatnuje_uroky?: boolean;
  r037_zaplatene_uroky?: T;
  r037_pocetMesiacov?: T;

  /** SECTION Prijmy a poistenie  */
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
  /** Musi byt sucastou user inputu, aj ked sa generuje automaticky, inac by
   * failovali test */
  datum: string;
}

export type TaxFormUserInput<T = string> = TaxFormUserInputBase<T>;
