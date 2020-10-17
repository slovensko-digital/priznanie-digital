import xmljs from 'xml-js'
import cloneDeep from 'lodash.clonedeep'
import outputBasis from './outputBasis'
import { TaxForm } from '../../types/TaxForm'
import { OutputJson, Dieta } from '../../types/OutputJson'
import Decimal from 'decimal.js'

const boolToString = (bool: boolean) => {
  return bool ? '1' : '0'
}
const decimalToString = (decimal: Decimal) => {
  return decimal.equals(0) ? '' : decimal.toFixed(2)
}

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

  form.dokument.telo.r32.uplatnujemNCZDNaManzela = taxForm.r032_uplatnujem_na_partnera
    ? '1'
    : '0'

  form.dokument.telo.r33.uplatNCZDNaKupelStarostlivost = taxForm.r033_partner_kupele
    ? '1'
    : '0'

  form.dokument.telo.tabulka1.t1r2.s1 = taxForm.t1r2_prijmy.toFixed(2)
  form.dokument.telo.tabulka1.t1r10.s1 = taxForm.t1r10_prijmy.toFixed(2)
  form.dokument.telo.tabulka1.t1r10.s2 = taxForm.t1r10_vydavky.toFixed(2)

  form.dokument.telo.vydavkyPoistPar6ods11_ods1a2 = taxForm.vydavkyPoistPar6ods11_ods1a2.toFixed(
    2,
  )
  if (taxForm.platil_prispevky_na_dochodok) {
    form.dokument.telo.r75 = taxForm.r075_zaplatene_prispevky_na_dochodok.toFixed(
      2,
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
      vlastnePrijmy: taxForm?.r032_partner_vlastne_prijmy.toFixed(2),
      pocetMesiacov: taxForm?.r032_partner_pocet_mesiacov.toString(),
    }
  }

  if (
    boolToString(taxForm.r033_partner_kupele) &&
    taxForm.r033_partner_kupele_uhrady.gt(0)
  ) {
    form.dokument.telo.r33 = {
      uplatNCZDNaKupelStarostlivost: boolToString(taxForm.r033_partner_kupele),
      preukazZaplatUhrady: taxForm.r033_partner_kupele_uhrady.toFixed(2),
    }
  }

  form.dokument.telo.r74 = taxForm.r074_znizenie_partner.gt(0)
    ? taxForm.r074_znizenie_partner.toFixed(2)
    : ''

  form.dokument.telo.r76 = taxForm.r076_kupele_spolu.gt(0)
    ? decimalToString(taxForm.r076_kupele_spolu)
    : ''
  form.dokument.telo.r76b = taxForm.r076b_kupele_partner_a_deti.gt(0)
    ? decimalToString(taxForm.r076b_kupele_partner_a_deti)
    : ''
  form.dokument.telo.r76a = taxForm.r076a_kupele_danovnik.gt(0)
    ? decimalToString(taxForm.r076a_kupele_danovnik)
    : ''

  /** SECTION Children */
  if (taxForm.r034 && taxForm.r034.length > 0) {
    form.dokument.telo.r34.dieta = taxForm.r034.map((child) => {
      return Object.fromEntries(
        Object.entries(child).map(([key, value]) => [
          key,
          typeof value === 'boolean' ? boolToString(value) : value,
        ]),
      )
    }) as Dieta[]

    form.dokument.telo.r36 = taxForm.r036_deti_kupele.gt(0)
      ? taxForm.r036_deti_kupele.toFixed(2)
      : ''
  }

  /** SECTION Mortgage */
  if (taxForm.r037_uplatnuje_uroky) {
    form.dokument.telo.r37 = {
      uplatDanBonusZaplatUroky: boolToString(taxForm.r037_uplatnuje_uroky),
      zaplateneUroky: taxForm.r037_zaplatene_uroky.toFixed(2),
      pocetMesiacov: taxForm.r037_pocetMesiacov.toFixed(),
    }
    form.dokument.telo.r112 = taxForm.r112.toFixed(2)
    form.dokument.telo.r115 = taxForm.r115.toFixed(2)
  }
  /** SECTION Employed */
  if (taxForm.employed) {
    form.dokument.telo.r38 = taxForm.r038.toFixed(2)
    form.dokument.telo.r39 = taxForm.r039.toFixed(2)
    form.dokument.telo.r40 = taxForm.r040.toFixed(2)
    form.dokument.telo.socZdravPoistenie.pr8 = taxForm.r039.toFixed(2)
  }
  form.dokument.telo.r41 = taxForm.r041.toFixed(2)
  form.dokument.telo.r42 = taxForm.r042.toFixed(2)
  form.dokument.telo.r43 = taxForm.r043.toFixed(2)
  form.dokument.telo.r47 = taxForm.r047.toFixed(2)
  form.dokument.telo.r55 = taxForm.r055.toFixed(2)
  form.dokument.telo.r57 = taxForm.r057.toFixed(2)

  form.dokument.telo.r72 = taxForm.r072_pred_znizenim.toFixed(2)
  form.dokument.telo.r73 = taxForm.r073.toFixed(2)

  form.dokument.telo.r77 = taxForm.r077_nezdanitelna_cast.toFixed(2)
  form.dokument.telo.r78 = taxForm.r078_zaklad_dane_z_prijmov.toFixed(2)
  form.dokument.telo.r80 = taxForm.r080_zaklad_dane_celkovo.toFixed(2)
  form.dokument.telo.r81 = taxForm.r081.toFixed(2)
  form.dokument.telo.r90 = taxForm.r090.toFixed(2)
  form.dokument.telo.r105 = taxForm.r105_dan.toFixed(2)
  form.dokument.telo.r106 = decimalToString(taxForm.r106)

  form.dokument.telo.r107 = taxForm.r107.toFixed(2)
  form.dokument.telo.r108 = decimalToString(taxForm.r108)
  form.dokument.telo.r109 = decimalToString(taxForm.r109)
  form.dokument.telo.r110 = decimalToString(taxForm.r110)

  form.dokument.telo.r113 = taxForm.r113.toFixed(2)
  form.dokument.telo.r114 = ''
  form.dokument.telo.r120 = decimalToString(taxForm.r120)

  form.dokument.telo.r122 = decimalToString(taxForm.r122)

  form.dokument.telo.r125 = taxForm.r125_dan_na_uhradu.toFixed(2)
  form.dokument.telo.r126 = decimalToString(taxForm.r126_danovy_preplatok)

  /** SECTION 2 percent */
  form.dokument.telo.neuplatnujem = boolToString(
    !taxForm.XIIoddiel_uplatnujem2percenta,
  )

  if (taxForm.XIIoddiel_uplatnujem2percenta && taxForm.r142) {
    form.dokument.telo.r141 = taxForm.r141.toFixed(2)
    form.dokument.telo.splnam3per = boolToString(taxForm.splnam3per)
    form.dokument.telo.r142 = {
      ...taxForm.r142,
      obchMeno: {
        riadok: [taxForm.r142.obchMeno],
      },
      psc: taxForm.r142.psc.replace(' ', ''),
      suhlasZaslUdaje: boolToString(taxForm.r142.suhlasZaslUdaje),
    }
  }

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

  form.dokument.telo.socZdravPoistenie.pr11 = taxForm.priloha3_r11_socialne.toFixed(
    2,
  )
  form.dokument.telo.socZdravPoistenie.pr13 = taxForm.priloha3_r13_zdravotne.toFixed(
    2,
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
