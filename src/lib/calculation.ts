import floor from 'lodash.floor'
import { rodnecislo } from 'rodnecislo'
import { ChildInput, TaxFormUserInput } from '../types/TaxFormUserInput'
import { Child, TaxForm } from '../types/TaxForm'

const NEZDANITELNA_CAST_ZAKLADU = 3937.35
const PAUSALNE_VYDAVKY_MAX = 20000
const DAN_Z_PRIJMU_SADZBA = 0.19

export function parse(input: string) {
  const cleanedInput = !input || input === '' ? '0' : input.replace(',', '.')
  return Number(cleanedInput)
}

const round2decimal = (x: number) => Math.round(x * 100) / 100

const mapChild = (child: ChildInput): Child => {
  const monthFrom = parseInt(child.monthFrom, 10)
  const monthTo = parseInt(child.monthTo, 10)

  return {
    priezviskoMeno: child.priezviskoMeno,
    rodneCislo: child.rodneCislo.replace(/\D/g, ''),
    kupelnaStarostlivost: child.kupelnaStarostlivost,
    m00: child.wholeYear,
    m01: !child.wholeYear && monthFrom === 0,
    m02: !child.wholeYear && monthFrom <= 1 && monthTo >= 1,
    m03: !child.wholeYear && monthFrom <= 2 && monthTo >= 2,
    m04: !child.wholeYear && monthFrom <= 3 && monthTo >= 3,
    m05: !child.wholeYear && monthFrom <= 4 && monthTo >= 4,
    m06: !child.wholeYear && monthFrom <= 5 && monthTo >= 5,
    m07: !child.wholeYear && monthFrom <= 6 && monthTo >= 6,
    m08: !child.wholeYear && monthFrom <= 7 && monthTo >= 7,
    m09: !child.wholeYear && monthFrom <= 8 && monthTo >= 8,
    m10: !child.wholeYear && monthFrom <= 9 && monthTo >= 9,
    m11: !child.wholeYear && monthFrom <= 10 && monthTo >= 10,
    m12: !child.wholeYear && monthTo === 11,
  }
}

export function calculate(input: TaxFormUserInput): TaxForm {
  const [firstName, ...lastNames] = input.meno_priezvisko
    .split(' ')
    .map((v) => v.trim())

  /** Combine default vaules with user input */
  const tf: TaxForm = {
    /** SECTION Osobne udaje */
    r001_dic: input.r001_dic,
    r003_nace: input.r003_nace,
    r004_priezvisko: lastNames.join(' '),
    r005_meno: firstName,
    r007_ulica: input.r007_ulica,
    r008_cislo: input.r008_cislo,
    r009_psc: `${input.r009_psc}`.replace(/\D/g, ''),
    r010_obec: input.r010_obec,
    r011_stat: input.r011_stat,

    /** SECTION Dochodok */
    platil_prispevky_na_dochodok: input?.platil_prispevky_na_dochodok ?? false,
    r075_zaplatene_prispevky_na_dochodok: Math.min(
      180,
      parse(input?.r075_zaplatene_prispevky_na_dochodok ?? '0'),
    ),

    /** SECTION Partner */
    r031_priezvisko_a_meno: input?.r031_priezvisko_a_meno ?? '',
    r031_rodne_cislo: input?.r031_rodne_cislo
      ? input?.r031_rodne_cislo.replace(/\D/g, '')
      : '',
    r032_uplatnujem_na_partnera: input?.r032_uplatnujem_na_partnera ?? false,
    r032_partner_vlastne_prijmy: parse(
      input?.r032_partner_vlastne_prijmy ?? '0',
    ),
    r032_partner_pocet_mesiacov: parse(
      input?.r032_partner_pocet_mesiacov ?? '0',
    ),
    r033_partner_kupele: input?.r033_partner_kupele ?? false,
    r033_partner_kupele_uhrady: parse(input?.r033_partner_kupele_uhrady ?? '0'),

    /** SECTION Children */
    r034: input.hasChildren ? input.children.map(mapChild) : [],
    get r036_deti_kupele() {
      const maxAmountPerChild = 50
      const maxAmountChildrenTotal =
        (this.r034?.length ?? 0) * maxAmountPerChild

      return round2decimal(
        Math.min(parse(input?.r036_deti_kupele ?? '0'), maxAmountChildrenTotal),
      )
    },

    /** SECTION Mortgage */
    r037_uplatnuje_uroky: input?.r037_uplatnuje_uroky ?? false,
    r037_zaplatene_uroky: parse(input?.r037_zaplatene_uroky ?? '0'),
    r037_pocetMesiacov: parse(input?.r037_pocetMesiacov ?? '0'),

    priloha3_r11_socialne: parse(input.priloha3_r11_socialne),
    priloha3_r13_zdravotne: parse(input.priloha3_r13_zdravotne),
    r038: parse(input?.r038 ?? '0'),
    r039: parse(input?.r039 ?? '0'),

    /** SECTION Prijmy */
    t1r10_prijmy: parse(input.t1r10_prijmy),
    get t1r2_prijmy() {
      return this.t1r10_prijmy
    },
    get t1r10_vydavky() {
      return round2decimal(
        Math.min(this.t1r10_prijmy * 0.6, PAUSALNE_VYDAVKY_MAX) +
          this.priloha3_r08_poistne,
      )
    },
    get priloha3_r08_poistne() {
      return round2decimal(
        this.priloha3_r11_socialne + this.priloha3_r13_zdravotne,
      )
    },
    get r040() {
      return round2decimal(this.r038 - this.r039)
    },
    get r041() {
      return this.t1r10_prijmy
    },
    get r042() {
      return this.t1r10_vydavky
    },
    get r043() {
      return round2decimal(Math.abs(this.r041 - this.r042))
    },
    get r047() {
      return this.r043 // this.r044 + this.r045 - this.r046);
    },
    get r055() {
      return this.r047
    },
    get r057() {
      return this.r055
    },
    get r072_pred_znizenim() {
      return this.r057 + this.r040
    },
    get r073() {
      const result =
        this.r072_pred_znizenim > 20507 // TODO test both cases here
          ? Math.max(0, 9064.094 - (1 / 4) * this.r072_pred_znizenim)
          : Math.max(0, NEZDANITELNA_CAST_ZAKLADU)

      return round2decimal(result)
    },
    get r074_znizenie_partner() {
      if (this.r032_uplatnujem_na_partnera) {
        const result =
          this.r072_pred_znizenim > 36256.38
            ? Math.max(
                0,
                (13001.438 -
                  (1 / 4) * this.r072_pred_znizenim -
                  Math.max(this.r032_partner_vlastne_prijmy, 0)) *
                  (1 / 12) *
                  this.r032_partner_pocet_mesiacov,
              )
            : Math.max(
                0,
                (3937.35 - Math.max(this.r032_partner_vlastne_prijmy, 0)) *
                  (1 / 12) *
                  this.r032_partner_pocet_mesiacov,
              )
        return round2decimal(result)
      }
      return 0
    },
    get r076_kupele_spolu() {
      return round2decimal(
        this.r076a_kupele_danovnik + this.r076b_kupele_partner_a_deti,
      )
    },
    get r076a_kupele_danovnik() {
      return round2decimal(parse(input?.r076a_kupele_danovnik ?? '0'))
    },
    get r076b_kupele_partner_a_deti() {
      return round2decimal(
        this.r033_partner_kupele_uhrady + this.r036_deti_kupele,
      )
    },
    get r077_nezdanitelna_cast() {
      return round2decimal(
        Math.min(
          this.r073 +
            this.r074_znizenie_partner +
            this.r075_zaplatene_prispevky_na_dochodok +
            this.r076_kupele_spolu,
          this.r072_pred_znizenim,
        ),
      )
    },
    get r078_zaklad_dane_z_prijmov() {
      const diff =
        Math.round(
          (this.r072_pred_znizenim - this.r077_nezdanitelna_cast) * 100,
        ) / 100
      return round2decimal(Math.max(diff, 0))
    },
    get r080_zaklad_dane_celkovo() {
      return round2decimal(floor(this.r078_zaklad_dane_z_prijmov, 2)) // TODO + tf.r065 + tf.r071 + tf.r079)
    },
    get r081() {
      return round2decimal(
        floor(tf.r080_zaklad_dane_celkovo * DAN_Z_PRIJMU_SADZBA, 2),
      ) // TODO high income
    },
    get r090() {
      return this.r081
    },

    get r105_dan() {
      return this.r090
    },
    get r106() {
      return round2decimal(
        this.r034.reduce((previousSum, currentChild) => {
          let currentSum = 0
          const rateJanuaryToMarch = 22.17
          const age = rodnecislo(currentChild.rodneCislo).age() // TODO edge cases
          const rateAprilToDecember = age > 6 ? 22.17 : 44.34

          if (currentChild.m00 || currentChild.m01) {
            currentSum += rateJanuaryToMarch
          }
          if (currentChild.m00 || currentChild.m02) {
            currentSum += rateJanuaryToMarch
          }
          if (currentChild.m00 || currentChild.m03) {
            currentSum += rateJanuaryToMarch
          }
          if (currentChild.m00 || currentChild.m04) {
            currentSum += rateAprilToDecember
          }
          if (currentChild.m00 || currentChild.m05) {
            currentSum += rateAprilToDecember
          }
          if (currentChild.m00 || currentChild.m06) {
            currentSum += rateAprilToDecember
          }
          if (currentChild.m00 || currentChild.m07) {
            currentSum += rateAprilToDecember
          }
          if (currentChild.m00 || currentChild.m08) {
            currentSum += rateAprilToDecember
          }
          if (currentChild.m00 || currentChild.m09) {
            currentSum += rateAprilToDecember
          }
          if (currentChild.m00 || currentChild.m10) {
            currentSum += rateAprilToDecember
          }
          if (currentChild.m00 || currentChild.m11) {
            currentSum += rateAprilToDecember
          }
          if (currentChild.m00 || currentChild.m12) {
            currentSum += rateAprilToDecember
          }

          return previousSum + currentSum
        }, 0),
      )
    },
    get r107() {
      return round2decimal(Math.max(this.r105_dan - this.r106, 0))
    },
    get r108() {
      return 0 // TODO
    },
    get r109() {
      return round2decimal(Math.max(this.r106 - this.r108, 0))
    },
    get r110() {
      return round2decimal(Math.max(this.r106 - this.r105_dan, 0))
    },
    /** TODO High income test case */
    get r112() {
      return round2decimal(Math.min(this.r037_zaplatene_uroky * 0.5, 400))
    },
    get r113() {
      return round2decimal(this.r107 - this.r112)
    },
    /** TODO */
    get r114() {
      return 0
    },
    get r115() {
      return round2decimal(Math.max(this.r112 - this.r114, 0))
    },
    get r125_dan_na_uhradu() {
      return round2decimal(
        Math.max(0, this.r105_dan + this.r114 - this.r112 - tf.r106),
        // // - tf.r106 +
        // tf.r108 +
        // tf.r110 -
        // // tf.r112 +
        // // tf.r114 +
        // tf.r116 +
        // tf.r117 -
        // tf.r118 -
        // tf.r119 -
        // tf.r120 -
        // tf.r121 -
        // tf.r122 -
        // tf.r123 -
        // tf.r124;
      )
    },
    get r126_danovy_preplatok() {
      return round2decimal(Math.abs(Math.min(this.r125_dan_na_uhradu, 0)))
    },
    get r141() {
      if (!input.XIIoddiel_uplatnujem2percenta) {
        return 0
      }

      // TODO do 3% as well
      const rate = 2
      const NGOamount = floor((this.r113 / 100) * rate, 2)

      /** Min of 3 EUR is required */
      return round2decimal(NGOamount >= 3 ? NGOamount : 0)
    },
    get r142() {
      if (!input.XIIoddiel_uplatnujem2percenta) {
        return undefined
      }
      return {
        ico: input.r142_ico.replace(/\D/g, ''),
        obchMeno: input.r142_obchMeno,
        ulica: input.r142_ulica,
        cislo: input.r142_cislo,
        psc: input.r142_psc.replace(/\D/g, ''),
        obec: input.r142_obec,
        suhlasZaslUdaje: input.XIIoddiel_suhlasZaslUdaje,
      }
    },
    children: input?.hasChildren ?? false,
    employed: input?.employed ?? false,
    XIIoddiel_uplatnujem2percenta:
      input?.XIIoddiel_uplatnujem2percenta ?? false,

    datum: input.datum,
  }

  return tf
}
