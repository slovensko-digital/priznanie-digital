import { ChildInput, TaxFormUserInput } from '../types/TaxFormUserInput'
import { Child, TaxForm } from '../types/TaxForm'
import {
  getRodneCisloAgeAtYearAndMonth,
  parseInputNumber,
  percentage,
  round,
} from './utils'
import Decimal from 'decimal.js'
import { validatePartnerBonusForm } from './validatePartnerBonusForm'
import { Summary } from '../types/Summary'
import { optionWithValue } from '../components/FormComponents'
import { ChildrenUserInput } from '../types/PageUserInputs'
import { validateUrokyBonusForm } from './validateUrokyBonusForm'

const NEZDANITELNA_CAST_ZAKLADU = new Decimal(4922.82)
// NEZDANITELNA_CAST_JE_NULA_AK_JE_ZAKLAD_DANE_VYSSI_AKO
const KONSTANTA = 41_445.46
const PAUSALNE_VYDAVKY_MAX = 20_000

const DAN_Z_PRIJMU_ZNIZENA_SADZBA_LIMIT = new Decimal(49_790)
const DAN_Z_PRIJMU_SADZBA_ZNIZENA = new Decimal(0.15)
const DAN_Z_PRIJMU_SADZBA = new Decimal(0.19)
const DAN_Z_PRIJMU_SADZBA_ZVYSENA = new Decimal(0.25)
const MINIMALNA_DAN_NA_ZAPLATENIE = new Decimal(5)

export const MIN_PRIJEM_NA_DANOVY_BONUS_NA_DIETA = 3876
const MAX_ZAKLAD_DANE = 21_754.18
export const PARTNER_MAX_ODPOCET = 4500.86

export const CHILD_RATE_EIGHTEEN_AND_YOUNGER = 140
export const CHILD_RATE_EIGHTEEN_AND_OLDER = 50

const ZIVOTNE_MINIMUM_NASOBOK = 10_361.36

export const OSLOBODENIE_PRENAJOM_A_PRILZ_CINNOSTI = 500

export const SPODNA_SADZBA_PRE_PREDDAVKY = new Decimal(5000)
export const VRCHNA_SADZBA_PRE_PREDDAVKY = new Decimal(16600)

const POCET_KVARTALOV = 4
const POCET_MESIACOV = 12

// 63,4-násobok platného životného minima
const ZVYHODNENIE_NA_PARTNERA = new Decimal(14862.23)
export const TAX_YEAR = 2023
export const MIN_2_PERCENT_CALCULATED_DONATION = 3
export const MAX_CHILD_AGE_BONUS = 25
export const UROKY_POCET_ROKOV = 5
export const DANOVY_BONYS_NA_ZAPLATENE_UROKY = 400

export enum Months {
  January = 1,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

const makeMapChild =
  (hasChildren: boolean) =>
    (child: ChildInput): Child => {
      const monthFrom = Number.parseInt(child.monthFrom, 10)
      const monthTo = Number.parseInt(child.monthTo, 10)

      return {
        priezviskoMeno: child.priezviskoMeno,
        rodneCislo: child.rodneCislo.replace(/\D/g, ''),
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

const mapPartnerChildBonus = (input: ChildrenUserInput) => {
  const wholeYear = input.partner_bonus_na_deti_od === '0' && input.partner_bonus_na_deti_do === '11'
  const monthFrom = Number.parseInt(input.partner_bonus_na_deti_od, 10)
  const monthTo = Number.parseInt(input.partner_bonus_na_deti_do, 10)

  return {
    priezviskoMeno: input.r034_priezvisko_a_meno,
    rodneCislo: input.r034_rodne_cislo ? input.r034_rodne_cislo.replace(/\D/g, '') : '',
    m00: wholeYear,
    m01: !wholeYear && monthFrom === 0,
    m02: !wholeYear && monthFrom <= 1 && monthTo >= 1,
    m03: !wholeYear && monthFrom <= 2 && monthTo >= 2,
    m04: !wholeYear && monthFrom <= 3 && monthTo >= 3,
    m05: !wholeYear && monthFrom <= 4 && monthTo >= 4,
    m06: !wholeYear && monthFrom <= 5 && monthTo >= 5,
    m07: !wholeYear && monthFrom <= 6 && monthTo >= 6,
    m08: !wholeYear && monthFrom <= 7 && monthTo >= 7,
    m09: !wholeYear && monthFrom <= 8 && monthTo >= 8,
    m10: !wholeYear && monthFrom <= 9 && monthTo >= 9,
    m11: !wholeYear && monthFrom <= 10 && monthTo >= 10,
    m12: !wholeYear && monthTo === 11,
    druhaOsobaPodalaDPvSR: input.partner_bonus_na_deti_typ_prijmu === '1' || input.partner_bonus_na_deti_typ_prijmu === '2',
    dokladRocZuct: input.partner_bonus_na_deti_typ_prijmu === '3',
    dokladVyskaDane: input.partner_bonus_na_deti_typ_prijmu === '4',
    pocetMesiacov: monthTo - monthFrom + 1
  }
}

export const zaciatok_urocenia_datum = (input: TaxFormUserInput) => {
  const den = Number.parseInt(input.uroky_zaciatok_urocenia_den, 10)
  const mesiac = Number.parseInt(input.uroky_zaciatok_urocenia_mesiac, 10)
  const rok = Number.parseInt(input.uroky_zaciatok_urocenia_rok, 10)
  return new Date(rok, mesiac - 1, den)
}

export function calculate(input: TaxFormUserInput): TaxForm {
  /** Combine default vaules with user input */
  return {
    /** SECTION Osobne udaje */
    r001_dic: input.r001_dic,
    r003_nace: input.r003_nace,
    r004_priezvisko: input.r004_priezvisko,
    r005_meno: input.r005_meno,
    r006_titul: input.r006_titul,
    r006_titul_za: input.r006_titul_za,
    r007_ulica: input.r007_ulica,
    r008_cislo: input.r008_cislo,
    r009_psc: `${input.r009_psc}`.replace(/\D/g, ''),
    r010_obec: input.r010_obec,
    r011_stat: input.r011_stat,

    /** SECTION Prijmy */
    get t1r2_prijmy() {
      // TODO fix input name
      return round(new Decimal(parseInputNumber(input.t1r10_prijmy)))
    },
    get t1r10_prijmy() {
      return round(this.t1r2_prijmy)
    },
    get t1r10_vydavky() {
      const vydavky = Decimal.min(
        this.t1r10_prijmy.times(0.6),
        PAUSALNE_VYDAVKY_MAX,
      ).add(this.vydavkyPoistPar6ods11_ods1a2)
      return round(Decimal.min(vydavky, this.t1r2_prijmy))
    },

    priloha3_r11_socialne: round(new Decimal(
      parseInputNumber(input.priloha3_r11_socialne),
    )),
    priloha3_r13_zdravotne: round(new Decimal(
      parseInputNumber(input.priloha3_r13_zdravotne),
    )),

    /** SECTION Dochodok */
    platil_prispevky_na_dochodok: input?.platil_prispevky_na_dochodok ?? false,
    r075_zaplatene_prispevky_na_dochodok: round(Decimal.min(
      180,
      new Decimal(
        parseInputNumber(input?.zaplatene_prispevky_na_dochodok ?? '0'),
      ),
    )),

    /** SECTION Partner */
    r031_priezvisko_a_meno: input?.r031_priezvisko_a_meno ?? '',
    r031_rodne_cislo: input?.r031_rodne_cislo
      ? input?.r031_rodne_cislo.replace(/\D/g, '')
      : '',
    get r032_uplatnujem_na_partnera() {
      return (
        input?.r032_uplatnujem_na_partnera && validatePartnerBonusForm(input)
      )
    },
    r032_partner_vlastne_prijmy: round(new Decimal(
      parseInputNumber(input?.r032_partner_vlastne_prijmy ?? '0'),
    )),
    r032_partner_pocet_mesiacov: parseInputNumber(
      input?.r032_partner_pocet_mesiacov ?? '0',
    ),

    /** SECTION Children */
    get r033() {
      const mapChild = makeMapChild(input?.hasChildren)
      return input.children.map((child) => mapChild(child))
    },

    get r033a() {
      return this.r033.length > 4
    },

    get partner_bonus_na_deti() {
      return input.partner_bonus_na_deti
    },

    get r034() {
      return mapPartnerChildBonus(input)
    },

    r034a: round(new Decimal(parseInputNumber(input?.r034a ?? '0'))),

    /** SECTION Mortgage **/
    get r035_uplat_dan_bonus_zaplat_uroky() {
      return (
        input?.r035_uplatnuje_uroky && validateUrokyBonusForm(input)
      )
    },
    get r035_zaplatene_uroky() {
      return round(new Decimal(parseInputNumber(input?.r035_zaplatene_uroky ?? '0')))
    },
    get r035_pocet_mesiacov(){
      const yearDiff = TAX_YEAR - Number.parseInt(input.uroky_zaciatok_urocenia_rok, 10)
      if (yearDiff === 0) {
        // Uver zacal v roku za ktory sa podava DP
        return POCET_MESIACOV - Number.parseInt(input.uroky_zaciatok_urocenia_mesiac, 10) + 1
      } else if (yearDiff === UROKY_POCET_ROKOV) {
        // Narok na DB je 5 rokov od zaciatku urokov a teda toto je posledny rok
        return Number.parseInt(input.uroky_zaciatok_urocenia_mesiac, 10) - 1
      } else if (yearDiff < UROKY_POCET_ROKOV && yearDiff > 0) {
        return POCET_MESIACOV
      }
    },
    get r035_datum_zacatia_urocenia_uveru() {
      return zaciatok_urocenia_datum(input)
    },

    /** SECTION Rent */
    rent: input?.rent ?? false,
    get prenajom_oslobodenie() {
      const prilezitostnaCinnost = input?.prenajomPrijemZPrilezitostnejCinnosti ?? false
      if (this.rent) {
        if (prilezitostnaCinnost) {
          return new Decimal(parseInputNumber(input?.vyskaOslobodenia ?? '0'))
        } else {
          return new Decimal(OSLOBODENIE_PRENAJOM_A_PRILZ_CINNOSTI)
        }
      } else {
        return new Decimal(0)
      }
    },
    get t1r11s1() {
      const prijmy = new Decimal(parseInputNumber(input?.vyskaPrijmovZPrenajmu ?? '0'))
      return round(Decimal.max(prijmy.minus(this.prenajom_oslobodenie), 0))
    },
    get t1r11s2() {
      const prijmy = new Decimal(parseInputNumber(input?.vyskaPrijmovZPrenajmu ?? '0'))
      const vydavky = new Decimal(parseInputNumber(input?.vydavkyZPrenajmu ?? '0'))
      let result = new Decimal(0)
      if (this.prenajom_oslobodenie.isZero()) {
        result = vydavky
      } else {
        result = (this.t1r11s1.div(prijmy)).mul(vydavky)
      }
      return round(Decimal.max(Decimal.min(this.t1r11s1, result), 0))
    },
    get t1r13s1() {
      return this.t1r11s1
    },
    get t1r13s2() {
      return this.t1r11s2
    },

    /** SECTION Employment */
    r036: round(new Decimal(
      parseInputNumber(input?.uhrnPrijmovOdVsetkychZamestnavatelov ?? '0'),
    )),
    r037: round(new Decimal(
      parseInputNumber(input?.uhrnPovinnehoPoistnehoNaSocialnePoistenie ?? '0'),
    ).plus(
      new Decimal(
        parseInputNumber(
          input?.uhrnPovinnehoPoistnehoNaZdravotnePoistenie ?? '0',
        ),
      ),
    )),

    get vydavkyPoistPar6ods11_ods1a2() {
      return round(this.priloha3_r11_socialne.plus(this.priloha3_r13_zdravotne))
    },
    get priloha3_r08_poistne_spolu() {
      return round(this.r037)
    },
    get priloha3_r09_socialne() {
      return round(new Decimal(
        parseInputNumber(input.uhrnPovinnehoPoistnehoNaSocialnePoistenie),
      ))
    },
    get priloha3_r10_zdravotne() {
      return round(new Decimal(
        parseInputNumber(input.uhrnPovinnehoPoistnehoNaZdravotnePoistenie),
      ))
    },
    get r038() {
      return round(Decimal.max(this.r036.minus(this.r037), 0))
    },
    get r039() {
      return round(this.t1r10_prijmy)
    },
    get r040() {
      return round(this.t1r10_vydavky)
    },
    get r041() {
      return round(Decimal.abs(this.r039.minus(this.r040)))
    },
    get r045() {
      return round(this.r041)
    },
    get r055() {
      return round(this.r045)
    },
    get r057() {
      return round(this.r055)
    },
    get r058() {
      return round(this.t1r13s1)
    },
    get r059() {
      return round(this.t1r13s2)
    },
    get r060() {
      return round(Decimal.max(this.r058.minus(this.r059), 0))
    },
    get r065() {
      return round(this.r060)
    },
    get r072_pred_znizenim() {
      return round(Decimal.max(this.r038.plus(this.r057), 0))
    },
    get r073() {
      if (this.r072_pred_znizenim.isZero()) {
        return new Decimal(0)
      } else if (this.r072_pred_znizenim.gt(MAX_ZAKLAD_DANE)) {
        return round(Decimal.max(0, new Decimal(ZIVOTNE_MINIMUM_NASOBOK).minus(round(this.r072_pred_znizenim.div(4)))))
      } else {
        return NEZDANITELNA_CAST_ZAKLADU
      }
    },
    get r074_znizenie_partner() {
      if (this.r032_uplatnujem_na_partnera && this.r072_pred_znizenim.gt(0)) {
        if (this.r072_pred_znizenim.gt(KONSTANTA)) {
          const zaklad = ZVYHODNENIE_NA_PARTNERA.minus(
            round(this.r072_pred_znizenim.times(0.25))
          )
          const zakladZinzenyOPartnerovPrijem = zaklad.minus(
            Decimal.max(this.r032_partner_vlastne_prijmy, 0),
          )
          if (this.r032_partner_pocet_mesiacov === 12) {
            return round(Decimal.max(0, round(zakladZinzenyOPartnerovPrijem)))
          } else {
            const mesacne = round(zakladZinzenyOPartnerovPrijem.div(12))
            return round(Decimal.max(0, round(mesacne.times(this.r032_partner_pocet_mesiacov))))
          }
        } else {
          if (this.r032_partner_pocet_mesiacov === 12) {
            return round(
              new Decimal(PARTNER_MAX_ODPOCET).minus(
                Decimal.max(this.r032_partner_vlastne_prijmy, 0),
              ),
            )
          } else {
            const mesacne = round(
              new Decimal(PARTNER_MAX_ODPOCET)
                .minus(Decimal.max(this.r032_partner_vlastne_prijmy, 0))
                .div(12),
            )
            return round(Decimal.max(
              0,
              round(mesacne.times(this.r032_partner_pocet_mesiacov)),
            ))
          }
        }
      }
      return new Decimal(0)
    },
    get r077_nezdanitelna_cast() {
      return round(Decimal.min(
        this.r073
          .plus(this.r074_znizenie_partner)
          .plus(this.r075_zaplatene_prispevky_na_dochodok),
        this.r072_pred_znizenim,
      ))
    },
    get r078_zaklad_dane_zo_zamestnania() {
      return round(
        Decimal.max(this.r038.minus(this.r077_nezdanitelna_cast), 0)
      )
    },
    get r080_zaklad_dane_celkovo() {
      return round(this.r078_zaklad_dane_zo_zamestnania.plus(this.r065))
    },
    get r081() {
      if (this.r080_zaklad_dane_celkovo.isZero()) {
        return new Decimal(0)
      }

      if (this.r080_zaklad_dane_celkovo.lte(KONSTANTA)) {
        return round(this.r080_zaklad_dane_celkovo.times(DAN_Z_PRIJMU_SADZBA))
      }
      const danZPrvejCasti = round(new Decimal(KONSTANTA).times(DAN_Z_PRIJMU_SADZBA))
      const toCoPrevysuje = this.r080_zaklad_dane_celkovo.minus(KONSTANTA)
      return round(danZPrvejCasti.plus(
        round(toCoPrevysuje.times(DAN_Z_PRIJMU_SADZBA_ZVYSENA)),
      ))
    },
    get r090() {
      return round(this.r081)
    },
    get r091() {
      if (this.r078_zaklad_dane_zo_zamestnania.eq(0)) {
        return round(
          Decimal.max(this.r077_nezdanitelna_cast.minus(this.r038), 0),
        )
      }
      return new Decimal(0)
    },
    get r092() {
      return round(Decimal.max(this.r057.minus(this.r091), 0))
    },
    get r094() {
      return round(this.r092)
    },
    get r095() {
      return round(this.t1r10_prijmy)
    },
    get r096() {
      if (this.r094.lessThan(0)) {
        return new Decimal(0)
      }

      if (this.r095.lte(DAN_Z_PRIJMU_ZNIZENA_SADZBA_LIMIT)) {
        return round(this.r094.times(DAN_Z_PRIJMU_SADZBA_ZNIZENA))
      }

      if (this.r095.greaterThan(DAN_Z_PRIJMU_ZNIZENA_SADZBA_LIMIT)) {
        if (this.r094.lessThanOrEqualTo(KONSTANTA)) {
          return round(this.r094.times(DAN_Z_PRIJMU_SADZBA))
        }
        if (this.r094.greaterThan(KONSTANTA)) {
          const a = round(new Decimal(KONSTANTA).times(DAN_Z_PRIJMU_SADZBA))
          const b = this.r094.minus(KONSTANTA)
          const c = round(b.times(DAN_Z_PRIJMU_SADZBA_ZVYSENA))
          return round(a.plus(c))
        }
      }

      if (this.r094.lte(KONSTANTA)) {
        return round(this.r094.times(DAN_Z_PRIJMU_SADZBA))
      } else {
        return round(new Decimal(KONSTANTA)
          .times(DAN_Z_PRIJMU_SADZBA)
          .plus(this.r094.minus(KONSTANTA).times(DAN_Z_PRIJMU_SADZBA_ZVYSENA)))
      }
    },
    get r105() {
      return round(this.r096)
    },
    get r116_dan() {
      return round(this.r090.plus(this.r105))
    },
    get r116a() {
      if (this.partner_bonus_na_deti) {
        const podmienka = this.r038.greaterThan(0) || this.r045.greaterThan(0)
        if (this.r034.pocetMesiacov === 12 && podmienka) {
          return round(this.r034a.plus(this.r038).plus(this.r045))
        } else if ((this.r034.pocetMesiacov > 0 && this.r034.pocetMesiacov < 12) && podmienka) {
          const partner = round(round(this.r034a.dividedBy(12)).times(this.r034.pocetMesiacov))
          return round(this.r038.plus(this.r045).plus(partner))
        } else {
          return new Decimal(0)
        }
      } else {
        return new Decimal(0)
      }
    },
    get danovyBonusNaDieta() {
      const months = [
        Months.January,
        Months.February,
        Months.March,
        Months.April,
        Months.May,
        Months.June,
        Months.July,
        Months.August,
        Months.September,
        Months.October,
        Months.November,
        Months.December,
      ].map((month) => ({
        count: getPocetDetivMesiaci(this.r033, month),
        month: month
      }))

      const childCountGroups = months
        .map(({ count }) => count)
        .filter((x, i, a) => a.indexOf(x) == i) // remove duplicates
        .sort((a, b) => a - b) // sort ascending

      const monthGroups = Array.from({ length: childCountGroups.length }, () => [])

      for (const month of months) {
        const index = childCountGroups.indexOf(month.count)
        monthGroups[index].push(month)
      }

      let danovyBonus = new Decimal(0)
      let nevyuzityDanovyBonus = new Decimal(0)

      for (const monthGroup of monthGroups) {
        const pocetMesiacovVSkupine = monthGroup.length
        let partialSum = new Decimal(0);
        for (const month of monthGroup) {
          for (const child of this.r033) {
            const rate = getRate(month.month, child)
            partialSum = partialSum.plus(rate)
          }
        }

        let zakladDane
        if (this.partner_bonus_na_deti) {
          zakladDane = this.r116a
        } else {
          zakladDane = this.r038.plus(this.r045)
        }

        zakladDane = round(zakladDane)
        const percentLimit = getPercentualnyLimitNaDeti(monthGroup[0].count)
        let limit = round(zakladDane.times(percentLimit))

        if (pocetMesiacovVSkupine !== 12) {
          const pom = round(limit.div(12))
          limit = round(pom.times(pocetMesiacovVSkupine))
        }

        let vysledok = new Decimal(0)
        if (partialSum.greaterThan(limit)) {
          vysledok = limit
          nevyuzityDanovyBonus = nevyuzityDanovyBonus.plus(partialSum.minus(limit))
        } else {
          vysledok = partialSum
        }

        danovyBonus = danovyBonus.plus(vysledok)
      }

      return { danovyBonus, nevyuzityDanovyBonus }
    },
    get preddavkyNaDan() {
      const r055_dan = round(this.r055.mul(DAN_Z_PRIJMU_SADZBA))

      if (r055_dan.greaterThan(SPODNA_SADZBA_PRE_PREDDAVKY)) {
        return {
          suma: r055_dan.div(POCET_KVARTALOV),
          periodicita: 'kvartálne'
        }
      } else if (r055_dan.greaterThan(VRCHNA_SADZBA_PRE_PREDDAVKY)) {
        return {
          suma: r055_dan.div(POCET_MESIACOV),
          periodicita: 'mesačne'
        }
      } else {
        return {
          suma: new Decimal(0),
          periodicita: 'neplatí'
        }
      }
    },
    get r117() {
      return round(Decimal.max(this.danovyBonusNaDieta.danovyBonus, 0))
    },
    get r118() {
      return round(Decimal.max(this.r116_dan.minus(this.r117), 0))
    },
    get r119() {
      return round(new Decimal(
        parseInputNumber(input?.udajeODanovomBonuseNaDieta ?? '0'),
      ))
    },
    get r120() {
      return round(Decimal.max(new Decimal(this.r117).minus(this.r119), 0))
    },
    get r121() {
      return round(Decimal.max(this.r120.minus(this.r116_dan), 0))
    },
    get r122() {
      return round(Decimal.max(this.r119.minus(this.r117), 0))
    },
    get r123() {
      if (this.r035_uplat_dan_bonus_zaplat_uroky) {
        if (this.r035_pocet_mesiacov === 12) {
          return round(Decimal.min(this.r035_zaplatene_uroky.times(0.5), new Decimal(DANOVY_BONYS_NA_ZAPLATENE_UROKY)))
        } else if (this.r035_datum_zacatia_urocenia_uveru.getFullYear() === TAX_YEAR - UROKY_POCET_ROKOV) {
          const a = this.r035_zaplatene_uroky.times(0.5)
          const b = round(a).div(12)
          const c = round(b).times(this.r035_pocet_mesiacov)
          const d = round(new Decimal(DANOVY_BONYS_NA_ZAPLATENE_UROKY).div(12)).times(this.r035_pocet_mesiacov)
          return round(Decimal.min(c,d))
        } else if (this.r035_datum_zacatia_urocenia_uveru.getFullYear() === TAX_YEAR) {
          const limit = round(new Decimal(DANOVY_BONYS_NA_ZAPLATENE_UROKY).div(12)).times(this.r035_pocet_mesiacov)
          return round(Decimal.min(this.r035_zaplatene_uroky.times(0.5), limit))
        }
      }
      return new Decimal(0)
    },
    get r124() {
      return round(Decimal.max(this.r118.minus(this.r123), 0))
    },
    r125: new Decimal(0),
    get r126() {
      return round(Decimal.max(this.r123.minus(this.r125), 0))
    },
    get mozeZiadatVyplatitDanovyBonus() {
      return this.r121.gt(0)
    },
    get mozeZiadatVratitDanovyPreplatok() {
      return this.r136_danovy_preplatok.gt(0)
    },
    get mozeZiadatVratitDanovyBonusUroky() {
      return this.r127.gt(0)
    },
    get r127() {
      return round(Decimal.max(this.r126.minus(this.r118), 0))
    },
    r128: new Decimal(0),
    r129: new Decimal(0),
    r130: new Decimal(0),
    get r131() {
      return round(new Decimal(parseInputNumber(input?.uhrnPreddavkovNaDan ?? '0')))
    },
    get r132() {
      return new Decimal(0)
    },
    get r133() {
      return round(new Decimal(parseInputNumber(input?.zaplatenePreddavky ?? '0')))
    },
    get r134() {
      return new Decimal(0)
    },
    get r135_dan_na_uhradu() {
      /*
      Ak (r.116>17,00) alebo (r.116<=17,00 a zároveň je r.117>0 alebo r.123>0), potom
      r.135=Max(0,r. 116 - r. 117 + r. 119 + r. 121 - r. 123 + r. 125 + r. 127 + r. 128 - r. 129 - r. 130 - r. 131 - r. 132 - r. 133 - r. 134).
      Inak r.135=Max(0,0 - r. 117 + r. 119 + r. 121 - r. 123 + r. 125 + r. 127 + r. 128 - r. 129 - r. 130 - r. 131 - r. 132 - r. 133 - r. 134).
      Ak daň na úhradu nepresiahne 5 €, daň sa neplatí.
      */

      const podmienka = this.r116_dan.gt(17) || (this.r116_dan.lte(17) && (this.r117.gt(0) || this.r123.gt(0)))
      const base = podmienka ? this.r116_dan : new Decimal(0)
      let tax = base
                .minus(this.r117)
                .plus(this.r119)
                .plus(this.r121)
                .minus(this.r123)
                .plus(this.r125)
                .plus(this.r127)
                .plus(this.r128)
                .minus(this.r129)
                .minus(this.r130)
                .minus(this.r131)
                .minus(this.r132)
                .minus(this.r133)
                .minus(this.r134)
      tax = Decimal.max(0, tax)

      return tax.gt(MINIMALNA_DAN_NA_ZAPLATENIE) ? round(tax) : new Decimal(0)
    },
    get r136_danovy_preplatok() {
      const podmienka = this.r116_dan.gt(17) || (this.r116_dan.lte(17) && (this.r117.gt(0) || this.r123.gt(0)))
      const base = podmienka ? this.r116_dan : new Decimal(0)
      let tax = base
                .minus(this.r117)
                .plus(this.r119)
                .plus(this.r121)
                .minus(this.r123)
                .plus(this.r125)
                .plus(this.r127)
                .plus(this.r128)
                .minus(this.r129)
                .minus(this.r130)
                .minus(this.r131)
                .minus(this.r132)
                .minus(this.r133)
                .minus(this.r134)
      return Decimal.min(0, round(tax)).negated()
    },
    splnam3per: input?.splnam3per ?? false,
    get suma_2_percenta() {
      return round(percentage(this.r124, 2))
    },
    get suma_3_percenta() {
      return round(percentage(this.r124, 3))
    },
    get r151() {
      if (!input.XIIoddiel_uplatnujem2percenta) {
        return new Decimal(0)
      }

      const NGOAmount = this.splnam3per ? this.suma_3_percenta : this.suma_2_percenta

      /** Min of 3 EUR is required */
      return NGOAmount.gte(MIN_2_PERCENT_CALCULATED_DONATION)
        ? round(NGOAmount)
        : new Decimal(0)
    },
    get r152() {
      if (!input.XIIoddiel_uplatnujem2percenta) {
        return undefined
      }
      return {
        ico: input.r142_ico.replace(/\D/g, ''),
        obchMeno: input.r142_obchMeno,
        suhlasZaslUdaje: input.XIIoddiel_suhlasZaslUdaje,
      }
    },
    children: input?.hasChildren ?? false,
    employed: input?.employed ?? false,

    get XIIoddiel_uplatnujem2percenta() {
      return this.canDonateTwoPercentOfTax
        ? input?.XIIoddiel_uplatnujem2percenta ?? false
        : false
    },

    /** SECTION Danovy bonus */
    ziadamVyplatitDanovyBonus: input?.ziadamVyplatitDanovyBonus ?? false,
    ziadamVratitDanovyPreplatok: input?.ziadamVratitDanovyPreplatok ?? false,
    ziadamVratitDanovyBonusUroky: input?.ziadamVratitDanovyBonusUroky ?? false,
    iban: input?.iban ? input?.iban.replace(/\s/g, '') : '',

    datum: input.datum,

    get socZdravPoistenieDatum() {
      const priloha3Prazdna = [
        this.priloha3_r08_poistne_spolu,
        this.priloha3_r09_socialne,
        this.priloha3_r10_zdravotne,
        this.priloha3_r11_socialne,
        this.priloha3_r13_zdravotne
      ].every((x) => x.eq(0))
      return priloha3Prazdna ? '' : this.datum
    },

    get canDonateTwoPercentOfTax() {
      return percentage(this.r124, 3).gte(
        MIN_2_PERCENT_CALCULATED_DONATION,
      )
    },
  }
}

export const buildSummary = (form: TaxForm): Summary => {
  return {
    // zivnost a zamestnanie
    prijmy: form.r036.plus(form.r039),
    pausalneVydavky: (form.r040.minus(form.vydavkyPoistPar6ods11_ods1a2)).negated(),
    zaplatenePoistneSpolu: (form.r037.plus(form.vydavkyPoistPar6ods11_ods1a2)).negated(),
    nezdanitelnaCastNaSeba: form.r073.negated(),
    nezdanitelnaCastNaPartnera: form.r074_znizenie_partner.negated(),
    prispevkyNaDochodkovePoistenie: form.r075_zaplatene_prispevky_na_dochodok.negated(),
    zakladDane: form.r078_zaklad_dane_zo_zamestnania.plus(form.r092),
    // prenajom
    prijemNehnutelnost: form.t1r11s1,
    vydavkyNehnutelnost: form.t1r11s2.negated(),
    zakladDanZPrenajmu: form.r065,
    // dan na uhradu alebo preplatok
    danSpolu: form.r116_dan,
    preddavkyNaDan: (form.r131.plus(form.r132).plus(form.r133).plus(form.r134)).negated(),
    danovyBonusNaDeti: form.r117.negated(),
    danovyBonusNaUroky: form.r123.negated(),
    danovyBonusPreplatokNaVyplatenie: form.r136_danovy_preplatok.plus(form.r121).plus(form.r127),
    danNaUhradu: form.r135_dan_na_uhradu,
  }
}

const getRate = (month: Months, child: Child) => {
  const age = getRodneCisloAgeAtYearAndMonth(
    child.rodneCislo,
    TAX_YEAR,
    month - 1,
  )

  const rate = age < 18
    ? new Decimal(CHILD_RATE_EIGHTEEN_AND_YOUNGER)
    : new Decimal(CHILD_RATE_EIGHTEEN_AND_OLDER)

  if (
    month === Months.January &&
    (child.m01 || child.m00)
  ) {
    return rate
  }
  if (
    month === Months.February &&
    (child.m02 || child.m00)
  ) {
    return rate
  }
  if (
    month === Months.March &&
    (child.m03 || child.m00)
  ) {
    return rate
  }
  if (
    month === Months.April &&
    (child.m04 || child.m00)
  ) {
    return rate
  }
  if (
    month === Months.May &&
    (child.m05 || child.m00)
  ) {
    return rate
  }
  if (
    month === Months.June &&
    (child.m06 || child.m00)
  ) {
    return rate
  }
  if (
    month === Months.July &&
    (child.m07 || child.m00)
  ) {
    return rate
  }
  if (
    month === Months.August &&
    (child.m08 || child.m00)
  ) {
    return rate
  }
  if (
    month === Months.September &&
    (child.m09 || child.m00)
  ) {
    return rate
  }
  if (
    month === Months.October &&
    (child.m10 || child.m00)
  ) {
    return rate
  }
  if (
    month === Months.November &&
    (child.m11 || child.m00)
  ) {
    return rate
  }
  if (
    month === Months.December &&
    (child.m12 || child.m00)
  ) {
    return rate
  }

  return new Decimal(0)
}

const getPocetDetivMesiaci = (deti: TaxForm['r033'], month: Months): number => {
  return deti.reduce((acc, dieta) => {
    if (dieta.m00) {
      acc += 1
    } else {
      if (month === Months.January && dieta.m01) {
        acc += 1
      }
      if (month === Months.February && dieta.m02) {
        acc += 1
      }
      if (month === Months.March && dieta.m03) {
        acc += 1
      }
      if (month === Months.April && dieta.m04) {
        acc += 1
      }
      if (month === Months.May && dieta.m05) {
        acc += 1
      }
      if (month === Months.June && dieta.m06) {
        acc += 1
      }
      if (month === Months.July && dieta.m07) {
        acc += 1
      }
      if (month === Months.August && dieta.m08) {
        acc += 1
      }
      if (month === Months.September && dieta.m09) {
        acc += 1
      }
      if (month === Months.October && dieta.m10) {
        acc += 1
      }
      if (month === Months.November && dieta.m11) {
        acc += 1
      }
      if (month === Months.December && dieta.m12) {
        acc += 1
      }
    }
    return acc
  }, 0)
}

const getPercentualnyLimitNaDeti = (pocetDeti: number): Decimal => {
  switch (pocetDeti) {
    case 1: {
      return new Decimal(0.2)
    }
    case 2: {
      return new Decimal(0.27)
    }
    case 3: {
      return new Decimal(0.34)
    }
    case 4: {
      return new Decimal(0.41)
    }
    case 5: {
      return new Decimal(0.48)
    }
    default:
      return pocetDeti >= 6 ? new Decimal(0.55) : new Decimal(0)
  }
}

export const monthToKeyValue = (month: string) => {
  if (month == 'Január') {
    return {
      name: month,
      value: 0
    }
  }
  if (month == 'Február') {
    return {
      name: month,
      value: 1
    }
  }
  if (month == 'Marec') {
    return {
      name: month,
      value: 2
    }
  }
  if (month == 'Apríl') {
    return {
      name: month,
      value: 3
    }
  }
  if (month == 'Máj') {
    return {
      name: month,
      value: 4
    }
  }
  if (month == 'Jún') {
    return {
      name: month,
      value: 5
    }
  }
  if (month == 'Júl') {
    return {
      name: month,
      value: 6
    }
  }
  if (month == 'August') {
    return {
      name: month,
      value: 7
    }
  }
  if (month == 'September') {
    return {
      name: month,
      value: 8
    }
  }

  if (month == 'Október') {
    return {
      name: month,
      value: 9
    }
  }

  if (month == 'November') {
    return {
      name: month,
      value: 10
    }
  }

  if (month == 'December') {
    return {
      name: month,
      value: 11
    }
  }
}

export const monthNumberToName = (month: number) => {
  if (month == 0) {
    return 'Január'
  }
  if (month == 1) {
    return 'Február'
  }
  if (month == 2) {
    return 'Marec'
  }
  if (month == 3) {
    return 'Apríl'
  }
  if (month == 4) {
    return 'Máj'
  }
  if (month == 5) {
    return 'Jún'
  }
  if (month == 6) {
    return 'Júl'
  }
  if (month == 7) {
    return 'August'
  }
  if (month == 8) {
    return 'September'
  }
  if (month == 9) {
    return 'Október'
  }
  if (month == 10) {
    return 'November'
  }
  if (month == 11) {
    return 'December'
  }
}

export const typPrijmuToName = (typPrijmu: string) => {
  if (typPrijmu === "1" ) {
    return "DPFO typ A"
  }
  if (typPrijmu === "2" ) {
    return "DPFO typ B"
  }
  if (typPrijmu === "3" ) {
    return "Ročné zúčtovanie"
  }
  if (typPrijmu === "4" ) {
    return "Iné"
  }
}

export const monthKeyValues = (months: string[]): optionWithValue[] => {
  return months.map(monthToKeyValue)
}

export const donateOnly3Percent = (form: TaxForm): boolean => {
  return form.canDonateTwoPercentOfTax && (form.suma_2_percenta.toNumber() < MIN_2_PERCENT_CALCULATED_DONATION)
}
