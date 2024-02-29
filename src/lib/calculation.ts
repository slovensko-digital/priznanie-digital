import { ChildInput, TaxFormUserInput } from '../types/TaxFormUserInput'
import { Child, TaxForm } from '../types/TaxForm'
import {
  getRodneCisloAgeAtYearAndMonth,
  parseInputNumber,
  percentage,
  sum,
  round,
} from './utils'
import Decimal from 'decimal.js'
import { validatePartnerBonusForm } from './validatePartnerBonusForm'
import { Summary } from '../types/Summary'
import { optionWithValue } from '../components/FormComponents'
import { ChildrenUserInput } from '../types/PageUserInputs'

const NEZDANITELNA_CAST_ZAKLADU = new Decimal(4922.82)
// NEZDANITELNA_CAST_JE_NULA_AK_JE_ZAKLAD_DANE_VYSSI_AKO
const KONSTANTA = 41_445.46
const PAUSALNE_VYDAVKY_MAX = 20_000

const DAN_Z_PRIJMU_ZNIZENA_SADZBA_LIMIT = new Decimal(49_790)
const DAN_Z_PRIJMU_SADZBA_ZNIZENA = new Decimal(0.15)
const DAN_Z_PRIJMU_SADZBA = new Decimal(0.19)
const DAN_Z_PRIJMU_SADZBA_ZVYSENA = new Decimal(0.25)

export const MIN_PRIJEM_NA_DANOVY_BONUS_NA_DIETA = 3876
const MAX_ZAKLAD_DANE = 21_754.18
export const PARTNER_MAX_ODPOCET = 4500.86

export const CHILD_RATE_EIGHTEEN_AND_YOUNGER = 140
export const CHILD_RATE_EIGHTEEN_AND_OLDER = 50

const ZIVOTNE_MINIMUM_NASOBOK = 10_361.36

export const OSLOBODENIE_PRENAJOM_A_PRILZ_CINNOSTI = 500

export const SPODNA_SADZBA_PRE_PREDDAVKY = 5000
export const VRCHNA_SADZBA_PRE_PREDDAVKY = 16600

const POCET_KVARTALOV = 4
const POCET_MESIACOV = 12

// 63,4-násobok platného životného minima
const ZVYHODNENIE_NA_PARTNERA = 14_862.228
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

    priloha3_r11_socialne: new Decimal(
      parseInputNumber(input.priloha3_r11_socialne),
    ),
    priloha3_r13_zdravotne: new Decimal(
      parseInputNumber(input.priloha3_r13_zdravotne),
    ),

    /** SECTION Dochodok */
    platil_prispevky_na_dochodok: input?.platil_prispevky_na_dochodok ?? false,
    r075_zaplatene_prispevky_na_dochodok: Decimal.min(
      180,
      new Decimal(
        parseInputNumber(input?.zaplatene_prispevky_na_dochodok ?? '0'),
      ),
    ),

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
    r032_partner_vlastne_prijmy: new Decimal(
      parseInputNumber(input?.r032_partner_vlastne_prijmy ?? '0'),
    ),
    r032_partner_pocet_mesiacov: parseInputNumber(
      input?.r032_partner_pocet_mesiacov ?? '0',
    ),

    /** SECTION Children */
    get r033() {
      const mapChild = makeMapChild(input?.hasChildren)
      return input.children.map((child) => mapChild(child))
    },

    get partner_bonus_na_deti() {
      return input.partner_bonus_na_deti
    },

    get r034() {
      return mapPartnerChildBonus(input)
    },

    r034a: new Decimal(parseInputNumber(input?.r034a ?? '0')),

    /** SECTION Mortgage **/
    r035_uplat_dan_bonus_zaplat_uroky: input?.r035_uplatnuje_uroky ?? false,
    get r035_zaplatene_uroky() {
      return new Decimal(parseInputNumber(input?.r035_zaplatene_uroky ?? '0'))
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
      if (prilezitostnaCinnost) {
        return new Decimal(parseInputNumber(input?.vyskaOslobodenia ?? '0'))
      } else {
        return new Decimal(OSLOBODENIE_PRENAJOM_A_PRILZ_CINNOSTI)
      }
    },
    get t1r11s1() {
      const prijmy = new Decimal(parseInputNumber(input?.vyskaPrijmovZPrenajmu ?? '0'))
      return prijmy.minus(this.prenajom_oslobodenie)
    },
    get t1r11s2() {
      const prijmy = new Decimal(parseInputNumber(input?.vyskaPrijmovZPrenajmu ?? '0'))
      const vydavky = new Decimal(parseInputNumber(input?.vydavkyZPrenajmu ?? '0'))
      if (this.prenajom_oslobodenie.isZero()) {
        return prijmy.minus(vydavky)
      } else {
        return ((prijmy.minus(this.prenajom_oslobodenie)).div(prijmy)).mul(vydavky)
      }
    },
    get t1r13s1() {
      return this.t1r11s1
    },
    get t1r13s2() {
      return this.t1r11s2
    },

    /** SECTION Employment */
    r036: new Decimal(
      parseInputNumber(input?.uhrnPrijmovOdVsetkychZamestnavatelov ?? '0'),
    ),
    r037: new Decimal(
      parseInputNumber(input?.uhrnPovinnehoPoistnehoNaSocialnePoistenie ?? '0'),
    ).plus(
      new Decimal(
        parseInputNumber(
          input?.uhrnPovinnehoPoistnehoNaZdravotnePoistenie ?? '0',
        ),
      ),
    ),

    get vydavkyPoistPar6ods11_ods1a2() {
      return this.priloha3_r11_socialne.plus(this.priloha3_r13_zdravotne)
    },
    get priloha3_r08_poistne_spolu() {
      return this.r037
    },
    get priloha3_r09_socialne() {
      return new Decimal(
        parseInputNumber(input.uhrnPovinnehoPoistnehoNaSocialnePoistenie),
      )
    },
    get priloha3_r10_zdravotne() {
      return new Decimal(
        parseInputNumber(input.uhrnPovinnehoPoistnehoNaZdravotnePoistenie),
      )
    },
    get r038() {
      return this.r036.minus(this.r037)
    },
    get r039() {
      return this.t1r10_prijmy
    },
    get r040() {
      return this.t1r10_vydavky
    },
    get r041() {
      return Decimal.abs(this.r039.minus(this.r040))
    },
    get r045() {
      return this.r041
    },
    get r055() {
      return this.r045
    },
    get r057() {
      return this.r055
    },
    get r058() {
      return this.t1r13s1
    },
    get r059() {
      return this.t1r13s2
    },
    get r060() {
      return this.r058.minus(this.r059)
    },
    get r065() {
      return this.r060
    },
    // v r. 72 spočítate, koľko je súčet základov dane zo zamestnania (§ 5) a koľko je základ
    // dane z podnikania (§ 6/1 a § 6/2), teda urobíte súčet riadkov 38 a 57
    get r072_pred_znizenim() {
      return sum(this.r057, this.r038)
    },
    // v r.73 až 76 uvediete, aké nezdaniteľné časti si uplatní daňovník - to sú tie údaje z úvodu, ktoré vypĺňa,
    // či mal kúpeľnú starostlivosť, či si platí DDP... v riadku 77 tieto nezdaniteľné časti na daňovníka spočítate,
    // to je podstatný údaj, akú nezdaniteľnú časť si daňovník môže odpočítať
    get r073() {
      if (
        this.r072_pred_znizenim.eq(0) ||
        this.r072_pred_znizenim.gte(KONSTANTA)
      ) {
        return new Decimal(0)
      }
      if (this.r072_pred_znizenim.gt(MAX_ZAKLAD_DANE)) {
        return round(
          Decimal.max(
            0,
            new Decimal(ZIVOTNE_MINIMUM_NASOBOK).minus(
              round(this.r072_pred_znizenim.times(0.25)),
            ),
          ),
        )
      }
      return NEZDANITELNA_CAST_ZAKLADU
    },
    get r074_znizenie_partner() {
      if (this.r032_uplatnujem_na_partnera) {
        if (this.r072_pred_znizenim.gt(KONSTANTA)) {
          const zaklad = new Decimal(ZVYHODNENIE_NA_PARTNERA).minus(
            this.r072_pred_znizenim.times(0.25),
          )
          const zakladZinzenyOPartnerovPrijem = zaklad.minus(
            Decimal.max(this.r032_partner_vlastne_prijmy, 0),
          )
          if (this.r032_partner_pocet_mesiacov === 12) {
            return Decimal.max(0, round(zakladZinzenyOPartnerovPrijem))
          } else {
            const mesacne = round(zakladZinzenyOPartnerovPrijem.div(12))
            return Decimal.max(0, mesacne.times(this.r032_partner_pocet_mesiacov))
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
            return Decimal.max(
              0,
              round(mesacne.times(this.r032_partner_pocet_mesiacov)),
            )
          }
        }
      }
      return new Decimal(0)
    },
    get r077_nezdanitelna_cast() {
      return Decimal.min(
        this.r073
          .plus(this.r074_znizenie_partner)
          .plus(this.r075_zaplatene_prispevky_na_dochodok),
        this.r072_pred_znizenim,
      )
    },
    // r. 78 - v tomto riadku idete vypočítať, aký bude mať daňovník základ dane po odpočítaní nezdaniteľnej časti -
    // ale len zo zamestnania!!! tu je veľký rozdiel oproti minulým rokom, kedy bolo jedno, či je to základ dane zo
    // zamestnania alebo podnikania, bralo sa to ako jedna hodnota. Od 2020 je to ale rozdiel. Treba pracovať samostatne
    // so základom dane zo zamestnania (r. 40) a samostatne so základom dane z podnikania (r. 57).
    //
    // v riadku 78 teda idete spočítať, aký má základ dane zo zamestnania potom, ako sa mu zohľadní
    // nezdaniteľná časť základu dane
    //
    // zoberiete teda hodnotu r. 40 mínus hodnotu na r. 77
    //
    // aj by vyšiel rozdiel záporný, na r. 78 bude suma 0,00. Znamená to, že ak má zo zamestnania základ dane,
    // ktorý je menej ako nezdaniteľná časť, na akú má nárok - tak na r. 78 bude 0,00. A ten rozdiel, ktorý ostane,
    // ten potom použije na zníženie základu dane z podnikania
    //
    // ak je r. 40 viac ako je r. 77, potom na r. 78 uvediete rozdiel r. 40 - . 77
    get r078_zaklad_dane_zo_zamestnania() {
      return round(
        Decimal.max(this.r038.minus(this.r077_nezdanitelna_cast), 0)
      )
    },
    // r. 80 - tu uvediete vo vašom prípade sumu, ktorá je na r. 78. keďže nepočítate s inými typmi príjmov,
    // tak to rovno môžete dať, že sa to rovná. opäť, ak je hodnota na r. 78 0,00,
    // aj na r. 80 musíte preniesť 0,00, nemôže ostať prázdny
    get r080_zaklad_dane_celkovo() {
      return this.r078_zaklad_dane_zo_zamestnania.plus(this.r065)
    },
    // 5. idete počítať daň zo základu dane, ktorý ste vypočítali a uviedli na r. 80. Táto daň sa počíta tak, ako v minulosti,
    // teda buď je sadzba 19% alebo 25%, podľa toho, aká je výška základu dane, či je to rovné alebo menšie ako 37 163,36 eur -
    // vtedy je daň vypočítaná ako 19% z r. 80 alebo ak je základ dane na r. 80 viac ako 37 163,36 eur - tak počítate daň do
    // sumy 37 163,36 x 19% a to, čo prevyšuje túto sumu, sa zdaní x 25% - teda klasický spôsob uplatnenia 19% alebo 25% sadzby
    get r081() {
      if (this.r080_zaklad_dane_celkovo.isZero()) {
        return new Decimal(0)
      }

      if (this.r080_zaklad_dane_celkovo.lte(KONSTANTA)) {
        return this.r080_zaklad_dane_celkovo.times(DAN_Z_PRIJMU_SADZBA)
      }
      const danZPrvejCasti = round(new Decimal(KONSTANTA).times(DAN_Z_PRIJMU_SADZBA))
      const toCoPrevysuje = this.r080_zaklad_dane_celkovo.minus(KONSTANTA)
      return round(danZPrvejCasti.plus(
        round(toCoPrevysuje.times(DAN_Z_PRIJMU_SADZBA_ZVYSENA)),
      ))
    },
    // na r. 90 uvediete sumu dane, ktorú vypočítate na r. 81
    get r090() {
      return this.r081
    },
    // r. 91, kde napíšete hodnotu nezdaniteľnej časti, ktorá vám ostala na odpočítanie od základu dane z podnikania.
    // Platí, že ak r. 78 = 0, tak potom na r. 91 je hodnota, ktorá je rozdielom r. 77 mínus r. 40
    get r091() {
      if (this.r078_zaklad_dane_zo_zamestnania.eq(0)) {
        return round(
          Decimal.max(this.r077_nezdanitelna_cast.minus(this.r038), 0),
        )
      }
      return new Decimal(0)
    },
    get r092() {
      return this.r057.minus(this.r091)
    },
    get r094() {
      return this.r092
    },
    get r095() {
      return this.t1r10_prijmy
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
        return this.r094.times(DAN_Z_PRIJMU_SADZBA)

      } else {
        return new Decimal(KONSTANTA)
          .times(DAN_Z_PRIJMU_SADZBA)
          .plus(this.r094.minus(KONSTANTA).times(DAN_Z_PRIJMU_SADZBA_ZVYSENA))
      }
    },
    // r. 105 bude rovnaká suma ako na r. 96, keďže vo vašich prípadoch nezohľadňujete príjmy zo zahraničia
    get r105() {
      return this.r096
    },
    // celé sa vám to spojí potom na r. 116, kde spočítavate r. 90 + r. 105 + r. 115,
    // vo vašom prípade spočítate výšku dane zo  zamestnania a výšku dane z podnikania
    get r116_dan() {
      return round(this.r090.plus(this.r105))
    },
    get r116a() {
      if (this.partner_bonus_na_deti) {
        if (this.r034.pocetMesiacov === 12) {
          return this.r034a.plus(this.r038).plus(this.r045)
        } else {
          const partner = round(this.r034a.dividedBy(12)).times(this.r034.pocetMesiacov)
          return this.r038.plus(this.r045).plus(partner)
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

      const monthGroups = []
      let lastChangeIndex = 0

      for (let index = 1; index < months.length; index++) {
        const currentElement = months[index];
        const previousElement = months[index - 1];

        if (currentElement.count !== previousElement.count) {
          monthGroups.push(months.slice(lastChangeIndex, index))
          lastChangeIndex = index
        }

        if (index === months.length - 1) {
          monthGroups.push(months.slice(lastChangeIndex, index + 1))
        }
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

        zakladDane = zakladDane.toDecimalPlaces(2, Decimal.ROUND_UP)
        const percentLimit = getPercentualnyLimitNaDeti(monthGroup[0].count)
        let limit = zakladDane.times(percentLimit).toDecimalPlaces(2, Decimal.ROUND_HALF_UP)

        if (pocetMesiacovVSkupine !== 12) {
          const pom = limit.div(12).toDecimalPlaces(2)
          limit = pom.times(pocetMesiacovVSkupine).toDecimalPlaces(2, Decimal.ROUND_HALF_UP)
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
    get r117() {
      return this.danovyBonusNaDieta.danovyBonus
    },
    get r118() {
      return Decimal.max(this.r116_dan.minus(this.r117), 0)
    },
    get r119() {
      return new Decimal(
        parseInputNumber(input?.udajeODanovomBonuseNaDieta ?? '0'),
      )
    },
    get r120() {
      return Decimal.max(new Decimal(this.r117).minus(this.r119), 0)
    },
    get r121() {
      return Decimal.max(this.r120.minus(this.r116_dan), 0)
    },
    get r122() {
      return Decimal.max(this.r119.minus(this.r117), 0)
    },
    get r123() {
      if (this.r035_uplat_dan_bonus_zaplat_uroky) {
        if (this.r035_pocet_mesiacov === 12) {
          return Decimal.min(this.r035_zaplatene_uroky.times(0.5), new Decimal(DANOVY_BONYS_NA_ZAPLATENE_UROKY))
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
      } else {
        return new Decimal(0)
      }
    },
    get r124() {
      return Decimal.max(this.r118.minus(this.r123), 0)
    },
    r125: new Decimal(0),
    get r126() {
      return Decimal.max(this.r123.minus(this.r125), 0)
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
      return Decimal.max(this.r126.minus(this.r118), 0)
    },
    r128: new Decimal(0),
    r129: new Decimal(0),
    r130: new Decimal(0),
    get r131() {
      return new Decimal(parseInputNumber(input?.uhrnPreddavkovNaDan ?? '0'))
    },
    get r132() {
      return new Decimal(0)
    },
    get r133() {
      return new Decimal(parseInputNumber(input?.zaplatenePreddavky ?? '0'))
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

      return tax.gt(5) ? tax : new Decimal(0)
    },
    get r136_danovy_preplatok() {
      return Decimal.abs(
        Decimal.min(
          0,
          new Decimal(this.r116_dan)
            .minus(this.r117)
            .plus(this.r119)
            .plus(this.r121)
            .minus(this.r131)
            .minus(this.r133),
        ),
      )
    },
    splnam3per: input?.splnam3per ?? false,
    get suma_2_percenta() {
      return percentage(this.r124, 2)
    },
    get suma_3_percenta() {
      return percentage(this.r124, 3)
    },
    get r151() {
      if (!input.XIIoddiel_uplatnujem2percenta) {
        return new Decimal(0)
      }

      const NGOAmount = this.splnam3per ? this.suma_3_percenta : this.suma_2_percenta

      /** Min of 3 EUR is required */
      return NGOAmount.gte(MIN_2_PERCENT_CALCULATED_DONATION)
        ? NGOAmount
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

    get canDonateTwoPercentOfTax() {
      return percentage(this.r124, 3).gte(
        MIN_2_PERCENT_CALCULATED_DONATION,
      )
    },
  }
}

export const buildSummary = (form: TaxForm): Summary => {
  return {
    prijmy: form.r036.plus(form.r039),
    pausalneVydavky: (form.r040.minus(form.vydavkyPoistPar6ods11_ods1a2)).negated(),
    zaplatenePoistneSpolu: (form.r037.plus(form.vydavkyPoistPar6ods11_ods1a2)).negated(),
    nezdanitelnaCastNaSeba: form.r073.negated(),
    nezdanitelnaCastNaPartnera: form.r074_znizenie_partner.negated(),
    prispevkyNaDochodkovePoistenie: form.r075_zaplatene_prispevky_na_dochodok.negated(),
    zakladDane: form.r078_zaklad_dane_zo_zamestnania.plus(form.r092),
    danSpolu: form.r116_dan,
    preddavkyNaDan: (form.r131.plus(form.r132).plus(form.r133).plus(form.r134)).negated(),
    danovyBonusNaDeti: form.r117.negated(),
    danovyBonusNaUroky: form.r123.negated(),
    danovyBonusPreplatokNaVyplatenie: form.r136_danovy_preplatok.plus(form.r121).plus(form.r127),
    danNaUhradu: form.r135_dan_na_uhradu,
    prijemNehnutelnost: form.t1r11s1,
    vydavkyNehnutelnost: form.t1r11s2,
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

export const countPreddavky = (form: TaxForm): Number => {
  if (Number(form.r135_dan_na_uhradu) > VRCHNA_SADZBA_PRE_PREDDAVKY) {
    return Number(round((form.r055.mul(DAN_Z_PRIJMU_SADZBA).div(POCET_MESIACOV))))
  } else if (Number(form.r135_dan_na_uhradu) > SPODNA_SADZBA_PRE_PREDDAVKY) {
    return Number(round((form.r055.mul(DAN_Z_PRIJMU_SADZBA).div(POCET_KVARTALOV))))
  }
}
