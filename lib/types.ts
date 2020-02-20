export interface TaxFormUserInput {
  // 01 - DIČ (ak nie je pridelené, uvádza sa rodné číslo)
  r001?: string;
  // 02 - Dátum narodenia
  // TODO Aky format?
  r002?: string;
  // 03 - SK NACE - Hlavná, prevažná činnosť
  // TODO tu treba odkial natahat cinnosti do dropdownu, mozno to bude enum, UX musi byt zvladnute
  r003?: string;

  // Oddiel I
  // 04 - Priezvisko
  r004?: string;
  // 05 - Meno
  r005?: string;
  // 07 - Ulica
  r007?: string;
  // 08 - Súpisné/orientačné číslo *
  r008?: string;
  // 09 - PSČ *
  r009?: string;
  // 10 - Obec *
  r010?: string;
  // 11 - Štát *
  r011?: string;

  // VI.Príjmy z tabuľky č. 1, stĺ. 1, r. 10
  t1r10_prijmy?: number; // TODO asi zrkadlenie do VI.Príjmy z tabuľky č. 1, stĺ. 1, r. 2

  // Preukázateľne zaplatené poistné na sociálne poistenie z príjmov
  priloha3_r11_socialne?: number;

  // Preukázateľne zaplatené poistné na zdravotné poistenie z príjmov
  priloha3_r13_zdravotne?: number;
}

export interface TaxForm extends TaxFormUserInput {
  // 01 - DIČ (ak nie je pridelené, uvádza sa rodné číslo)
  r001?: string;
  // 02 - Dátum narodenia
  // TODO Aky format?
  r002?: string;
  // 03 - SK NACE - Hlavná, prevažná činnosť
  // TODO tu treba odkial natahat cinnosti do dropdownu, mozno to bude enum, UX musi byt zvladnute
  r003?: string;

  // Oddiel I
  // 04 - Priezvisko
  r004?: string;
  // 05 - Meno
  r005?: string;
  // 07 - Ulica
  r007?: string;
  // 08 - Súpisné/orientačné číslo *
  r008?: string;
  // 09 - PSČ *
  r009?: string;
  // 10 - Obec *
  r010?: string;
  // 11 - Štát *
  r011?: string;

  // VI.Výdavky z tabuľky č. 1, stĺ. 2, r.10 + TODO ?pripocitat poistne? priloha3_r11 + priloha3_r13
  t1r10_vydavky?: number; // TODO asi zrkadlenie do VI.Príjmy z tabuľky č. 1, stĺ. 2, r. 2

  // The same as income above
  r041?: number;
  // Výdavky z tabuľky č. 1, stĺ. 2, r.10
  // The same as expense above
  r042?: number;

  // Základ dane (kladný rozdiel r. 41 a r. 42); výsledok hospodárenia (zisk)
  r043?: number;
  // Strata (záporný rozdiel r. 41 a r. 42); výsledok hospodárenia (strata)
  r044?: number;

  // Základ dane (čiastkový základ dane) z príjmov (r. 43 + r. 44 + r. 45 - r. 46) > 0
  r047?: number;

  // Znížený čiastkový základ dane z príjmov o stratu z predchádzajúcich zdaňovacích období maximálne do sumy v r. 47 (r. 47 - r. 54)
  // ASI zrkadlenie 047
  r055?: number;

  // Základ dane (čiastkový základ dane) z príjmov znížený o odpočet výdavkov (nákladov) na výskum a vývoj zaokrúhlený na eurocenty nadol (r. 55 - r. 56)
  // Zrkadlenie 55
  r057?: number;

  // Základ dane z príjmov pred znížením o nezdaniteľnú časť základu dane (r. 40 + r. 57)
  r072?: number;

  // Hardconuta value 3937.35 - nezdaniteľnú časť základu
  r073?: number;

  // Spolu (r. 73 + r. 74 + r.75 + r.76) maximálne do výšky základu dane v r. 72
  r077?: number;

  // Základ dane z príjmov  po znížení o nezdaniteľnú časť (r. 72 - r. 77)
  r078?: number;

  //Základ dane zistený (r. 78 + r. 65 + r. 71 + r. 79)
  r080_zaklad_dane?: number;
  // Daň zo základu dane zisteného uvedeného v riadku 80 zaokrúhlená na eurocenty nadol
  // r080 * 0.19 TODO double check tax %
  r081?: number;

  // Zrkadlenie r081
  r090?: number;

  // Daň (daňová povinnosť) zo základu dane z osobitného základu dane a z osobitného základu dane (r. 90 + r. 104 + r. 28 Prílohy č. 2)
  // Zrkadlenie r081
  r105_dan?: number;

  // Daň (daňová povinnosť) znížená o daňový bonus (r. 105 - r. 106)
  // Zrkadlenie r081
  r107?: number;

  //Daň (daňová povinnosť) znížená o daňový bonus a o daňový bonus na zaplatené úroky(r. 107 - r. 112)
  // zrkadli r107
  r113?: number;

  // Daň na úhradu vrátane zamestnávateľom nesprávne vyplateného daňového bonusu podľa § 33 zákona33)
  // r. 105 - r. 106 + r. 108 + r. 110 - r. 112 + r. 114 + r. 116 + r. 117 - r. 118 - r. 119 - r. 120 - r. 121 - r. 122 - r. 123 - r. 124 (+)
  r125_dan_na_uhradu?: number;
}
