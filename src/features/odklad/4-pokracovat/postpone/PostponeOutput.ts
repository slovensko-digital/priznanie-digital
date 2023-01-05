export interface PostponeOutput {
  dokument: Dokument
}
interface Dokument {
  hlavicka: Hlavicka
}

interface FyzickaOsoba {
  priezvisko: string
  meno: string
  // rodneCislo: RodneCislo;
}

interface Hlavicka {
  dic: string
  zaRok: string
  dovodDoplnenia: string
  fyzickaOsoba: FyzickaOsoba
  sidlo: Sidlo
  novaLehota: NovaLehota
  vypracoval: Vypracoval
  podpis: string
}

interface NovaLehota {
  predlzenie493a: string
  predlzenie493b: string
  datumLehota: string
}

// interface RodneCislo {
//   rcPredLom: string;
//   rcZaLom: string;
// }

interface Sidlo {
  psc: string
  ulica: string
  obec: string
  supisneOrientacneCislo: string
  stat: string
}

interface Vypracoval {
  dna: string
}
