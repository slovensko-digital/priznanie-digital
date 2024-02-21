import xmljs from 'xml-js'
import cloneDeep from 'lodash.clonedeep'
import outputBasis from './outputBasis'
import { TaxForm } from '../../types/TaxForm'
import { OutputJson, Dieta } from '../../types/OutputJson'
import { boolToString, decimalToString, roundDecimal } from '../utils'

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

  form.dokument.telo.tabulka1.t1r2.s1 = roundDecimal(taxForm.t1r2_prijmy)
  form.dokument.telo.tabulka1.t1r10.s1 = roundDecimal(taxForm.t1r10_prijmy)
  form.dokument.telo.tabulka1.t1r10.s2 = roundDecimal(taxForm.t1r10_vydavky)

  form.dokument.telo.vydavkyPoistPar6ods11_ods1a2 = roundDecimal(
    taxForm.vydavkyPoistPar6ods11_ods1a2,
  )
  if (taxForm.platil_prispevky_na_dochodok) {
    form.dokument.telo.r75 = roundDecimal(
      taxForm.r075_zaplatene_prispevky_na_dochodok,
    )
  }

  /** SECTION Partner */
  if (taxForm.r031_priezvisko_a_meno && taxForm.r031_rodne_cislo) {
    form.dokument.telo.r31 = {
      priezviskoMeno: taxForm.r031_priezvisko_a_meno,
      rodneCislo: taxForm.r031_rodne_cislo,
    }
  }

  if (taxForm.r032_uplatnujem_na_partnera) {
    form.dokument.telo.r32 = {
      uplatnujemNCZDNaManzela: boolToString(
        taxForm.r032_uplatnujem_na_partnera,
      ),
      vlastnePrijmy: roundDecimal(taxForm?.r032_partner_vlastne_prijmy),
      pocetMesiacov: taxForm?.r032_partner_pocet_mesiacov.toString(),
    }
  }

  form.dokument.telo.r74 = decimalToString(taxForm.r074_znizenie_partner)

  /** SECTION Children */
  if (taxForm.r033 && taxForm.r033.length > 0) {
    form.dokument.telo.r33.dieta = taxForm.r033.map((child) => {
      return Object.fromEntries(
        Object.entries(child).map(([key, value]) => [
          key,
          typeof value === 'boolean' ? boolToString(value) : value,
        ]),
      )
    }) as Dieta[]
    if (taxForm.partner_bonus_na_deti) {
      form.dokument.telo.uplatnujemPar33Ods8 = boolToString(taxForm.partner_bonus_na_deti)
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
      form.dokument.telo.r34.dokladRocZuct = boolToString(taxForm.r034.dokladRocZuct)
      form.dokument.telo.r34.dokladVyskaDane = boolToString(taxForm.r034.dokladVyskaDane)
      form.dokument.telo.r34.druhaOsobaPodalaDPvSR = boolToString(taxForm.r034.druhaOsobaPodalaDPvSR)
    }
  }

  /** SECTION Mortgage */
  if (taxForm.r035_uplat_dan_bonus_zaplat_uroky) {
    form.dokument.telo.r35 = {
      uplatDanBonusZaplatUroky: boolToString(taxForm.r035_uplat_dan_bonus_zaplat_uroky),
      zaplateneUroky: decimalToString(taxForm.r035_zaplatene_uroky),
      pocetMesiacov: taxForm.r035_pocet_mesiacov.toString(),
      datumZacatiaUroceniaUveru: taxForm.r035_datum_zacatia_urocenia_uveru
    }

  }

  /** SECTION Employed */

  if (taxForm.employed) {
    form.dokument.telo.r36 = roundDecimal(taxForm.r036)
    form.dokument.telo.r37 = roundDecimal(taxForm.r037)
    form.dokument.telo.r38 = roundDecimal(taxForm.r038)
    form.dokument.telo.socZdravPoistenie.pr8 = roundDecimal(taxForm.r039)
  }

  form.dokument.telo.r39 = roundDecimal(taxForm.r039)
  form.dokument.telo.r40 = roundDecimal(taxForm.r040)
  form.dokument.telo.r41 = roundDecimal(taxForm.r041)
  form.dokument.telo.r45 = roundDecimal(taxForm.r045)
  form.dokument.telo.r55 = roundDecimal(taxForm.r055)
  form.dokument.telo.r57 = roundDecimal(taxForm.r057)

  form.dokument.telo.r72 = roundDecimal(taxForm.r072_pred_znizenim)
  form.dokument.telo.r73 = roundDecimal(taxForm.r073)
  form.dokument.telo.r74 = roundDecimal(taxForm.r074_znizenie_partner)

  form.dokument.telo.r77 = roundDecimal(taxForm.r077_nezdanitelna_cast)
  form.dokument.telo.r78 = roundDecimal(taxForm.r078_zaklad_dane_zo_zamestnania)
  form.dokument.telo.r80 = decimalToString(taxForm.r080_zaklad_dane_celkovo)
  form.dokument.telo.r81 = decimalToString(taxForm.r081)
  form.dokument.telo.r90 = roundDecimal(taxForm.r090)
  form.dokument.telo.r91 = roundDecimal(taxForm.r091)
  form.dokument.telo.r92 = roundDecimal(taxForm.r092)
  form.dokument.telo.r94 = roundDecimal(taxForm.r094)
  form.dokument.telo.r95 = roundDecimal(taxForm.r095)
  form.dokument.telo.r96 = roundDecimal(taxForm.r096)
  form.dokument.telo.r105 = roundDecimal(taxForm.r105)
  form.dokument.telo.r106 = '0.00'
  form.dokument.telo.r115 = '0.00'
  form.dokument.telo.r116 = roundDecimal(taxForm.r116_dan)
  form.dokument.telo.r116a = decimalToString(taxForm.r116a)
  form.dokument.telo.r117 = decimalToString(taxForm.r117)

  form.dokument.telo.r118 = roundDecimal(taxForm.r118)
  form.dokument.telo.r119 = decimalToString(taxForm.r119)
  form.dokument.telo.r120 = decimalToString(taxForm.r120)
  form.dokument.telo.r121 = decimalToString(taxForm.r121)
  form.dokument.telo.r122 = decimalToString(taxForm.r122)

  form.dokument.telo.r124 = roundDecimal(taxForm.r124)
  form.dokument.telo.r131 = decimalToString(taxForm.r131)

  form.dokument.telo.r133 = decimalToString(taxForm.r133)

  form.dokument.telo.r135 = roundDecimal(taxForm.r135_dan_na_uhradu)
  form.dokument.telo.r136 = decimalToString(taxForm.r136_danovy_preplatok)

  /** SECTION 2 percent */
  form.dokument.telo.neuplatnujem = boolToString(
    !taxForm.XIIoddiel_uplatnujem2percenta,
  )

  if (taxForm.XIIoddiel_uplatnujem2percenta && taxForm.r152) {
    form.dokument.telo.r151 = roundDecimal(taxForm.r151)
    form.dokument.telo.splnam3per = boolToString(taxForm.splnam3per)
    form.dokument.telo.r152 = {
      ...taxForm.r152,
      obchMeno: {
        riadok: [taxForm.r152.obchMeno],
      },
      suhlasZaslUdaje: boolToString(taxForm.r152.suhlasZaslUdaje),
    }
  }

  form.dokument.telo.r153 = taxForm.employed ? '5' : '4'

  const maDanovBonus =
    taxForm.mozeZiadatVyplatitDanovyBonus && taxForm.ziadamVyplatitDanovyBonus
  const maDanovyPreplatok =
    taxForm.mozeZiadatVratitDanovyPreplatok &&
    taxForm.ziadamVratitDanovyPreplatok

  if (maDanovBonus || maDanovyPreplatok) {
    form.dokument.telo.danovyPreplatokBonus.bankovyUcet.IBAN = taxForm.iban
    form.dokument.telo.danovyPreplatokBonus.datum = taxForm.datum
    form.dokument.telo.danovyPreplatokBonus.sposobPlatby.ucet = '1'

    if (taxForm.ziadamVyplatitDanovyBonus) {
      form.dokument.telo.danovyPreplatokBonus.vyplatitDanovyBonus = '1'
    }
    if (taxForm.ziadamVratitDanovyPreplatok) {
      form.dokument.telo.danovyPreplatokBonus.vratitDanPreplatok = '1'
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

  form.dokument.telo.socZdravPoistenie.pr11 = roundDecimal(
    taxForm.priloha3_r11_socialne,
  )
  form.dokument.telo.socZdravPoistenie.pr13 = roundDecimal(
    taxForm.priloha3_r13_zdravotne,
  )

  form.dokument.telo.socZdravPoistenie.datum = taxForm.datum

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
