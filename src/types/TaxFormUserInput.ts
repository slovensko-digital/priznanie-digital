export const monthNames: string[] = [
  'Január',
  'Február',
  'Marec',
  'Apríl',
  'Máj',
  'Jún',
  'Júl',
  'August',
  'September',
  'Október',
  'November',
  'December',
]

export interface ChildInput {
  id: number
  priezviskoMeno: string
  rodneCislo: string
  wholeYear: boolean
  monthFrom: string
  monthTo: string
}

export interface TaxFormUserInput {
  /**   01 - DIČ (ak nie je pridelené| uvádza sa rodné číslo)*/
  r001_dic: string
  /** 03 - SK NACE - Hlavná, prevažná činnosť*/
  r003_nace: string
  /** Cele meno a priezvisko*/
  meno_priezvisko?: string
  /** 04 - Priezvisko **/
  r004_priezvisko: string
  /** 05 - Meno **/
  r005_meno: string
  /** 06 - Titul pred menom*/
  r006_titul?: string
  /** 06 - Titul za menom*/
  r006_titul_za?: string
  /**   07 - Ulica*/
  r007_ulica: string
  /**   08 - Súpisné/orientačné číslo **/
  r008_cislo: string
  /**   09 - PSČ **/
  r009_psc: string
  /**   10 - Obec **/
  r010_obec: string
  /**   11 - Štát **/
  r011_stat: string

  /** SECTION Dochodok */
  /** 75 - ods. 10 - na preukázateľne zaplatené príspevky na doplnkové dôchodkové sporenie maximálne vo výške 180 eur */
  platil_prispevky_na_dochodok?: boolean
  zaplatene_prispevky_na_dochodok?: string

  /** SECTION  Partner*/
  r031_priezvisko_a_meno?: string
  r031_rodne_cislo?: string
  r032_uplatnujem_na_partnera?: boolean
  r032_partner_vlastne_prijmy?: string
  r032_partner_pocet_mesiacov?: string
  partner_step?: number
  partner_spolocna_domacnost?: boolean
  partner_podmienky?: Record<string, string[]>

  /** SECTION  Mortage */
  r035_uplatnuje_uroky?: boolean
  r035_zaplatene_uroky?: string
  hypoteka_step?: number
  uroky_zmluva_den_uzatvorenia?: string
  uroky_zmluva_mesiac_uzatvorenia?: string
  uroky_zmluva_rok_uzatvorenia?: string
  uroky_zaciatok_urocenia_den?: string
  uroky_zaciatok_urocenia_mesiac?: string
  uroky_zaciatok_urocenia_rok?: string
  uroky_dalsi_dlznik?: boolean
  uroky_pocet_dlznikov?: string
  uroky_dalsi_uver_uplatnuje?: boolean
  uroky_splnam_vek_kriteria?: boolean
  uroky_splnam_prijem?: boolean

  /** SECTION Prijmy a poistenie  */
  // TODO: rename t1r10_prijmy to t1r2_prijmy
  t1r10_prijmy: string
  priloha3_r11_socialne: string
  priloha3_r13_zdravotne: string
  zaplatenePreddavky?: string

  /**  SECTION Zamestnanie */
  employed?: boolean
  uhrnPrijmovOdVsetkychZamestnavatelov?: string
  uhrnPovinnehoPoistnehoNaSocialnePoistenie?: string
  uhrnPovinnehoPoistnehoNaZdravotnePoistenie?: string
  uhrnPreddavkovNaDan?: string
  udajeODanovomBonuseNaDieta?: string

  /**  SECTION Dohoda */
  dohoda?: boolean
  uhrnPrijmovZoVsetkychDohod?: string
  uhrnPovinnehoPoistnehoNaSocialnePoistenieDohody?: string
  uhrnPovinnehoPoistnehoNaZdravotnePoistenieDohody?: string
  uhrnPreddavkovNaDanDohody?: string
  udajeODanovomBonuseNaDietaDohody?: string

  /** SECTION Prenajom */
  rent?: boolean
  vyskaPrijmovZPrenajmu?: string
  prenajomPrijemZPrilezitostnejCinnosti?: boolean
  vyskaOslobodenia?: string
  vydavkyZPrenajmu?: string
  rent_step?: number

  /** SECTION  Deti*/
  hasChildren?: boolean
  partner_bonus_na_deti_chce_uplatnit?: boolean
  partner_bonus_na_deti?: boolean
  r034_priezvisko_a_meno?: string
  r034_rodne_cislo?: string
  r034a?: string
  partner_bonus_na_deti_typ_prijmu?: '1' | '2' | '3' | '4' | '0'
  partner_bonus_na_deti_od?: string
  partner_bonus_na_deti_do?: string
  children: ChildInput[]

  /** SECTION  Dve percenta */
  dve_percenta_podporujem?: 'ano-sk-digital' | 'ano-inu' | 'nie'
  XIIoddiel_uplatnujem2percenta?: boolean
  splnam3per?: boolean
  r142_ico?: string
  r142_obchMeno?: string
  XIIoddiel_suhlasZaslUdaje?: boolean

  /** SECTION Danovy bonus */
  ziadamVyplatitDanovyBonus?: boolean
  ziadamVratitDanovyPreplatok?: boolean
  ziadamVratitDanovyBonusUroky?: boolean
  ziadamVyplatitDanovyBonusUrokPreplatok?: boolean
  iban?: string

  /** Musi byt sucastou user inputu, aj ked sa generuje automaticky, inac by
   * failovali testy */
  datum: string

  /**
   * Value based on a cookie
   */
  isDebug?: boolean
}
