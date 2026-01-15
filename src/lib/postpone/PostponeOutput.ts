export interface PostponeOutput {
  dokument: Dokument
}
interface Dokument {
  hlavicka: Hlavicka
}

interface FyzickaOsoba {
  priezvisko: string
  meno: string
  titulPred: string
  titulZa: string
  rodneCislo: RodneCislo
  datumNarodenia: string
}

interface Hlavicka {
  dic: string
  zaRok: string
  datumOd: string
  datumDo: string
  dovodDoplnenia: string
  datumPovodne: string
  fyzickaOsoba: FyzickaOsoba
  pravnickaOsoba: PravnickaOsoba
  sidlo: Sidlo
  adresaSr: AdresaSr
  novaLehota: NovaLehota
  vypracoval: Vypracoval
  podpis: string
}

interface NovaLehota {
  predlzenie493a: string
  predlzenie493b: string
  datumLehota: string
}

interface RodneCislo {
  rcPredLom: string;
  rcZaLom: string;
}

interface Sidlo {
  ulica: string
  supisneOrientacneCislo: string
  psc: string
  obec: string
  stat: string
}

interface Vypracoval {
  vypr: string
  dna: string
  telefon: string
}

interface PravnickaOsoba {
  obchodneMeno: ObchodneMeno
  ico: string
}

interface ObchodneMeno {
  riadok: string
}

interface AdresaSr {
  ulica: string
  supisneOrientacneCislo: string
  psc: string
  obec: string
}
