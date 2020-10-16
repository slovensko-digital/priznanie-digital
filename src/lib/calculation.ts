import { ChildInput, TaxFormUserInput } from '../types/TaxFormUserInput'
import { Child, TaxForm } from '../types/TaxForm'
import {
  getRodneCisloAgeAtYearAndMonth,
  floorDecimal,
  parseInputNumber,
} from './utils'
import Decimal from 'decimal.js'
import { sum, ceilDecimal } from './utils'
import { validatePartnerIncome } from './validatePartnerIncome'

const NEZDANITELNA_CAST_ZAKLADU = new Decimal(3937.35)
const PAUSALNE_VYDAVKY_MAX = 20000
const DAN_Z_PRIJMU_SADZBA = new Decimal(0.19)
const MIN_PRIJEM_NA_DANOVY_BONUS_NA_DIETA = 3120

const makeMapChild = (hasChildren: boolean) => (child: ChildInput): Child => {
  const monthFrom = parseInt(child.monthFrom, 10)
  const monthTo = parseInt(child.monthTo, 10)

  return {
    priezviskoMeno: child.priezviskoMeno,
    rodneCislo: child.rodneCislo.replace(/\D/g, ''),
    kupelnaStarostlivost: child.kupelnaStarostlivost,
    m00: hasChildren && child.wholeYear,
    m01: hasChildren && !child.wholeYear && monthFrom === 0,
    m02: hasChildren && !child.wholeYear && monthFrom <= 1 && monthTo >= 1,
    m03: hasChildren && !child.wholeYear && monthFrom <= 2 && monthTo >= 2,
    m04: hasChildren && !child.wholeYear && monthFrom <= 3 && monthTo >= 3,
    m05: hasChildren && !child.wholeYear && monthFrom <= 4 && monthTo >= 4,
    m06: hasChildren && !child.wholeYear && monthFrom <= 5 && monthTo >= 5,
    m07: hasChildren && !child.wholeYear && monthFrom <= 6 && monthTo >= 6,
    m08: hasChildren && !child.wholeYear && monthFrom <= 7 && monthTo >= 7,
    m09: hasChildren && !child.wholeYear && monthFrom <= 8 && monthTo >= 8,
    m10: hasChildren && !child.wholeYear && monthFrom <= 9 && monthTo >= 9,
    m11: hasChildren && !child.wholeYear && monthFrom <= 10 && monthTo >= 10,
    m12: hasChildren && !child.wholeYear && monthTo === 11,
  }
}

export function calculate(input: TaxFormUserInput): TaxForm {
  const [titul, titulZa] = input.r006_titul
    ? input.r006_titul.split(' / ')
    : ['', '']

  /** Combine default vaules with user input */
  const tf: TaxForm = {
    /** SECTION Osobne udaje */
    r001_dic: input.r001_dic,
    r003_nace: input.r003_nace,
    r004_priezvisko: input.r004_priezvisko,
    r005_meno: input.r005_meno,
    r006_titul: titul,
    r006_titul_za: titulZa,
    r007_ulica: input.r007_ulica,
    r008_cislo: input.r008_cislo,
    r009_psc: `${input.r009_psc}`.replace(/\D/g, ''),
    r010_obec: input.r010_obec,
    r011_stat: input.r011_stat,

    /** SECTION Dochodok */
    platil_prispevky_na_dochodok: input?.platil_prispevky_na_dochodok ?? false,
    r075_zaplatene_prispevky_na_dochodok: Decimal.min(
      180,
      new Decimal(
        parseInputNumber(input?.r075_zaplatene_prispevky_na_dochodok ?? '0'),
      ),
    ),

    /** SECTION Partner */
    r031_priezvisko_a_meno: input?.r031_priezvisko_a_meno ?? '',
    r031_rodne_cislo: input?.r031_rodne_cislo
      ? input?.r031_rodne_cislo.replace(/\D/g, '')
      : '',
    get r032_uplatnujem_na_partnera() {
      return input?.r032_uplatnujem_na_partnera && validatePartnerIncome(input)
    },
    r032_partner_vlastne_prijmy: new Decimal(
      parseInputNumber(input?.r032_partner_vlastne_prijmy ?? '0'),
    ),
    r032_partner_pocet_mesiacov: parseInputNumber(
      input?.r032_partner_pocet_mesiacov ?? '0',
    ),
    r033_partner_kupele: input?.r033_partner_kupele ?? false,
    r033_partner_kupele_uhrady: new Decimal(
      parseInputNumber(input?.r033_partner_kupele_uhrady ?? '0'),
    ),

    /** SECTION Children */
    r034: input.children.map(makeMapChild(input?.hasChildren)),
    get r036_deti_kupele() {
      const maxAmountPerChild = 50
      const maxAmountChildrenTotal = new Decimal(this.r034?.length ?? 0).times(
        maxAmountPerChild,
      )

      return Decimal.min(
        new Decimal(parseInputNumber(input?.r036_deti_kupele ?? '0')),
        maxAmountChildrenTotal,
      )
    },

    /** SECTION Mortgage */
    r037_uplatnuje_uroky: input?.r037_uplatnuje_uroky ?? false,
    r037_zaplatene_uroky: new Decimal(
      parseInputNumber(input?.r037_zaplatene_uroky ?? '0'),
    ),
    r037_pocetMesiacov: parseInputNumber(input?.r037_pocetMesiacov ?? '0'),

    priloha3_r11_socialne: new Decimal(
      parseInputNumber(input.priloha3_r11_socialne),
    ),
    priloha3_r13_zdravotne: new Decimal(
      parseInputNumber(input.priloha3_r13_zdravotne),
    ),
    r038: new Decimal(parseInputNumber(input?.r038 ?? '0')),
    r039: new Decimal(parseInputNumber(input?.r039 ?? '0')),

    /** SECTION Prijmy */
    t1r10_prijmy: new Decimal(parseInputNumber(input.t1r10_prijmy)),
    get t1r2_prijmy() {
      return this.t1r10_prijmy
    },
    get t1r10_vydavky() {
      const vydavky = Decimal.min(
        this.t1r10_prijmy.times(0.6),
        PAUSALNE_VYDAVKY_MAX,
      ).add(this.vydavkyPoistPar6ods11_ods1a2)
      return Decimal.min(vydavky, this.t1r2_prijmy)
    },
    get vydavkyPoistPar6ods11_ods1a2() {
      return this.priloha3_r11_socialne.plus(this.priloha3_r13_zdravotne)
    },
    get priloha3_r08_poistne() {
      return new Decimal(parseInputNumber(input.r039))
    },
    get r040() {
      return this.r038.minus(this.r039)
    },
    get r041() {
      return this.t1r10_prijmy
    },
    get r042() {
      return this.t1r10_vydavky
    },
    get r043() {
      return Decimal.abs(this.r041.minus(this.r042))
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
      return sum(this.r057, this.r040)
    },
    get r073() {
      if (
        this.r072_pred_znizenim.eq(0) ||
        this.r072_pred_znizenim.gte(36256.37)
      ) {
        return new Decimal(0)
      }
      if (this.r072_pred_znizenim.gt(20507)) {
        return ceilDecimal(
          Decimal.max(
            0,
            new Decimal(9064.094).minus(this.r072_pred_znizenim.times(0.25)),
          ),
        )
      }
      return NEZDANITELNA_CAST_ZAKLADU
    },
    get r074_znizenie_partner() {
      if (this.r032_uplatnujem_na_partnera) {
        return this.r072_pred_znizenim.gt(36256.38)
          ? Decimal.max(
              0,
              new Decimal(13001.438)
                .minus(
                  this.r072_pred_znizenim
                    .times(0.25)
                    .minus(Decimal.max(this.r032_partner_vlastne_prijmy, 0)),
                )
                .times(new Decimal(1).div(12))
                .times(this.r032_partner_pocet_mesiacov),
            )
          : Decimal.max(
              0,
              new Decimal(3937.35)
                .minus(Decimal.max(this.r032_partner_vlastne_prijmy, 0))
                .times(new Decimal(1).div(12))
                .times(this.r032_partner_pocet_mesiacov),
            )
      }
      return new Decimal(0)
    },
    get r076_kupele_spolu() {
      return this.r076b_kupele_partner_a_deti.plus(this.r076a_kupele_danovnik)
    },
    get r076a_kupele_danovnik() {
      return new Decimal(parseInputNumber(input?.r076a_kupele_danovnik ?? '0'))
    },
    get r076b_kupele_partner_a_deti() {
      return this.r033_partner_kupele_uhrady.plus(this.r036_deti_kupele)
    },
    get r077_nezdanitelna_cast() {
      return Decimal.min(
        this.r073
          .plus(this.r074_znizenie_partner)
          .plus(this.r075_zaplatene_prispevky_na_dochodok)
          .plus(this.r076_kupele_spolu),
        this.r072_pred_znizenim,
      )
    },
    get r078_zaklad_dane_z_prijmov() {
      return floorDecimal(
        Decimal.max(
          this.r072_pred_znizenim.minus(this.r077_nezdanitelna_cast),
          0,
        ),
      )
    },
    get r080_zaklad_dane_celkovo() {
      return this.r078_zaklad_dane_z_prijmov // + tf.r065 + tf.r071 + tf.r079
    },
    get r081() {
      if (this.r080_zaklad_dane_celkovo.isZero()) {
        return new Decimal(0)
      }
      if (this.r080_zaklad_dane_celkovo.gte(36256.38)) {
        return floorDecimal(
          new Decimal(36256.38)
            .times(DAN_Z_PRIJMU_SADZBA)
            .plus(
              floorDecimal(this.r080_zaklad_dane_celkovo)
                .minus(36256.38)
                .times(0.25),
            ),
        )
      }

      return floorDecimal(
        tf.r080_zaklad_dane_celkovo.times(DAN_Z_PRIJMU_SADZBA),
      )
    },
    get r090() {
      return this.r081
    },

    get r105_dan() {
      return this.r090
    },
    get r106() {
      return this.r034.reduce((previousSum, currentChild) => {
        let currentSum = new Decimal(0)
        const rateJanuaryToMarch = new Decimal(22.17)
        const rateYoungChild = new Decimal(44.34)
        const rateOldChild = new Decimal(22.17)

        const getRateAprilToDecember = (month: number) => {
          const age = getRodneCisloAgeAtYearAndMonth(
            currentChild.rodneCislo,
            2019,
            month - 1,
          )
          return age < 6 ? rateYoungChild : rateOldChild
        }

        if (currentChild.m00 || currentChild.m01) {
          currentSum = currentSum.plus(rateJanuaryToMarch)
        }
        if (currentChild.m00 || currentChild.m02) {
          currentSum = currentSum.plus(rateJanuaryToMarch)
        }
        if (currentChild.m00 || currentChild.m03) {
          currentSum = currentSum.plus(rateJanuaryToMarch)
        }
        if (currentChild.m00 || currentChild.m04) {
          currentSum = currentSum.plus(getRateAprilToDecember(4))
        }
        if (currentChild.m00 || currentChild.m05) {
          currentSum = currentSum.plus(getRateAprilToDecember(5))
        }
        if (currentChild.m00 || currentChild.m06) {
          currentSum = currentSum.plus(getRateAprilToDecember(6))
        }
        if (currentChild.m00 || currentChild.m07) {
          currentSum = currentSum.plus(getRateAprilToDecember(7))
        }
        if (currentChild.m00 || currentChild.m08) {
          currentSum = currentSum.plus(getRateAprilToDecember(8))
        }
        if (currentChild.m00 || currentChild.m09) {
          currentSum = currentSum.plus(getRateAprilToDecember(9))
        }
        if (currentChild.m00 || currentChild.m10) {
          currentSum = currentSum.plus(getRateAprilToDecember(10))
        }
        if (currentChild.m00 || currentChild.m11) {
          currentSum = currentSum.plus(getRateAprilToDecember(11))
        }
        if (currentChild.m00 || currentChild.m12) {
          currentSum = currentSum.plus(getRateAprilToDecember(12))
        }

        return previousSum.plus(currentSum)
      }, new Decimal(0))
    },
    get r107() {
      return Decimal.max(this.r105_dan.minus(this.r106), 0)
    },
    get r108() {
      return new Decimal(parseInputNumber(input?.r108 ?? '0'))
    },
    get r109() {
      return Decimal.max(new Decimal(this.r106).minus(this.r108), 0)
    },
    get r110() {
      return Decimal.max(this.r109.minus(this.r105_dan), 0)
    },
    get mozeZiadatVyplatitDanovyBonus() {
      return this.r110.gt(0)
    },
    get mozeZiadatVratitDanovyPreplatok() {
      return this.r126_danovy_preplatok.gt(0)
    },
    /** TODO High income test case */
    get r112() {
      return Decimal.min(this.r037_zaplatene_uroky.times(0.5), 400)
    },
    get r113() {
      return this.r107.minus(this.r112)
    },
    /** TODO */
    get r114() {
      return new Decimal(0)
    },
    get r115() {
      return Decimal.max(this.r112.minus(this.r114), 0)
    },
    get r120() {
      return new Decimal(parseInputNumber(input?.r120 ?? '0'))
    },
    get r122() {
      return new Decimal(parseInputNumber(input?.r122 ?? '0'))
    },
    get r125_dan_na_uhradu() {
      const baseTax =
        this.r105_dan.gt(17) || this.r106.gt(0) || this.r112.gt(0)
          ? this.r105_dan
          : new Decimal(0)
      const tax = Decimal.max(
        0,
        baseTax
          .minus(this.r106)
          .plus(this.r108)
          .plus(this.r110)
          .minus(this.r112)
          .plus(this.r114)
          .minus(this.r120)
          .minus(this.r122),
      )
      return tax.gt(5) ? tax : new Decimal(0)
      // 'r. 125': má byť výsledkom Max(0,r.105-r.106+r.108+r.110-r.112+r.114+r.116+r.117-r.118-r.119-r.120-r.121-r.122-r.123-r.124) ak platí, r.105>17.00 alebo r.105<=17.00 a zároveň je r.106>0 alebo r.112>0.
      // Inak r.125=max(0,0–r.106+r.108+r.110-r.112+r.114+r.116+r.117-r.118-r.119-r.120-r.121-r.122-r.123-r.124).
      // Ak daň na úhradu nepresiahne 5€, daň sa neplatí, v r.125 sa uvedie nula.

      // vo vypocte chyba: +r.116+r.117-r.118-r.119-r.121-r.123-r.124 (asi ich netreba lebo sa nevyplnaju vo formulari, tj su rovne nula)
    },
    get r126_danovy_preplatok() {
      return Decimal.abs(
        Decimal.min(
          0,
          new Decimal(this.r105_dan)
            .minus(this.r106)
            .plus(this.r108)
            .plus(this.r110)
            .minus(this.r120)
            .minus(this.r122),
        ),
      )
    },
    splnam3per: input?.splnam3per ?? false,
    get r141() {
      if (!input.XIIoddiel_uplatnujem2percenta) {
        return new Decimal(0)
      }

      const rate = this.splnam3per ? 3 : 2
      const NGOAmount = floorDecimal(this.r113.div(100).times(rate))

      /** Min of 3 EUR is required */
      return NGOAmount.gte(3) ? NGOAmount : new Decimal(0)
    },
    get r142() {
      if (!input.XIIoddiel_uplatnujem2percenta) {
        return undefined
      }
      return {
        ico: input.r142_ico.replace(/\D/g, ''),
        pravnaForma: input.r142_pravnaForma,
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

    /** SECTION Danovy bonus */
    ziadamVyplatitDanovyBonus: input?.ziadamVyplatitDanovyBonus ?? false,
    ziadamVratitDanovyPreplatok: input?.ziadamVratitDanovyPreplatok ?? false,
    iban: input?.iban ? input?.iban.replace(/\s/g, '') : '',

    get eligibleForChildrenBonus() {
      return (
        this.t1r10_prijmy.gte(MIN_PRIJEM_NA_DANOVY_BONUS_NA_DIETA) ||
        this.r038.gte(MIN_PRIJEM_NA_DANOVY_BONUS_NA_DIETA)
      )
    },

    datum: input.datum,
  }

  return tf
}
