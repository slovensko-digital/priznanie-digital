// enum TaxFormRows {
//   // r010,
//   // r010,
//   // r031,
//   // r031,
//   // r032,
//   // r032,
//   // r032,
//   // r033,
//   // r033,
//   // r037,
//   // r037,
//   // r037,
//   r002,
//   r008,
//   r009,
//   r010,
//   r011,
//   r012,
//   r013,
//   r030,
//   r038,
//   r039,
//   r040,
//   r041,
//   r042,
//   r043,
//   r044,
//   r047,
//   r048,
//   r049,
//   r050,
//   r051,
//   r052,
//   r053,
//   r054,
//   r055,
//   r057,
//   r072,
//   r073,
//   r075,
//   r076,
//   r076a,
//   r076b,
//   r077,
//   r078,
//   r080,
//   r081,
//   r090,
//   r091,
//   r094,
//   r100,
//   r104,
//   r105,
//   r106,
//   r107,
//   r108,
//   r109,
//   r113,
//   r120,
//   r125,
//   r126,
//   r141,
//   r142
// }

interface TaxForm {
  r008: number;
  // Uhrn poistneho na socialne poistenie od vsetkych zamestnavatelov
  r009: number;
  // Aky celkovy prijem ste mali ako SZCO v roku 2018?
  r010_income: number; // ? slovencina alebo anglictina?
  r010_expense: number;

  // Rodne cislo
  r013: string;

  // Daňový preplatok
  r126: number;
  // Daň na úhradu
  r125: number;

  // TODO add comment to each row what it represents
  r105: number;
  r106: number;
  r108: number;
  r110: number;
  r112: number;
  r114: number;
  r116: number;
  r117: number;
  r118: number;
  r119: number;
  r120: number;
  r121: number;
  r122: number;
  r123: number;
  r124: number;

  r081: number;
}

