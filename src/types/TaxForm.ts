import Decimal from 'decimal.js'

export interface Child {
  priezviskoMeno: string
  rodneCislo: string
  m00: boolean
  m01: boolean
  m02: boolean
  m03: boolean
  m04: boolean
  m05: boolean
  m06: boolean
  m07: boolean
  m08: boolean
  m09: boolean
  m10: boolean
  m11: boolean
  m12: boolean
}

interface Partner {
  priezviskoMeno: string
  rodneCislo: string
  m00: boolean
  m01: boolean
  m02: boolean
  m03: boolean
  m04: boolean
  m05: boolean
  m06: boolean
  m07: boolean
  m08: boolean
  m09: boolean
  m10: boolean
  m11: boolean
  m12: boolean
  druhaOsobaPodalaDPvSR: boolean
  dokladRocZuct: boolean
  dokladVyskaDane: boolean
  pocetMesiacov: number
}

export interface TaxForm {
  /**   01 - DIČ (ak nie je pridelené| uvádza sa rodné číslo)*/
  r001_dic: string
  /** 03 - SK NACE - Hlavná, prevažná činnosť */
  r003_nace: string
  /**   04 - Priezvisko*/
  r004_priezvisko: string
  /**   05 - Meno*/
  r005_meno: string
  /** 06 - Titul pred menom*/
  r006_titul: string
  /** 06 - Titul za priezviskom*/
  r006_titul_za: string
  /**   07 - Ulica*/
  r007_ulica: string
  /**   08 - Súpisné/orientačné číslo **/
  r008_cislo: string
  /** PSC */
  r009_psc: string
  /**   10 - Obec **/
  r010_obec: string
  /**   11 - Štát **/
  r011_stat: string

  /** SECTION Dochodok */
  /** 75 - ods. 10 - na preukázateľne zaplatené príspevky na doplnkové dôchodkové sporenie maximálne vo výške 180 eur */
  platil_prispevky_na_dochodok?: boolean
  r075_zaplatene_prispevky_na_dochodok?: Decimal

  /** SECTION  Partner*/
  r031_priezvisko_a_meno?: string
  r031_rodne_cislo?: string
  r032_uplatnujem_na_partnera?: boolean
  r032_partner_vlastne_prijmy?: Decimal
  r032_partner_pocet_mesiacov?: number

  /** SECTION  Mortage */
  // r037_uplatnuje_uroky?: boolean
  // r037_zaplatene_uroky?: Decimal
  // r037_pocetMesiacov?: number

  /** SECTION Prijmy a poistenie  */
  /**   VIs.Príjmy z tabuľky č. 1, stĺ. 1, r. 10 TODO asi zrkadlenie do VI.Príjmy z tabuľky č. 1, stĺ. 1, r. 2*/
  t1r10_prijmy: Decimal
  /**   Preukázateľne zaplatené poistné na sociálne poistenie z príjmov*/
  priloha3_r11_socialne: Decimal
  /**   Preukázaeľne zaplatené poistné na zdravotné poistenie z príjmov*/
  priloha3_r13_zdravotne: Decimal

  /**   Deti*/
  r033?: Child[]
  partner_bonus_na_deti: boolean
  r034: Partner
  r034a: Decimal

  /**   VI.Výdavky z tabuľky č. 1, stĺ. 2, r.10*/
  t1r10_vydavky: Decimal
  t1r2_prijmy: Decimal

  /**   Preukázateľne zaplatené poistné z príjmov podľa § 6 ods. 1 a 2 zákona */
  vydavkyPoistPar6ods11_ods1a2: Decimal

  /** SECTION  Zamestnanie */
  r036: Decimal
  r037: Decimal
  priloha3_r08_poistne_spolu: Decimal
  priloha3_r09_socialne: Decimal
  priloha3_r10_zdravotne: Decimal

  /** Základ dane (čiastkový základ dane)  */
  r038: Decimal
  /**   The same as t1r10_vydavky*/
  r039: Decimal
  /**   Výdavky z tabuľky č. 1, stĺ. 2, r.10 The same as expense above*/
  r040: Decimal
  /**   Základ dane (kladný rozdiel r. 41 a r. 42); výsledok hospodárenia (zisk)*/
  r041: Decimal
  /**  TODO  Strata (záporný rozdiel r. 41 a r. 42); výsledok hospodárenia (strata) */
  // r042: number;
  /**   Základ dane (čiastkový základ dane) z príjmov (r. 43 + r. 44 + r. 45 - r.
   *   46) > 0*/
  r045: Decimal
  /**   Znížený čiastkový základ dane z príjmov o stratu z predchádzajúcich
   *   zdaňovacích období maximálne do sumy v r. 47 (r. 47 - r. 54) ASI zrkadlenie
   *   047 */
  r055: Decimal
  /**   Základ dane (čiastkový základ dane) z príjmov znížený o odpočet výdavkov
   *   (nákladov) na výskum a vývoj zaokrúhlený na eurocenty nadol (r. 55 - r. 56)
   *   Zrkadlenie 55*/
  r057: Decimal
  /**   Základ dane z príjmov pred znížením o nezdaniteľnú časť základu dane (r. 40
   *   + r. 57)*/
  r072_pred_znizenim: Decimal
  /**   Hardconuta value 3937.35 - nezdaniteľnú časť základu Ak r.72>20 507, potom
   *    r.73 má byť výsledkom max(0,9 064.094-(1/4)*r.72–r.30). Ak r72<=20 507,
   *    potom r.73 má byť výsledkom max(0,3 937.35–r.30). (2814.10)*/
  r073: Decimal
  /**   "Ak je vyplnene r.31 rodné číslo a r.32 počet mesiacov, potom ak r.72>36
   *   256.38 potom r.74=max(0,[13 001.438 –1/4*r.72–max(r.32 vlastný
   *   príjem,0)]*1/12*r.32 počet mesiacov). Ak r.72<=36 256.38, potom
   *   r.74=max(0,[ 3 937.35 –max(r.32 vlastný príjem,0)]*1/12*r.32 počet
   *   mesiacov)"*/
  r074_znizenie_partner: Decimal
  /**   Spolu (r. 73 + r. 74 + r.75 + r.76) maximálne do výšky základu dane v r. 72*/
  r077_nezdanitelna_cast: Decimal
  /**   Základ dane z príjmov  po znížení o nezdaniteľnú časť (r. 72 - r. 77)*/
  r078_zaklad_dane_zo_zamestnania: Decimal
  /**   Základ dane zistený (r. 78 + r. 65 + r. 71 + r. 79)*/
  r080_zaklad_dane_celkovo: Decimal
  /**   Daň zo základu dane zisteného uvedeného v riadku 80 zaokrúhlená na
   *   eurocenty nadol r080 * 0.19*/
  r081: Decimal
  /**   'r. 90': má byť výsledkom r.84 - r.89 ak platí, že r. 82 je rôzne od 0 a
   *   súčasne r.85>0. Ak r.82 = 0 a súčasne r. 85>0, potom r.90 je výsledkom r.81
   *   - r. 89. Inak ak r82<>0 a r85=0, potom r.90 je rovné r.84. Inak r. 90 =
   *   r.81.Zrkadlenie r081 TODO preverit */
  r090: Decimal
  r091: Decimal
  r092: Decimal
  r094: Decimal
  r095: Decimal
  r096: Decimal
  r105: Decimal
  /**   Daň (daňová povinnosť) zo základu dane z osobitného základu dane a z
   *   osobitného základu dane (r. 90 + r. 104 + r. 28 Prílohy č. 2) Zrkadlenie
   *   r081*/
  r116_dan: Decimal
  r116a: Decimal

  /** Nárok na daňový bonus (na jedno dieťa alebo úhrn na viac vyživovaných detí) podľa § 33 zákona 22)  */
  r117: Decimal

  /**   Daň (daňová povinnosť) znížená o daňový bonus (r. 105 - r. 106) Zrkadlenie
   *   r081*/
  r118: Decimal

  /** Suma daňového bonusu podľa § 33 zákona priznaného a vyplateného zamestnávateľom   */
  r119: Decimal

  /** Rozdiel riadkov r. 106 - r. 108 > 0  */
  r120: Decimal

  /** Suma daňového bonusu podľa § 33 zákona na poukázanie správcom dane24) r. 109 - r. 105 >0 */
  r121: Decimal

  /** Riadok 112 vypĺňa daňovník, ktorý vyplnil IV. ODDIEL. Ak daňovník uplatňuje daňový bonus na zaplatené úroky podľa § 33a zákona, daňovým bonusom na zaplatené úroky podľa § 33a zákona je suma vo výške 50% zo zaplatených úrokov v príslušnom zdaňovacom období z riadku 37, najviac však do výšky 400 eur za rok. Ak obdobie úročenia úveru na bývanie počas ktorého má daňovník nárok na tento daňový bonus začalo v priebehu zdaňovacieho obdobia, uvádza sa v r. 112 suma zodpovedajúca pomernej časti daňového bonusu na zaplatené úroky z maximálnej sumy 400 eur pripadajúca na počet kalendárnych mesiacov, v ktorých vznikol nárok na jeho uplatnenie.*/
  // r123: Decimal
  /**   Daň (daňová povinnosť) znížená o daňový bonus a o daňový bonus na zaplatené
   *   úroky(r. 107 - r. 112) zrkadli r118*/
  r124: Decimal
  /**   Daň na úhradu vrátane zamestnávateľom nesprávne vyplateného daňového bonusu
   *   podľa § 33 zákona33) r. 105 - r. 106 + r. 108 + r. 110 - r. 112 + r. 114 +
   *   r. 116 + r. 117 - r. 118 - r. 119 - r. 120 - r. 121 - r. 122 - r. 123 - r.
   *   124 (+)*/

  /** zrazena dan zo zamestnania */
  r131: Decimal
  /** Zaplatené preddavky */
  r133: Decimal

  r135_dan_na_uhradu: Decimal
  /**   Daňový preplatok znížený o zamestnávateľom nesprávne vyplatený daňový bonus
   *   podľa § 33 zákona Ak je r135_dan_na_uhradu, tak absolutna hodnota
   *   r135_dan_na_uhradu */
  r136_danovy_preplatok: Decimal
  splnam3per: boolean
  /** 2 % zo zaplatenej dane (minimálne 3 eurá) z r. 113 */
  suma_2_percenta: Decimal
  /** 3 % zo zaplatenej dane (minimálne 3 eurá) z r. 113 */
  suma_3_percenta: Decimal
  /** 2 % alebo 3 % zo zaplatenej dane (minimálne 3 eurá) z r. 113 */
  r151: Decimal

  r152?: {
    ico: string
    obchMeno: string
    suhlasZaslUdaje: boolean
  }
  mikrodanovnik: boolean
  datum: string

  /** SECTION Danovy bonus */
  mozeZiadatVyplatitDanovyBonus: boolean
  ziadamVyplatitDanovyBonus: boolean
  mozeZiadatVratitDanovyPreplatok: boolean
  ziadamVratitDanovyPreplatok: boolean
  iban: string

  /** Helper properties from input, that are not part of taxForm */
  children: boolean
  employed: boolean
  XIIoddiel_uplatnujem2percenta: boolean
  danovyBonusNaDieta: {
    danovyBonus: Decimal
    nevyuzityDanovyBonus: Decimal
  }
  canDonateTwoPercentOfTax: boolean
}
