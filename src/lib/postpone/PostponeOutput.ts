export interface PostponeOutput {
  dokument: Dokument;
}
interface Dokument {
  hlavicka: Hlavicka;
}

interface FyzickaOsoba {
  priezvisko: string;
  meno: string;
  rodneCislo: RodneCislo;
}

interface Hlavicka {
  dic: string;
  zaRok: string;
  dovodDoplnenia: string;
  fyzickaOsoba: FyzickaOsoba;
  // pravnickaOsoba: PravnickaOsoba;
  sidlo: Sidlo;
  // adresaSr: any;
  novaLehota: NovaLehota;
  vypracoval: Vypracoval;
  podpis: string;
}

interface NovaLehota {
  predlzenie493a: string;
  predlzenie493b: string;
  datumLehota: string;
}

// interface PravnickaOsoba {
//   obchodneMeno: any;
// }

interface RodneCislo {
  rcPredLom: string;
  rcZaLom: string;
}

interface Sidlo {
  psc: string;
  obec: string;
  stat: string;
}

interface Vypracoval {
  dna: string;
}
