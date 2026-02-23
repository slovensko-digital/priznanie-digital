import xmljs from 'xml-js'
import cloneDeep from 'lodash.clonedeep'
import outputBasis from './outputBasis'
import { TaxForm } from '../../types/TaxForm'
import { OutputJson, Dieta } from '../../types/OutputJson'
import { boolToString, decimalToString, formatDate } from '../utils'

export function convertToJson(taxForm: TaxForm): OutputJson {
  const form: OutputJson = cloneDeep(outputBasis)

  if (!taxForm.r001_dic) {
    return form // return empty xml if the form is not filled out
  }

  form.dokument.hlavicka.dic = taxForm.r001_dic

  const [naceCode, naceLabel] = taxForm.r003_nace.split(' - ')

  form.dokument.hlavicka.skNace = {
    k1: naceCode.slice(0, 2),
    k2: naceCode.slice(2, 4),
    k3: naceCode.slice(4, 5),
    cinnost: naceLabel,
  }

  form.dokument.hlavicka.priezvisko = taxForm.r004_priezvisko
  form.dokument.hlavicka.meno = taxForm.r005_meno
  form.dokument.hlavicka.titul = taxForm.r006_titul
  form.dokument.hlavicka.titulZa = taxForm.r006_titul_za
  form.dokument.hlavicka.adresaTrvPobytu.ulica = taxForm.r007_ulica
  form.dokument.hlavicka.adresaTrvPobytu.cislo = taxForm.r008_cislo
  form.dokument.hlavicka.adresaTrvPobytu.psc = taxForm.r009_psc
  form.dokument.hlavicka.adresaTrvPobytu.obec = taxForm.r010_obec
  form.dokument.hlavicka.adresaTrvPobytu.stat = taxForm.r011_stat

  form.dokument.telo.tabulka1.t1r2.s1 = decimalToString(taxForm.t1r2_prijmy)
  form.dokument.telo.tabulka1.t1r10.s1 = decimalToString(taxForm.t1r10_prijmy)
  form.dokument.telo.tabulka1.t1r10.s2 = decimalToString(taxForm.t1r10_vydavky)

  if (taxForm.t1r10_prijmy.greaterThan(0)) {
    form.dokument.telo.vydavkyPoistPar6ods11_ods1a2 = decimalToString(
      taxForm.vydavkyPoistPar6ods11_ods1a2,
    )
    // checked only when there is self-employment income, as our form supports only flat expenses
    form.dokument.telo.vydavkyPar6ods10_ods1a2 = '1'
  }
  if (taxForm.platil_prispevky_na_dochodok) {
    form.dokument.telo.r75 = decimalToString(
      taxForm.r075_zaplatene_prispevky_na_dochodok,
    )
  }

  /** SECTION Partner */
  if (taxForm.r032_uplatnujem_na_partnera) {
    form.dokument.telo.r31 = {
      priezviskoMeno: taxForm.r031_priezvisko_a_meno,
      rodneCislo: taxForm.r031_rodne_cislo,
    }

    form.dokument.telo.r32 = {
      uplatnujemNCZDNaManzela: boolToString(
        taxForm.r032_uplatnujem_na_partnera,
      ),
      vlastnePrijmy: decimalToString(taxForm?.r032_partner_vlastne_prijmy),
      pocetMesiacov: taxForm?.r032_partner_pocet_mesiacov.toString(),
    }
  }

  form.dokument.telo.r74 = decimalToString(taxForm.r074_znizenie_partner)

  /** SECTION Children */
  if (taxForm.r033 && taxForm.r033.length > 0 && taxForm.r117.greaterThan(0)) {
    form.dokument.telo.r33.dieta = taxForm.r033.map((child) => {
      return Object.fromEntries(
        Object.entries(child).map(([key, value]) => [
          key,
          typeof value === 'boolean' ? boolToString(value) : value,
        ]),
      )
    }) as Dieta[]
    form.dokument.telo.r33a = boolToString(taxForm.r033a)
    if (taxForm.partner_bonus_na_deti) {
      form.dokument.telo.uplatnujemPar33Ods8 = boolToString(
        taxForm.partner_bonus_na_deti,
      )
      form.dokument.telo.r34a = decimalToString(taxForm.r034a)
      form.dokument.telo.r34.priezviskoMeno = taxForm.r034.priezviskoMeno
      form.dokument.telo.r34.rodneCislo = taxForm.r034.rodneCislo
      form.dokument.telo.r34.m00 = boolToString(taxForm.r034.m00)
      form.dokument.telo.r34.m01 = boolToString(taxForm.r034.m01)
      form.dokument.telo.r34.m02 = boolToString(taxForm.r034.m02)
      form.dokument.telo.r34.m03 = boolToString(taxForm.r034.m03)
      form.dokument.telo.r34.m04 = boolToString(taxForm.r034.m04)
      form.dokument.telo.r34.m05 = boolToString(taxForm.r034.m05)
      form.dokument.telo.r34.m06 = boolToString(taxForm.r034.m06)
      form.dokument.telo.r34.m07 = boolToString(taxForm.r034.m07)
      form.dokument.telo.r34.m08 = boolToString(taxForm.r034.m08)
      form.dokument.telo.r34.m09 = boolToString(taxForm.r034.m09)
      form.dokument.telo.r34.m10 = boolToString(taxForm.r034.m10)
      form.dokument.telo.r34.m11 = boolToString(taxForm.r034.m11)
      form.dokument.telo.r34.m12 = boolToString(taxForm.r034.m12)
      form.dokument.telo.r34.dokladRocZuct = boolToString(
        taxForm.r034.dokladRocZuct,
      )
      form.dokument.telo.r34.dokladVyskaDane = boolToString(
        taxForm.r034.dokladVyskaDane,
      )
      form.dokument.telo.r34.druhaOsobaPodalaDPvSR = boolToString(
        taxForm.r034.druhaOsobaPodalaDPvSR,
      )
    }
  }

  /** SECTION Rent */
  if (
    taxForm.rent &&
    (taxForm.t1r11s1.greaterThan(0) || taxForm.t1r11s2.greaterThan(0))
  ) {
    form.dokument.telo.tabulka1.t1r11.s1 = decimalToString(taxForm.t1r11s1)
    form.dokument.telo.tabulka1.t1r11.s2 = decimalToString(taxForm.t1r11s2)
    form.dokument.telo.tabulka1.t1r13.s1 = decimalToString(taxForm.t1r13s1)
    form.dokument.telo.tabulka1.t1r13.s2 = decimalToString(taxForm.t1r13s2)

    form.dokument.telo.vydavkyPar6ods11_ods3 = boolToString(true)

    form.dokument.telo.r58 = decimalToString(taxForm.r058)
    form.dokument.telo.r59 = decimalToString(taxForm.r059)
    form.dokument.telo.r60 = decimalToString(taxForm.r060)
    form.dokument.telo.r65 = decimalToString(taxForm.r065)
  }

  /** SECTION Mortgage */
  if (taxForm.r035_uplat_dan_bonus_zaplat_uroky) {
    form.dokument.telo.r35 = {
      uplatDanBonusZaplatUroky: boolToString(
        taxForm.r035_uplat_dan_bonus_zaplat_uroky,
      ),
      zaplateneUroky: decimalToString(taxForm.r035_zaplatene_uroky),
      pocetMesiacov: taxForm.r035_pocet_mesiacov.toString(),
      datumZacatiaUroceniaUveru: formatDate(
        taxForm.r035_datum_zacatia_urocenia_uveru,
      ),
      datumUzavretiaZmluvyOUvere: formatDate(
        taxForm.r035_datum_uzatvorenia_zmluvy,
      ),
    }
  }

  /** SECTION Employed */

  if (taxForm.employed || taxForm.dohoda) {
    form.dokument.telo.r36 = decimalToString(taxForm.r036)
    form.dokument.telo.r37 = decimalToString(taxForm.r037)
    form.dokument.telo.r38 = decimalToString(taxForm.r038)
    form.dokument.telo.socZdravPoistenie.pr8 = decimalToString(taxForm.r039)
  }

  if (taxForm.dohoda) {
    form.dokument.telo.r36a = decimalToString(taxForm.r036a)
  }

  form.dokument.telo.r39 = decimalToString(taxForm.r039)
  form.dokument.telo.r40 = decimalToString(taxForm.r040)
  form.dokument.telo.r41 = decimalToString(taxForm.r041)
  form.dokument.telo.r45 = decimalToString(taxForm.r045)
  form.dokument.telo.r55 = decimalToString(taxForm.r055)
  form.dokument.telo.r57 = decimalToString(taxForm.r057)

  form.dokument.telo.r72 = decimalToString(taxForm.r072_pred_znizenim)
  form.dokument.telo.r73 = decimalToString(taxForm.r073)
  form.dokument.telo.r74 = decimalToString(taxForm.r074_znizenie_partner)

  form.dokument.telo.r77 = decimalToString(taxForm.r077_nezdanitelna_cast)
  form.dokument.telo.r78 = decimalToString(
    taxForm.r078_zaklad_dane_zo_zamestnania,
  )
  form.dokument.telo.r80 = decimalToString(taxForm.r080_zaklad_dane_celkovo)
  form.dokument.telo.r81 = decimalToString(taxForm.r081)
  form.dokument.telo.r90 = decimalToString(taxForm.r090)
  form.dokument.telo.r91 = decimalToString(taxForm.r091)
  form.dokument.telo.r92 = decimalToString(taxForm.r092)
  form.dokument.telo.r94 = decimalToString(taxForm.r094)
  form.dokument.telo.r95 = decimalToString(taxForm.r095)
  form.dokument.telo.r96 = decimalToString(taxForm.r096)
  form.dokument.telo.r105 = decimalToString(taxForm.r105)
  form.dokument.telo.r106 = '0.00'
  form.dokument.telo.r115 = '0.00'
  form.dokument.telo.r116 = decimalToString(taxForm.r116_dan)
  form.dokument.telo.r116a = decimalToString(taxForm.r116a)
  if (taxForm.r117.greaterThan(0)) {
    form.dokument.telo.r117 = decimalToString(taxForm.r117)
  }

  form.dokument.telo.r118 = decimalToString(taxForm.r118)
  form.dokument.telo.r119 = decimalToString(taxForm.r119)
  form.dokument.telo.r120 = decimalToString(taxForm.r120)
  form.dokument.telo.r121 = decimalToString(taxForm.r121)
  form.dokument.telo.r122 = decimalToString(taxForm.r122)
  form.dokument.telo.r123 = decimalToString(taxForm.r123)
  form.dokument.telo.r124 = decimalToString(taxForm.r124)
  form.dokument.telo.r126 = decimalToString(taxForm.r126)
  form.dokument.telo.r127 = decimalToString(taxForm.r127)
  form.dokument.telo.r131 = decimalToString(taxForm.r131)

  form.dokument.telo.r133 = decimalToString(taxForm.r133)

  form.dokument.telo.r135 = decimalToString(taxForm.r135_dan_na_uhradu)
  form.dokument.telo.r136 = decimalToString(taxForm.r136_danovy_preplatok)
  if (taxForm.r146.greaterThan(0)) {
    form.dokument.telo.r146 = decimalToString(taxForm.r146)
    form.dokument.telo.r146a = decimalToString(taxForm.r146a)
  }

  /** SECTION 2 percent */
  if (
    taxForm.canDonateTwoPercentOfTax &&
    taxForm.XIIoddiel_uplatnujem2percenta
  ) {
    form.dokument.telo.r151.neuplatnujemPar50 = boolToString(
      !taxForm.XIIoddiel_uplatnujem2percenta,
    )
    form.dokument.telo.r151.splnam3per = boolToString(taxForm.splnam3per)
    form.dokument.telo.r151.ico = taxForm.r151.ico
    form.dokument.telo.r151.obchodneMeno.riadok = [taxForm.r151.obchMeno]
    form.dokument.telo.r151.suhlasSoZaslanim = boolToString(
      taxForm.r151.suhlasZaslUdaje,
    )
    form.dokument.telo.r152 = decimalToString(taxForm.r152)
  }

  if (
    taxForm.r153 &&
    taxForm.canDonateTwoPercentOfTax &&
    taxForm.r153.neuplatnujemPar50aa === false
  ) {
    form.dokument.telo.r153.neuplatnujemPar50aa = boolToString(
      taxForm.r153.neuplatnujemPar50aa,
    )
    form.dokument.telo.r153.bolZverenyDoStarostlivosti = boolToString(
      taxForm.r153.bolZverenyDoStarostlivosti,
    )
    form.dokument.telo.r153.rodicA.meno = taxForm.r153.rodicA.meno
    form.dokument.telo.r153.rodicA.priezvisko = taxForm.r153.rodicA.priezvisko
    form.dokument.telo.r153.rodicA.rodneCislo = taxForm.r153.rodicA.rodneCislo
    if (taxForm.r153.rodicB) {
      form.dokument.telo.r153.rodicB.meno = taxForm.r153.rodicB.meno
      form.dokument.telo.r153.rodicB.priezvisko = taxForm.r153.rodicB.priezvisko
      form.dokument.telo.r153.rodicB.rodneCislo = taxForm.r153.rodicB.rodneCislo
    }
  }

  form.dokument.telo.r154 = taxForm.employed || taxForm.dohoda ? '7' : '6'

  if (
    taxForm.mozeZiadatVratitPreplatkyBonusyUroky &&
    taxForm.ziadamVyplatitDanovyBonusUrokPreplatok
  ) {
    form.dokument.telo.danovyPreplatokBonus.bankovyUcet.IBAN = taxForm.iban
    form.dokument.telo.danovyPreplatokBonus.datum = taxForm.datum
    form.dokument.telo.danovyPreplatokBonus.sposobPlatby.ucet = '1'

    if (taxForm.mozeZiadatVyplatitDanovyBonus) {
      form.dokument.telo.danovyPreplatokBonus.vyplatitDanovyBonus = '1'
    }
    if (taxForm.mozeZiadatVratitDanovyPreplatok) {
      form.dokument.telo.danovyPreplatokBonus.vratitDanPreplatok = '1'
    }
    if (taxForm.mozeZiadatVratitDanovyBonusUroky) {
      form.dokument.telo.danovyPreplatokBonus.vyplatitDanovyBonusUroky = '1'
    }
  }

  form.dokument.telo.datumVyhlasenia = taxForm.datum

  form.dokument.telo.socZdravPoistenie.pr8 = decimalToString(
    taxForm.priloha3_r08_poistne_spolu,
  )

  form.dokument.telo.socZdravPoistenie.pr9 = decimalToString(
    taxForm.priloha3_r09_socialne,
  )

  form.dokument.telo.socZdravPoistenie.pr10 = decimalToString(
    taxForm.priloha3_r10_zdravotne,
  )

  form.dokument.telo.socZdravPoistenie.pr11 = decimalToString(
    taxForm.priloha3_r11_socialne,
  )
  form.dokument.telo.socZdravPoistenie.pr13 = decimalToString(
    taxForm.priloha3_r13_zdravotne,
  )

  form.dokument.telo.socZdravPoistenie.datum = taxForm.socZdravPoistenieDatum

  return form
}

export function convertToXML(taxForm: TaxForm) {
  const jsonForm = convertToJson(taxForm)
  let XMLForm = `<?xml version="1.0" encoding="utf-8"?>\n`
  XMLForm += xmljs.js2xml(jsonForm, {
    compact: true,
    spaces: 3,
  })

  return XMLForm
}
