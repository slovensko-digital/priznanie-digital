export type IncomeAndExpenseUserInput = Pick<
  TaxFormUserInput,
  "t1r10_prijmy" | "priloha3_r11_socialne" | "priloha3_r13_zdravotne"
>;

export type EmployedUserInput = Pick<
  TaxFormUserInput,
  "employed" | "r038" | "r039"
>;

export type KidsUserInput = Pick<TaxFormUserInput, "kids" | "r034">;

export type PartnerUserInput = Pick<
  TaxFormUserInput,
  | "r031_priezvisko_a_meno"
  | "r031_rodne_cislo"
  | "r032_uplatnujem_na_partnera"
  | "r032_partner_vlastne_prijmy"
  | "r032_partner_pocet_mesiacov"
  | "r033_partner_kupele"
  | "r033_partner_kupele_uhrady"
>;
export type PersonalInformationUserInput = Pick<
  TaxFormUserInput,
  | "r001_dic"
  // | "r002_datum_narodenia"
  | "r003_nace"
  | "r004_priezvisko"
  | "r005_meno"
  | "r007_ulica"
  | "r008_cislo"
  | "r009_psc"
  | "r010_obec"
  | "r011_stat"
  | "datum"
>;

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
   * failovali test*/
  datum?: string;

  // Partner
  r031_priezvisko_a_meno: string;
  r031_rodne_cislo: string;
  r032_uplatnujem_na_partnera: boolean;
  r032_partner_vlastne_prijmy: number;
  r032_partner_pocet_mesiacov: number;
  r033_partner_kupele: boolean;
  // max 50
  r033_partner_kupele_uhrady: number;

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

export interface TaxForm extends TaxFormUserInput {
  // VI.Výdavky z tabuľky č. 1, stĺ. 2, r.10

  t1r10_vydavky?: number;
  t1r2_prijmy?: number;
  t1r10_prijmy: number;
  // Preukázateľne zaplatené poistné z príjmov podľa § 6 ods. 1 a 2 zákona
  // vydavkyPoistPar6ods11_ods1a2
  priloha3_r08_poistne?: number;

  // Úhrnná suma dôchodku (ov) uvedeného (ných) v § 11 ods. 6 zákona za
  // zdaňovacie obdobie (v eurách)6)
  r030?: number;

  // Uhrn poistneho
  r039?: number;

  // The same as t1r10_vydavky
  r041?: number;

  // Výdavky z tabuľky č. 1, stĺ. 2, r.10 The same as expense above
  r042?: number;

  // Základ dane (kladný rozdiel r. 41 a r. 42); výsledok hospodárenia (zisk)
  r043?: number;
  // Strata (záporný rozdiel r. 41 a r. 42); výsledok hospodárenia (strata)
  r044?: number;

  // Základ dane (čiastkový základ dane) z príjmov (r. 43 + r. 44 + r. 45 - r.
  // 46) > 0
  r047?: number;

  // Znížený čiastkový základ dane z príjmov o stratu z predchádzajúcich
  // zdaňovacích období maximálne do sumy v r. 47 (r. 47 - r. 54) ASI zrkadlenie
  // 047
  r055?: number;

  // Základ dane (čiastkový základ dane) z príjmov znížený o odpočet výdavkov
  // (nákladov) na výskum a vývoj zaokrúhlený na eurocenty nadol (r. 55 - r. 56)
  // Zrkadlenie 55
  r057?: number;

  // Základ dane z príjmov pred znížením o nezdaniteľnú časť základu dane (r. 40
  // + r. 57)
  r072_pred_znizenim?: number;

  // Hardconuta value 3937.35 - nezdaniteľnú časť základu Ak r.72>20 507, potom
  //  r.73 má byť výsledkom max(0,9 064.094-(1/4)*r.72–r.30). Ak r72<=20 507,
  //  potom r.73 má byť výsledkom max(0,3 937.35–r.30). (2814.10)
  r073?: number;

  // "Ak je vyplnene r.31 rodné číslo a r.32 počet mesiacov, potom ak r.72>36
  // 256.38 potom r.74=max(0,[13 001.438 –1/4*r.72–max(r.32 vlastný
  // príjem,0)]*1/12*r.32 počet mesiacov). Ak r.72<=36 256.38, potom
  // r.74=max(0,[ 3 937.35 –max(r.32 vlastný príjem,0)]*1/12*r.32 počet
  // mesiacov)"
  r074_znizenie_partner?: number;

  // Kupele spolu r.76a + r.76b
  r076_kupele_spolu?: number;
  // Kupele danovik
  r076a_kupele_danovnik?: number;
  // má byť rovné preukázateľne zaplateným úhradám na KS za manželku (max 50 €)
  // a za každé označené dieťa (max 50 € za 1 dieťa) (50.00)
  r076b_kupele_partner_a_deti?: number;

  // Spolu (r. 73 + r. 74 + r.75 + r.76) maximálne do výšky základu dane v r. 72
  r077_nezdanitelna_cast?: number;

  // Základ dane z príjmov  po znížení o nezdaniteľnú časť (r. 72 - r. 77)
  r078_zaklad_dane_z_prijmov?: number;

  //Základ dane zistený (r. 78 + r. 65 + r. 71 + r. 79)
  r080_zaklad_dane_celkovo?: number;
  // Daň zo základu dane zisteného uvedeného v riadku 80 zaokrúhlená na
  // eurocenty nadol r080 * 0.19
  r081?: number;

  // 'r. 90': má byť výsledkom r.84 - r.89 ak platí, že r. 82 je rôzne od 0 a
  // súčasne r.85>0. Ak r.82 = 0 a súčasne r. 85>0, potom r.90 je výsledkom r.81
  // - r. 89. Inak ak r82<>0 a r85=0, potom r.90 je rovné r.84. Inak r. 90 =
  // r.81.Zrkadlenie r081 TODO preverit
  r090?: number;

  // Daň (daňová povinnosť) zo základu dane z osobitného základu dane a z
  // osobitného základu dane (r. 90 + r. 104 + r. 28 Prílohy č. 2) Zrkadlenie
  // r081
  r105_dan?: number;

  // Daň (daňová povinnosť) znížená o daňový bonus (r. 105 - r. 106) Zrkadlenie
  // r081
  r107?: number;

  //Daň (daňová povinnosť) znížená o daňový bonus a o daňový bonus na zaplatené
  // úroky(r. 107 - r. 112) zrkadli r107
  r113?: number;

  // Daň na úhradu vrátane zamestnávateľom nesprávne vyplateného daňového bonusu
  // podľa § 33 zákona33) r. 105 - r. 106 + r. 108 + r. 110 - r. 112 + r. 114 +
  // r. 116 + r. 117 - r. 118 - r. 119 - r. 120 - r. 121 - r. 122 - r. 123 - r.
  // 124 (+)
  r125_dan_na_uhradu?: number;

  //Daňový preplatok znížený o zamestnávateľom nesprávne vyplatený daňový bonus
  // podľa § 33 zákona Ak je r125_dan_na_uhradu, tak absolutna hodnota
  // r125_dan_na_uhradu
  r126_danovy_preplatok?: number;
}
