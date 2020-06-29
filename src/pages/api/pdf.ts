import { NextApiRequest, NextApiResponse } from 'next'
import hummus from 'hummus'
import { TaxForm } from '../../types/TaxForm'
import streams from 'memory-streams'

const FIRST_COLUMN = 31.5
const BOX_WIDTH = 14.4
const PDF_ASSETS_PATH = `${process.cwd()}/src/pdf-assets`

class PdfTemplate {
  pdfWriter: any
  pageModifier: any
  fontOptions = {
    font: null,
    size: 12,
    colorspace: 'gray',
    color: 0x00,
  }
  currentPage: number
  dic: string
  writer = new streams.WritableStream()

  constructor(res?: NextApiResponse) {
    this.pdfWriter = hummus.createWriterToModify(
      new hummus.PDFRStreamForFile(`${PDF_ASSETS_PATH}/template2019.pdf`),
      res
        ? new hummus.PDFStreamForResponse(res)
        : new hummus.PDFStreamForResponse(this.writer),
    )
    this.fontOptions.font = this.pdfWriter.getFontForFile(
      `${PDF_ASSETS_PATH}/Work_Sans/WorkSans-Light.ttf`,
    )
  }

  openPage(pageNumber) {
    this.currentPage = pageNumber
    this.pageModifier = new hummus.PDFPageModifier(this.pdfWriter, pageNumber)
  }

  writeToBoxes(
    x: number,
    y: number,
    text: string = '',
    maxLength: number = 999,
  ) {
    const context = this.pageModifier.startContext().getContext()

    for (let i = 0; i < Math.min(maxLength, text.length); i += 1) {
      const letter = text[i]

      const { width } = this.fontOptions.font.calculateTextDimensions(
        letter,
        this.fontOptions.size,
      )

      const offset = x + i * BOX_WIDTH + (12 - width) / 2
      context.writeText(letter, offset, y, this.fontOptions)
    }
  }

  writeNumberToBoxes(x: number, y: number, number: number, smallGap = false) {
    const [whole, decimal] = number
      ? `${number.toFixed(2)}`.split('.')
      : ['', '']
    const gap = smallGap ? 9 : 15
    this.writeToBoxes(x - whole.length * BOX_WIDTH, y, whole)
    this.writeToBoxes(x + gap, y, decimal)
  }

  write(x: number, y: number, text: string = '', size?: number) {
    this.pageModifier
      .startContext()
      .getContext()
      .writeText(
        text,
        x,
        y,
        size ? { ...this.fontOptions, size } : this.fontOptions,
      )
  }

  nextPage() {
    this.currentPage += 1
    if (this.currentPage > 0) {
      this.commitPage()
    }
    this.openPage(this.currentPage)

    if (this.dic) {
      this.writeToBoxes(FIRST_COLUMN + 216, 800, this.dic)
    }
  }

  commitPage() {
    this.pageModifier.endContext().writePage()
  }

  end() {
    this.pdfWriter.end()
  }
}

export const buildPdf = (form: TaxForm, res?: NextApiResponse) => {
  const tpl = new PdfTemplate(res)

  tpl.dic = form.r001_dic ? `${form.r001_dic}` : ''

  // ***** PAGE 1
  tpl.openPage(0)

  // r001_dic
  tpl.writeToBoxes(FIRST_COLUMN, 682, tpl.dic)

  // Druh daňového priznania - daňové priznanie
  tpl.write(FIRST_COLUMN + 248, 685, 'x')

  // rok
  tpl.writeToBoxes(FIRST_COLUMN + 487, 690, '19')

  // r003_nace

  const nace = `${form.r003_nace}`.match(/^(\d+) - (.*)$/)
  const naceOne = nace ? nace[1].slice(0, 2) : ''
  const naceTwo = nace ? nace[1].slice(2, 2) : ''
  const naceThree = nace ? nace[1].slice(4) : ''

  tpl.writeToBoxes(FIRST_COLUMN, 608, naceOne)
  tpl.writeToBoxes(FIRST_COLUMN + 37, 608, naceTwo)
  tpl.writeToBoxes(FIRST_COLUMN + 72, 608, naceThree)

  tpl.write(FIRST_COLUMN + 146, 612, nace ? nace[2] : '')

  // r004_priezvisko
  tpl.writeToBoxes(FIRST_COLUMN, 548, form.r004_priezvisko, 16)

  // r005_meno
  tpl.writeToBoxes(FIRST_COLUMN + 237, 548, form.r005_meno, 11)

  // r006_titul
  tpl.write(FIRST_COLUMN + 410, 548, form.r006_titul, 11)

  // r006_titul_za
  tpl.write(FIRST_COLUMN + 490, 548, form.r006_titul_za, 11)

  // r007_ulica
  tpl.writeToBoxes(FIRST_COLUMN, 502, form.r007_ulica, 28)

  // r008_cislo
  tpl.writeToBoxes(FIRST_COLUMN + 418, 502, form.r008_cislo, 8)

  // r009_psc
  tpl.writeToBoxes(FIRST_COLUMN, 466, form.r009_psc)

  // r010_obec
  tpl.writeToBoxes(FIRST_COLUMN + 79, 466, form.r010_obec, 20)

  // r011_stat
  tpl.writeToBoxes(FIRST_COLUMN + 375, 466, form.r011_stat, 11)

  // ***** PAGE 2
  tpl.nextPage()

  if (form.r032_uplatnujem_na_partnera || form.r033_partner_kupele) {
    // r031_priezvisko_a_meno
    tpl.write(FIRST_COLUMN + 10, 563, form.r031_priezvisko_a_meno)

    // r031_rodne_cislo
    const rodneCislo = `${form.r031_rodne_cislo}`.match(/(\d{6})\/?(\d{4})/)
    tpl.writeToBoxes(FIRST_COLUMN + 374, 563, rodneCislo ? rodneCislo[1] : '')
    tpl.writeToBoxes(FIRST_COLUMN + 473, 563, rodneCislo ? rodneCislo[2] : '')
  }

  if (form.r032_uplatnujem_na_partnera) {
    // r032_uplatnujem_na_partnera
    tpl.write(FIRST_COLUMN + 25, 540, 'x')

    // r032_partner_vlastne_prijmy
    tpl.writeNumberToBoxes(
      FIRST_COLUMN + 404,
      538,
      form.r032_partner_vlastne_prijmy.toNumber(),
    )

    // r032_partner_pocet_mesiacov
    tpl.writeToBoxes(
      FIRST_COLUMN + 502,
      538,
      `${form.r032_partner_pocet_mesiacov}`.padStart(2, ' '),
    )
  }

  if (form.r033_partner_kupele) {
    // r033_partner_kupele
    tpl.write(FIRST_COLUMN + 25, 515, 'x')

    // r033_partner_kupele_uhrady
    tpl.writeNumberToBoxes(
      FIRST_COLUMN + 487,
      513,
      form.r033_partner_kupele_uhrady.toNumber(),
    )
  }

  // r034 - deti
  if (form.r034) {
    form.r034.slice(0, 4).forEach((child, index) => {
      const rowSize = index * 29

      // priezviskoMeno
      tpl.write(FIRST_COLUMN + 4, 432 - rowSize, child.priezviskoMeno, 10)

      // rodneCislo
      const rodneCislo = `${child.rodneCislo}`.match(/(\d{6})\/?(\d{4})/)
      tpl.writeToBoxes(
        FIRST_COLUMN + 134,
        432 - rowSize,
        rodneCislo ? rodneCislo[1] : '',
      )
      tpl.writeToBoxes(
        FIRST_COLUMN + 234,
        432 - rowSize,
        rodneCislo ? rodneCislo[2] : '',
      )

      if (child.kupelnaStarostlivost) {
        // kupelnaStarostlivost
        tpl.write(FIRST_COLUMN + 302, 429 - rowSize, 'x')
      }

      // m00
      if (child.m00) {
        tpl.write(FIRST_COLUMN + 324, 429 - rowSize, 'x')
      } else {
        // m01
        if (child.m01) {
          tpl.write(FIRST_COLUMN + 347, 429 - rowSize, 'x')
        }

        // m02
        if (child.m02) {
          tpl.write(FIRST_COLUMN + 362, 429 - rowSize, 'x')
        }

        // m03
        if (child.m03) {
          tpl.write(FIRST_COLUMN + 378, 429 - rowSize, 'x')
        }

        // m04
        if (child.m04) {
          tpl.write(FIRST_COLUMN + 394, 429 - rowSize, 'x')
        }

        // m05
        if (child.m05) {
          tpl.write(FIRST_COLUMN + 410, 429 - rowSize, 'x')
        }

        // m06
        if (child.m06) {
          tpl.write(FIRST_COLUMN + 426, 429 - rowSize, 'x')
        }

        // m07
        if (child.m07) {
          tpl.write(FIRST_COLUMN + 442, 429 - rowSize, 'x')
        }

        // m08
        if (child.m08) {
          tpl.write(FIRST_COLUMN + 458, 429 - rowSize, 'x')
        }

        // m09
        if (child.m09) {
          tpl.write(FIRST_COLUMN + 473, 429 - rowSize, 'x')
        }

        // m10
        if (child.m10) {
          tpl.write(FIRST_COLUMN + 490, 429 - rowSize, 'x')
        }

        // m11
        if (child.m11) {
          tpl.write(FIRST_COLUMN + 505, 429 - rowSize, 'x')
        }

        // m12
        if (child.m12) {
          tpl.write(FIRST_COLUMN + 521, 429 - rowSize, 'x')
        }
      }
    })
  }

  // r034 - viac ako 4 deti?
  if (form.r034 && form.r034.length > 4) {
    tpl.write(FIRST_COLUMN + 25, 324, 'x')
  }

  if (form.r034 && form.r034.some((child) => child.kupelnaStarostlivost)) {
    // r036_deti_kupele
    tpl.writeNumberToBoxes(
      FIRST_COLUMN + 396,
      303,
      form.r036_deti_kupele.toNumber(),
    )
  }

  if (form.r037_uplatnuje_uroky) {
    // r037_uplatnuje_uroky
    tpl.write(FIRST_COLUMN + 21, 110, 'x')

    // r037_zaplatene_uroky
    tpl.writeNumberToBoxes(
      FIRST_COLUMN + 409,
      108,
      form.r037_zaplatene_uroky.toNumber(),
    )

    // r032_partner_pocet_mesiacov
    tpl.writeToBoxes(
      FIRST_COLUMN + 504,
      108,
      `${form.r032_partner_pocet_mesiacov}`.padStart(2, ' '),
    )
  }

  // ***** PAGE 3
  tpl.nextPage()

  // r038 - Úhrn príjmov od všetkých zamestnávateľov
  tpl.writeNumberToBoxes(FIRST_COLUMN + 397, 737, form.r038.toNumber())

  // r039 - Úhrn povinného poistného
  tpl.writeNumberToBoxes(FIRST_COLUMN + 397, 686, form.r039.toNumber())

  // r040 - Základ dane (čiastkový základ dane)
  tpl.writeNumberToBoxes(FIRST_COLUMN + 397, 660, form.r040.toNumber())

  // t1r2_prijmy - r. 2
  tpl.writeNumberToBoxes(
    FIRST_COLUMN + 340,
    483,
    form.t1r2_prijmy.toNumber(),
    true,
  )

  // t1r10_vydavky - r. 2
  tpl.writeNumberToBoxes(
    FIRST_COLUMN + 496,
    483,
    form.t1r10_vydavky.toNumber(),
    true,
  )

  // t1r2_prijmy - spolu r. 1 až 9
  tpl.writeNumberToBoxes(
    FIRST_COLUMN + 340,
    222,
    form.t1r2_prijmy.toNumber(),
    true,
  )

  // t1r10_vydavky - spolu r. 1 až 9
  tpl.writeNumberToBoxes(
    FIRST_COLUMN + 496,
    222,
    form.t1r10_vydavky.toNumber(),
    true,
  )

  // ***** PAGE 4
  tpl.nextPage()

  // Uplatňujem výdavky percentom z príjmov podľa § 6 ods. 10 zákona
  tpl.write(FIRST_COLUMN + 12, 734, 'x')

  // priloha3_r08_poistne
  tpl.writeNumberToBoxes(
    FIRST_COLUMN + 397,
    708,
    form.priloha3_r08_poistne.toNumber(),
  )

  // r041
  tpl.writeNumberToBoxes(FIRST_COLUMN + 395, 110, form.r041.toNumber())

  // r042
  tpl.writeNumberToBoxes(FIRST_COLUMN + 395, 86, form.r042.toNumber())

  // ***** PAGE 5
  tpl.nextPage()

  // r043
  tpl.writeNumberToBoxes(FIRST_COLUMN + 400, 770, form.r043.toNumber())

  // r047
  tpl.writeNumberToBoxes(FIRST_COLUMN + 400, 656, form.r047.toNumber())

  // r055
  tpl.writeNumberToBoxes(FIRST_COLUMN + 400, 400, form.r055.toNumber())

  // r057
  tpl.writeNumberToBoxes(FIRST_COLUMN + 400, 322, form.r057.toNumber())

  // ***** PAGE 6
  tpl.nextPage()

  // ***** PAGE 7
  tpl.nextPage()

  // ***** PAGE 8
  tpl.nextPage()

  // r072_pred_znizenim
  tpl.writeNumberToBoxes(
    FIRST_COLUMN + 390,
    501,
    form.r072_pred_znizenim.toNumber(),
  )

  // r073
  tpl.writeNumberToBoxes(FIRST_COLUMN + 390, 473, form.r073.toNumber())

  // r074_znizenie_partner
  tpl.writeNumberToBoxes(
    FIRST_COLUMN + 390,
    448,
    form.r074_znizenie_partner.toNumber(),
  )

  // 75 - ods. 10 - na preukázateľne zaplatené príspevky na doplnkové dôchodkové sporenie maximálne vo výške 180 eur
  if (form.platil_prispevky_na_dochodok) {
    tpl.writeNumberToBoxes(
      FIRST_COLUMN + 390,
      423,
      form.r075_zaplatene_prispevky_na_dochodok.toNumber(),
    )
  }

  // r076_kupele_spolu
  tpl.writeNumberToBoxes(
    FIRST_COLUMN + 390,
    386,
    form.r076_kupele_spolu.toNumber(),
  )

  // r076a_kupele_danovnik
  tpl.writeNumberToBoxes(
    FIRST_COLUMN + 390,
    358,
    form.r076a_kupele_danovnik.toNumber(),
  )

  // r076b_kupele_partner_a_deti
  tpl.writeNumberToBoxes(
    FIRST_COLUMN + 390,
    332,
    form.r076b_kupele_partner_a_deti.toNumber(),
  )

  // r077_nezdanitelna_cast
  tpl.writeNumberToBoxes(
    FIRST_COLUMN + 390,
    308,
    form.r077_nezdanitelna_cast.toNumber(),
  )

  // r078_zaklad_dane_z_prijmov
  tpl.writeNumberToBoxes(
    FIRST_COLUMN + 390,
    282,
    form.r078_zaklad_dane_z_prijmov.toNumber(),
  )

  // r080_zaklad_dane_celkovo
  tpl.writeNumberToBoxes(
    FIRST_COLUMN + 390,
    232,
    form.r080_zaklad_dane_celkovo.toNumber(),
  )

  // r081
  tpl.writeNumberToBoxes(FIRST_COLUMN + 390, 206, form.r081.toNumber())

  // ***** PAGE 9
  tpl.nextPage()

  // r090
  tpl.writeNumberToBoxes(FIRST_COLUMN + 396, 615, form.r090.toNumber())

  // r105_dan
  tpl.writeNumberToBoxes(FIRST_COLUMN + 396, 128, form.r105_dan.toNumber())

  // r106
  tpl.writeNumberToBoxes(FIRST_COLUMN + 396, 94, form.r106.toNumber())

  // r107
  tpl.writeNumberToBoxes(FIRST_COLUMN + 396, 70, form.r107.toNumber())

  // ***** PAGE 10
  tpl.nextPage()

  // r108
  tpl.writeNumberToBoxes(FIRST_COLUMN + 396, 770, form.r108.toNumber())

  // r109
  tpl.writeNumberToBoxes(FIRST_COLUMN + 396, 745, form.r109.toNumber())

  // r112
  tpl.writeNumberToBoxes(FIRST_COLUMN + 396, 668, form.r112.toNumber())

  // r113
  tpl.writeNumberToBoxes(FIRST_COLUMN + 396, 639, form.r113.toNumber())

  // r114
  tpl.writeNumberToBoxes(FIRST_COLUMN + 396, 610, form.r114.toNumber())

  // r115
  tpl.writeNumberToBoxes(FIRST_COLUMN + 396, 584, form.r115.toNumber())

  // r125_dan_na_uhradu
  tpl.writeNumberToBoxes(
    FIRST_COLUMN + 396,
    313,
    form.r125_dan_na_uhradu.toNumber(),
  )

  // r126_danovy_preplatok
  tpl.writeNumberToBoxes(
    FIRST_COLUMN + 396,
    271,
    form.r126_danovy_preplatok.toNumber(),
  )

  // ***** PAGE 11
  tpl.nextPage()

  // ***** PAGE 12
  tpl.nextPage()

  if (form.XIIoddiel_uplatnujem2percenta) {
    // r141
    tpl.writeNumberToBoxes(FIRST_COLUMN + 253, 720, form.r141.toNumber())

    // r142 - ico
    tpl.writeToBoxes(FIRST_COLUMN, 665, form.r142 ? form.r142.ico : '')

    // r142 - obchMeno
    const obchMeno = form.r142 ? form.r142.obchMeno : ''
    tpl.writeToBoxes(FIRST_COLUMN, 628, obchMeno.slice(0, 37), 37)
    if (obchMeno.length > 37) {
      tpl.writeToBoxes(FIRST_COLUMN, 602, obchMeno.slice(37, 74), 37)
    }

    // r142 - ulica
    tpl.writeToBoxes(FIRST_COLUMN, 558, form.r142 ? form.r142.ulica : '', 28)

    // r142 - cislo
    tpl.writeToBoxes(
      FIRST_COLUMN + 418,
      558,
      form.r142 ? form.r142.cislo : '',
      8,
    )

    // r142 - psc
    tpl.writeToBoxes(FIRST_COLUMN, 522, form.r142 ? form.r142.psc : '')

    // r142 - obec
    tpl.writeToBoxes(
      FIRST_COLUMN + 87,
      522,
      form.r142 ? form.r142.obec : '',
      31,
    )

    // r142 - suhlasZaslUdaje
    tpl.write(
      FIRST_COLUMN + 9,
      500,
      form.r142 && form.r142.suhlasZaslUdaje ? 'x' : '',
    )
  } else {
    tpl.write(FIRST_COLUMN + 8, 750, 'x') // neuplatnujem
  }

  // ***** PAGE 13
  tpl.nextPage()

  // r034 - viac ako 4 deti?
  if (form.r034 && form.r034.length > 4) {
    form.r034.slice(4).forEach((child, index) => {
      const rowSize = index * 31

      // priezviskoMeno
      tpl.write(FIRST_COLUMN + 6, 707 - rowSize, child.priezviskoMeno, 10)

      // rodneCislo
      tpl.write(
        FIRST_COLUMN + 220,
        707 - rowSize,
        `rodné číslo: ${child.rodneCislo}`,
      )

      if (child.kupelnaStarostlivost) {
        // kupelnaStarostlivost
        tpl.write(FIRST_COLUMN + 390, 707 - rowSize, 'kúpeľná starostlivosť: x')
      }

      if (child.m00) {
        tpl.write(FIRST_COLUMN + 220, 694 - rowSize, 'daňový bonus 1 - 12')
      } else {
        const months = [
          child.m01 ? '1' : null,
          child.m02 ? '2' : null,
          child.m03 ? '3' : null,
          child.m04 ? '4' : null,
          child.m05 ? '5' : null,
          child.m06 ? '6' : null,
          child.m07 ? '7' : null,
          child.m08 ? '8' : null,
          child.m09 ? '9' : null,
          child.m10 ? '10' : null,
          child.m11 ? '11' : null,
          child.m12 ? '12' : null,
        ]
        tpl.write(
          FIRST_COLUMN + 220,
          694 - rowSize,
          `daňový bonus ${months.filter((value) => !!value).join(', ')}`,
        )
      }
    })
  }

  if (
    form.mozeZiadatVratitDanovyBonusAleboPreplatok &&
    form.ziadamVratitDanovyBonusAleboPreplatok
  ) {
    const today = new Date()
    const day = `0${today.getDate()}`.slice(-2)
    const month = `0${today.getMonth() + 1}`.slice(-2)
    const year = `0${today.getFullYear()}`.slice(-2)

    tpl.write(FIRST_COLUMN + 9, 222, 'x')
    tpl.write(FIRST_COLUMN + 175, 154, 'x')
    tpl.writeToBoxes(FIRST_COLUMN + 41, 127, form.iban)
    tpl.writeToBoxes(FIRST_COLUMN + 41, 63, day)
    tpl.writeToBoxes(FIRST_COLUMN + 77, 63, month)
    tpl.writeToBoxes(FIRST_COLUMN + 140, 63, year)
  }

  // ***** PAGE 14-17
  tpl.nextPage()
  tpl.nextPage()
  tpl.nextPage()
  tpl.nextPage()

  tpl.commitPage()

  tpl.end()

  return tpl.writer
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const form: TaxForm = req.body

  if (!form) {
    return res.status(500).json({ error: 'invalid data' })
  }

  res.setHeader(
    'content-disposition',
    'attachment; filename=danove_priznanie.pdf',
  )
  res.writeHead(200, { 'Content-Type': 'application/pdf' })

  buildPdf(form, res)

  res.end()
}
