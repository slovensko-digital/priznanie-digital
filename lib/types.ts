interface TaxForm {
  // 01 - DIČ (ak nie je pridelené, uvádza sa rodné číslo)
  r001: string;
  // 02 - Dátum narodenia
  r002: string;
  // 03 - SK NACE - Hlavná, prevažná činnosť
  // TODO tu treba odkial natahat cinnosti do dropdownu, mozno to bude enum, UX musi byt zvladnute
  r003: string;

  // Oddiel I
  // 04 - Priezvisko
  r004: string;
  // 05 - Meno
  r005: string;
  // 06 - Titul (pred menom / za priezviskom)
  r006: string;
  // 07 - Ulica
  r007: string;
  // 08 - Súpisné/orientačné číslo *
  r008: string;
  // 09 - PSČ *
  r009: string;
  // 10 - Obec *
  r010: string;
  // 11 - Štát *
  r011: string;


  // Oddiel VI
  // VI.Príjmy z tabuľky č. 1, stĺ. 1, r. 10
  income: number; // TODO asi zrkadlenie do VI.Príjmy z tabuľky č. 1, stĺ. 1, r. 2
  // VI.Výdavky z tabuľky č. 1, stĺ. 2, r.10
  expense: number; // TODO asi zrkadlenie do VI.Príjmy z tabuľky č. 1, stĺ. 2, r. 2

  // Príjmy z tabuľky č. 1, stĺ. 1, r. 10
  // The same as income above
  r041: number;
  // Výdavky z tabuľky č. 1, stĺ. 2, r.10
  // The same as expense above
  r042: number;

  // Základ dane (kladný rozdiel r. 41 a r. 42); výsledok hospodárenia (zisk)
  r043: number;
  // Strata (záporný rozdiel r. 41 a r. 42); výsledok hospodárenia (strata)
  r044: number;

  // Základ dane (čiastkový základ dane) z príjmov podľa § 6 ods. 1 a 2 zákona (r. 43 + r. 44 + r. 45 - r. 46) > 0
  r047: number;


  // // Daňový preplatok
  // r126: number;
  // // Daň na úhradu
  // r125: number;

  // // TODO add comment to each row what it represents
  // r105: number;
  // r106: number;
  // r108: number;
  // r110: number;
  // r112: number;
  // r114: number;
  // r116: number;
  // r117: number;
  // r118: number;
  // r119: number;
  // r120: number;
  // r121: number;
  // r122: number;
  // r123: number;
  // r124: number;

  // r081: number;
}


const initialData = {

}