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
  kupelnaStarostlivost: boolean
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
  /** 06 - Titul (pred menom / za priezviskom)*/
  r006_titul?: string
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
  r075_zaplatene_prispevky_na_dochodok?: string

  /** SECTION  Partner*/
  r031_priezvisko_a_meno?: string
  r031_rodne_cislo?: string
  r032_uplatnujem_na_partnera?: boolean
  r032_partner_vlastne_prijmy?: string
  r032_partner_pocet_mesiacov?: string
  partner_step?: number
  partner_spolocna_domacnost?: boolean
  partner_bonus_uplatneny?: boolean
  partner_podmienky?: Record<string, boolean>

  /** SECTION  Mortage */
  r037_uplatnuje_uroky?: boolean
  r037_zaplatene_uroky?: string
  r037_pocetMesiacov?: string

  /** SECTION Prijmy a poistenie  */
  /**   VIs.Príjmy z tabuľky č. 1, stĺ. 1, r. 10 TODO asi zrkadlenie do VI.Príjmy z tabuľky č. 1, stĺ. 1, r. 2*/
  t1r10_prijmy: string
  /**   Preukázateľne zaplatené poistné na sociálne poistenie z príjmov*/
  priloha3_r11_socialne: string
  /**   Preukázateľne zaplatené poistné na zdravotné poistenie z príjmov*/
  priloha3_r13_zdravotne: string
  /** Zaplatené preddavky */
  r122?: string

  /**  SECTION Zamestnanie */
  employed?: boolean
  uhrnPrijmovOdVsetkychZamestnavatelov?: string
  uhrnPovinnehoPoistnehoNaSocialnePoistenie?: string
  uhrnPovinnehoPoistnehoNaZdravotnePoistenie?: string
  r108?: string
  r120?: string

  /** SECTION  Deti*/
  hasChildren?: boolean
  children: ChildInput[]

  /** SECTION  Dve percenta */
  XIIoddiel_uplatnujem2percenta?: boolean
  splnam3per?: boolean
  r142_ico?: string
  r142_pravnaForma?: string
  r142_obchMeno?: string
  r142_ulica?: string
  r142_cislo?: string
  r142_psc?: string
  r142_obec?: string
  XIIoddiel_suhlasZaslUdaje?: boolean

  /** SECTION Danovy bonus */
  ziadamVyplatitDanovyBonus?: boolean
  ziadamVratitDanovyPreplatok?: boolean
  iban?: string

  /** Musi byt sucastou user inputu, aj ked sa generuje automaticky, inac by
   * failovali testy */
  datum: string
}
