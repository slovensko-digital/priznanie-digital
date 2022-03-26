import { ChildInput, TaxFormUserInput } from '../types/TaxFormUserInput'
import { Child, TaxForm } from '../types/TaxForm'
import {
  getRodneCisloAgeAtYearAndMonth,
  round,
  parseInputNumber,
  percentage,
  // ceilDecimal,
  sum,
} from './utils'
import Decimal from 'decimal.js'
import { validatePartnerBonusForm } from './validatePartnerBonusForm'
import { Summary } from '../types/Summary'

const NEZDANITELNA_CAST_ZAKLADU = new Decimal(4511.43)
const PAUSALNE_VYDAVKY_MAX = 20_000

const DAN_Z_PRIJMU_ZNIZENA_SADZBA_LIMIT = new Decimal(49_790)
const DAN_Z_PRIJMU_SADZBA_ZNIZENA = new Decimal(0.15)
const DAN_Z_PRIJMU_SADZBA = new Decimal(0.19)
const DAN_Z_PRIJMU_SADZBA_ZVYSENA = new Decimal(0.25)

export const MIN_PRIJEM_NA_DANOVY_BONUS_NA_DIETA = 3480
const MAX_ZAKLAD_DANE = 19_936.22
export const PARTNER_MAX_ODPOCET = 4124.74

export const CHILD_RATE_SIX_AND_YOUNGER = 46.44
export const CHILD_RATE_OVER_SIX_UNTIL_JULY = 23.22
export const CHILD_RATE_OVER_SIX_FROM_JULY = 39.47
const CHILD_RATE_FIFTEEN_AND_OLDER = 23.22

const ZIVOTNE_MINIMUM_44_NASOBOK = 9495.49
// NEZDANITELNA_CAST_JE_NULA_AK_JE_ZAKLAD_DANE_VYSSI_AKO
const KONSTANTA = 37_981.94
export const TAX_YEAR = 2021
const MIN_2_PERCENT_CALCULATED_DONATION = 3

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

export function calculate(input: TaxFormUserInput): TaxForm {
  const [titul, titulZa] = input.r006_titul
    ? input.r006_titul.split(' / ')
    : ['', '']

  /** Combine default vaules with user input */
  return {
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
    get r034() {
      if (!this.eligibleForChildrenBonus) {
        return []
      }
      const mapChild = makeMapChild(input?.hasChildren)
      return input.children.map((child) => mapChild(child))
    },

    /** SECTION Mortgage NAMES ARE WRONG TODO*/
    // r037_uplatnuje_uroky: input?.r037_uplatnuje_uroky ?? false,
    // r037_zaplatene_uroky: new Decimal(
    //   parseInputNumber(input?.r037_zaplatene_uroky ?? '0'),
    // ),
    // r037_pocetMesiacov: parseInputNumber(input?.r037_pocetMesiacov ?? '0'),

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
            new Decimal(ZIVOTNE_MINIMUM_44_NASOBOK).minus(
              this.r072_pred_znizenim.times(0.25),
            ),
          ),
        )
      }
      return NEZDANITELNA_CAST_ZAKLADU
    },
    get r074_znizenie_partner() {
      if (!this.r032_uplatnujem_na_partnera) {
        return new Decimal(0)
      }

      if (this.r072_pred_znizenim.gt(KONSTANTA)) {
        const cislo = Decimal.max(
          0,
          new Decimal(13_326.68)
            .minus(
              this.r072_pred_znizenim
                .times(0.25)
                .minus(Decimal.max(this.r032_partner_vlastne_prijmy, 0)),
            )
            .times(new Decimal(1).div(12))
            .times(this.r032_partner_pocet_mesiacov),
        )
        console.log(
          '🚀 ~ file: calculation.ts ~ line 242 ~ getr074_znizenie_partner ~ cislo',
          cislo,
        )
        return cislo
      }

      const vetva2 = Decimal.max(
        0,
        new Decimal(PARTNER_MAX_ODPOCET)
          .minus(Decimal.max(this.r032_partner_vlastne_prijmy, 0))
          .times(new Decimal(1).div(12))
          .times(this.r032_partner_pocet_mesiacov),
      )
      console.log('vetva2', vetva2)
      return vetva2
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
      return round(Decimal.max(this.r038.minus(this.r077_nezdanitelna_cast), 0))
    },
    // r. 80 - tu uvediete vo vašom prípade sumu, ktorá je na r. 78. keďže nepočítate s inými typmi príjmov,
    // tak to rovno môžete dať, že sa to rovná. opäť, ak je hodnota na r. 78 0,00,
    // aj na r. 80 musíte preniesť 0,00, nemôže ostať prázdny
    get r080_zaklad_dane_celkovo() {
      return this.r078_zaklad_dane_zo_zamestnania
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

      const danZPrvejCasti = new Decimal(KONSTANTA).times(DAN_Z_PRIJMU_SADZBA)
      const toCoPrevysuje = this.r080_zaklad_dane_celkovo.minus(KONSTANTA)
      return danZPrvejCasti.plus(
        toCoPrevysuje.times(DAN_Z_PRIJMU_SADZBA_ZVYSENA),
      )
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
    // r. 92 - tu už idete vzorcom, kedy od základu dane z podnikania (r. 57) odpočítate sumu z r. 91
    // tak dostanete základ dane z podnikania, z ktorého idete počítať výšku dane z podnikania
    get r092() {
      return this.r057.minus(this.r091)
    },
    // r. 94 je rovnaký ako r. 92
    get r094() {
      return this.r092
    },
    // tu pribudol r. 95 - je to riadok, ktorý bude určovať, akú sadzbu dane použije podnikateľ na výpočet dane
    // z podnikania. na tomto riadku musí podnikateľ uviesť, aká je výška jeho zdaniteľných príjmov. vo vašom prípade
    // by to mohla byť suma príjmov z podnikania, ktoré zadáva na začiatku. Ak je táto hodnota na r. 95 menšia alebo
    // rovná ako 100 000 eur, potom sa daň z podnikania počíta sadzbou 15%. Teda hodnotu z r. 94 vynásobíte
    // sadzbou 15% a máte daň z podnikania na r. 96. Ak je hodnota na r. 95 viac ako 100 000 eur, potom sa daň z
    // podnikania počíta klasickým systémom 19% alebo 25% - v závislosti, či je základ dane na r. 94 viac alebo menej
    // ako 37 163,36 eur - tu ste teda už v tom, čo bolo kedysi.
    get r095() {
      return this.t1r10_prijmy
    },
    // r. 96 - tu uvediete výšku dane z podnikania, ktorá sa vypočíta systémom, ako som popísala v r. 95. vychádza
    // sa teda z r. 94, kedy sa r. 94 vynásobí buď sadzbou 15% alebo sa r. 94 vynásobí sadzbou 19%/25%. to,
    // akú sadzbu použijete - na to vám dá odpoveď suma na r. 95
    /** TODO rework */
    get r096() {
      if (this.r094.lte(0)) {
        return new Decimal(0)
      }
      // má byť rovný r.94 * 0,15 ak je r. 94>0 a súčasne r. 95<= 100 000.
      if (this.r095.lte(DAN_Z_PRIJMU_ZNIZENA_SADZBA_LIMIT)) {
        return this.r094.times(DAN_Z_PRIJMU_SADZBA_ZNIZENA)
        // Ak r.94> 0 a súčasne r.95 > 100 000, potom:
      }

      // ak r.94 <= 37 163.36, tak r.96 = r.94 * 0.19
      return this.r094.lte(KONSTANTA)
        ? this.r094.times(DAN_Z_PRIJMU_SADZBA)
        : new Decimal(KONSTANTA)
            .times(DAN_Z_PRIJMU_SADZBA)
            .plus(this.r094.minus(KONSTANTA).times(DAN_Z_PRIJMU_SADZBA_ZVYSENA))
    },
    // r. 105 bude rovnaká suma ako na r. 96, keďže vo vašich prípadoch nezohľadňujete príjmy zo zahraničia
    get r105() {
      return this.r096
    },
    // celé sa vám to spojí potom na r. 116, kde spočítavate r. 90 + r. 105 + r. 115,
    // vo vašom prípade spočítate výšku dane zo  zamestnania a výšku dane z podnikania
    get r116_dan() {
      return this.r090.plus(this.r105)
    },
    get r117() {
      if (!this.eligibleForChildrenBonus) {
        return new Decimal(0)
      }
      return this.r034.reduce((previousSum, currentChild) => {
        let currentSum = new Decimal(0)

        const getRate = (month: number) => {
          const age = getRodneCisloAgeAtYearAndMonth(
            currentChild.rodneCislo,
            TAX_YEAR,
            month - 1,
          )

          const isUnderSix = age < 6
          if (isUnderSix) {
            return new Decimal(CHILD_RATE_SIX_AND_YOUNGER)
          }

          const isUnderFifteen = age < 15
          if (isUnderFifteen) {
            if (month <= 6) {
              return new Decimal(CHILD_RATE_OVER_SIX_UNTIL_JULY)
            }

            return new Decimal(CHILD_RATE_OVER_SIX_FROM_JULY)
          }

          return new Decimal(CHILD_RATE_FIFTEEN_AND_OLDER)
        }

        if (currentChild.m00 || currentChild.m01) {
          const rate = getRate(1)
          currentSum = currentSum.plus(rate)
        }
        if (currentChild.m00 || currentChild.m02) {
          const rate = getRate(2)
          currentSum = currentSum.plus(rate)
        }
        if (currentChild.m00 || currentChild.m03) {
          const rate = getRate(3)
          currentSum = currentSum.plus(rate)
        }
        if (currentChild.m00 || currentChild.m04) {
          const rate = getRate(4)
          currentSum = currentSum.plus(rate)
        }
        if (currentChild.m00 || currentChild.m05) {
          const rate = getRate(5)
          currentSum = currentSum.plus(rate)
        }
        if (currentChild.m00 || currentChild.m06) {
          const rate = getRate(6)
          currentSum = currentSum.plus(rate)
        }
        if (currentChild.m00 || currentChild.m07) {
          const rate = getRate(7)
          currentSum = currentSum.plus(rate)
        }
        if (currentChild.m00 || currentChild.m08) {
          const rate = getRate(8)
          currentSum = currentSum.plus(rate)
        }
        if (currentChild.m00 || currentChild.m09) {
          const rate = getRate(9)
          currentSum = currentSum.plus(rate)
        }
        if (currentChild.m00 || currentChild.m10) {
          const rate = getRate(10)
          currentSum = currentSum.plus(rate)
        }
        if (currentChild.m00 || currentChild.m11) {
          const rate = getRate(11)
          currentSum = currentSum.plus(rate)
        }
        if (currentChild.m00 || currentChild.m12) {
          const rate = getRate(12)
          currentSum = currentSum.plus(rate)
        }

        return previousSum.plus(currentSum)
      }, new Decimal(0))
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
    get mozeZiadatVyplatitDanovyBonus() {
      return this.r121.gt(0)
    },
    get mozeZiadatVratitDanovyPreplatok() {
      return this.r136_danovy_preplatok.gt(0)
    },
    get r124() {
      return this.r118
    },
    /** TODO */
    // get r125() {
    //   return new Decimal(0)
    // },
    // get r126() {
    //   return Decimal.max(this.r123.minus(this.r125), 0)
    // },
    get r131() {
      return new Decimal(parseInputNumber(input?.uhrnPreddavkovNaDan ?? '0'))
    },
    get r133() {
      return new Decimal(parseInputNumber(input?.zaplatenePreddavky ?? '0'))
    },
    get r135_dan_na_uhradu() {
      const baseTax =
        this.r116_dan.gt(17) || this.r117.gt(0) ? this.r116_dan : new Decimal(0)

      const tax = Decimal.max(
        0,
        baseTax
          .minus(this.r117)
          .plus(this.r119)
          .plus(this.r121)
          .minus(this.r131)
          .minus(this.r133),
      )
      return tax.gt(5) ? tax : new Decimal(0)
      // 'r. 125': má byť výsledkom Max(0,r.105-r.106+r.108+r.110-r.112+r.114+r.116+r.117-r.118-r.119-r.120-r.121-r.122-r.123-r.124) ak platí, r.105>17.00 alebo r.105<=17.00 a zároveň je r.106>0 alebo r.112>0.
      // Inak r.125=max(0,0–r.106+r.108+r.110-r.112+r.114+r.116+r.117-r.118-r.119-r.120-r.121-r.122-r.123-r.124).
      // Ak daň na úhradu nepresiahne 5€, daň sa neplatí, v r.125 sa uvedie nula.

      // vo vypocte chyba: +r.116+r.117-r.118-r.119-r.121-r.123-r.124 (asi ich netreba lebo sa nevyplnaju vo formulari, tj su rovne nula)
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
    get r151() {
      if (!input.XIIoddiel_uplatnujem2percenta) {
        return new Decimal(0)
      }

      const rate = this.splnam3per ? 3 : 2
      const NGOAmount = percentage(this.r124, rate)

      /** Min of 3 EUR is required */
      return NGOAmount.gte(MIN_2_PERCENT_CALCULATED_DONATION)
        ? NGOAmount
        : new Decimal(0)
    },
    get r152() {
      if (!input.XIIoddiel_uplatnujem2percenta) {
        return
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
    iban: input?.iban ? input?.iban.replace(/\s/g, '') : '',

    get eligibleForChildrenBonus() {
      return (
        this.t1r10_prijmy.gte(MIN_PRIJEM_NA_DANOVY_BONUS_NA_DIETA) ||
        this.r036.gte(MIN_PRIJEM_NA_DANOVY_BONUS_NA_DIETA)
      )
    },

    datum: input.datum,

    get canDonateTwoPercentOfTax() {
      return percentage(this.r135_dan_na_uhradu, 3).gte(
        MIN_2_PERCENT_CALCULATED_DONATION,
      )
    },
    get mikrodanovnik() {
      if (this.r095.lte(DAN_Z_PRIJMU_ZNIZENA_SADZBA_LIMIT)) {
        return true
      }
      return false
    },
  }
}

export function buildSummary(form: TaxForm): Summary {
  return {
    prijmy: form.t1r10_prijmy.plus(form.r036),
    zdravotnePoistne: form.priloha3_r13_zdravotne.plus(
      form.priloha3_r10_zdravotne,
    ),
    socialnePoistne: form.priloha3_r11_socialne.plus(
      form.priloha3_r09_socialne,
    ),
    get zaplatenePoistneSpolu() {
      return this.zdravotnePoistne.plus(this.socialnePoistne)
    },
    zvyhodnenieNaManz: form.r074_znizenie_partner,
    danovyBonusNaDieta: form.r117,
    prispevokNaDochodkovePoist: form.r075_zaplatene_prispevky_na_dochodok,
    zakladDane: form.r080_zaklad_dane_celkovo,
    danovyPreplatok: form.r121.plus(form.r136_danovy_preplatok),
    danNaUhradu: form.r135_dan_na_uhradu,
  }
}
