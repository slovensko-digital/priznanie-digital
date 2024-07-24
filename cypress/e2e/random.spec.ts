import Decimal from 'decimal.js'
import { TaxFormUserInput } from '../../src/types/TaxFormUserInput'
import { EmployedUserInput } from '../../src/types/PageUserInputs'
import { PARTNER_MAX_ODPOCET, TAX_YEAR } from '../../src/lib/calculation'
import { formSuccessful } from './executeCase'
import { generateBirthId } from '../../src/lib/rodneCisloGenerator'

const randomFromRange = (min: number, max: number) => {
  const minD = new Decimal(min)
  const maxD = new Decimal(max)
  return Decimal.random().times(maxD.minus(minD)).plus(minD)
}

const randomFromRangeString = (min: number, max: number) => {
  return randomFromRange(min, max).toFixed(2)
}

const randomInput = (): TaxFormUserInput => {
  const employed = Math.random() > 0.5
  const hasChildren = Math.random() > 0.2
  const partner = Math.random() > 0.7
  const rent = Math.random() > 0.3
  const uroky = Math.random() > 0.3
  const dochodok = Math.random() > 0.2
  const prijmy = randomFromRange(0, 100000)
  const socPercent = randomFromRange(0, 40).div(100).toFixed(2)
  const zdravPercent = randomFromRange(0, 40).div(100).toFixed(2)

  let input: TaxFormUserInput = {
    t1r10_prijmy: prijmy.toFixed(2),
    priloha3_r11_socialne: prijmy.times(socPercent).toFixed(2),
    priloha3_r13_zdravotne: prijmy.times(zdravPercent).toFixed(2),
    zaplatenePreddavky: randomFromRangeString(0, 100000),
    employed,
    hasChildren,
    children: [],
    r005_meno: 'Fake',
    r004_priezvisko: 'Name',
    r001_dic: '233123123',
    r003_nace: '62010 - Počítačové programovanie',
    r007_ulica: 'Mierova',
    r008_cislo: '4',
    r009_psc: '82105',
    r010_obec: 'Bratislava 3',
    r011_stat: 'Slovensko',
    datum: '22.02.2020',
  }

  const zamestnanie: EmployedUserInput = {
    uhrnPrijmovOdVsetkychZamestnavatelov: randomFromRangeString(0, 100000),
    uhrnPovinnehoPoistnehoNaSocialnePoistenie: randomFromRangeString(0, 100000),
    uhrnPovinnehoPoistnehoNaZdravotnePoistenie: randomFromRangeString(
      0,
      100000,
    ),
    udajeODanovomBonuseNaDieta: randomFromRangeString(0, 100000),
    uhrnPreddavkovNaDan: randomFromRangeString(0, 100000),
  }

  if (employed) {
    input = { ...input, ...zamestnanie }
  }

  if (hasChildren) {
    const childrenCount = randomFromRange(1, 7).round().toNumber()
    const partnerChildBonus = Math.random() > 0.3
    Array.from({ length: childrenCount }).forEach((_, index) => {
      const age = randomFromRange(0, 25).round().toNumber()
      const month = randomFromRange(0, 11).round().toNumber()
      const birthDate = new Date(TAX_YEAR - age, month, 15)
      const gender = Math.random() > 0.5
      let wholeYear = Math.random() > 0.5

      let monthFrom = 0
      let monthTo = 11

      if (!wholeYear || age === 0 || age === 25) {
        if (age === 0) {
          monthFrom = randomFromRange(month, 11).round().toNumber()
          monthTo = randomFromRange(monthFrom, 11).round().toNumber()
          wholeYear = false
        } else if (age === 25) {
          monthFrom = randomFromRange(0, month).round().toNumber()
          monthTo = randomFromRange(monthFrom, month).round().toNumber()
          wholeYear = false
        } else {
          monthFrom = randomFromRange(0, 11).round().toNumber()
          monthTo = randomFromRange(monthFrom, 11).round().toNumber()
        }
      }

      input.children.push({
        id: index,
        priezviskoMeno: `Fake Child ${index}`,
        rodneCislo: generateBirthId(birthDate, gender ? 'FEMALE' : 'MALE').pure,
        wholeYear,
        monthFrom: monthFrom.toString(),
        monthTo: monthTo.toString(),
      })
    })

    if (partnerChildBonus) {
      const randomKid =
        input.children[
          randomFromRange(0, childrenCount - 1)
            .round()
            .toNumber()
        ]
      input = {
        ...input,
        partner_bonus_na_deti: true,
        r034_priezvisko_a_meno: 'Beth Smith',
        r034_rodne_cislo: '975917/1565',
        partner_bonus_na_deti_od: randomKid.wholeYear
          ? '0'
          : randomKid.monthFrom.toString(),
        partner_bonus_na_deti_do: randomKid.wholeYear
          ? '11'
          : randomKid.monthTo.toString(),
        partner_bonus_na_deti_typ_prijmu: '1',
        r034a: randomFromRangeString(0, 100000),
      }
    }
  }

  if (partner) {
    input = {
      ...input,
      r031_priezvisko_a_meno: 'Partner Fake',
      r031_rodne_cislo: '9609226286',
      r032_partner_pocet_mesiacov: randomFromRange(1, 12)
        .round()
        .toNumber()
        .toString(),
      r032_partner_vlastne_prijmy: randomFromRangeString(
        0,
        PARTNER_MAX_ODPOCET,
      ),
      r032_uplatnujem_na_partnera: true,
      partner_spolocna_domacnost: true,
      partner_podmienky: { '1': true },
    }
  }

  if (rent) {
    const prilezitostnaCinnost = Math.random() > 0.5
    input = {
      ...input,
      rent: true,
      vyskaPrijmovZPrenajmu: randomFromRangeString(0, 10000),
      vydavkyZPrenajmu: randomFromRangeString(0, 10000),
      prenajomPrijemZPrilezitostnejCinnosti: prilezitostnaCinnost,
      vyskaOslobodenia: prilezitostnaCinnost
        ? randomFromRangeString(0, 500)
        : '500',
    }
  }

  if (uroky) {
    const rok = randomFromRange(TAX_YEAR - 5, TAX_YEAR)
      .round()
      .toNumber()
      .toString()
    const mesiac = randomFromRange(1, 12).round().toNumber().toString()
    const pocetDlznikov = randomFromRange(1, 10).round().toNumber()
    input = {
      ...input,
      r035_uplatnuje_uroky: true,
      uroky_rok_uzatvorenia: rok,
      uroky_zaciatok_urocenia_den: '21',
      uroky_zaciatok_urocenia_mesiac: mesiac,
      uroky_zaciatok_urocenia_rok: rok,
      uroky_dalsi_dlznik: pocetDlznikov > 1,
      uroky_pocet_dlznikov: pocetDlznikov.toString(),
      r035_zaplatene_uroky: randomFromRangeString(0, 9999),
      uroky_dalsi_uver_uplatnuje: false,
      uroky_splnam_vek_kriteria: true,
      uroky_splnam_prijem: true,
    }
  }

  if (dochodok) {
    input = {
      ...input,
      platil_prispevky_na_dochodok: true,
      zaplatene_prispevky_na_dochodok: randomFromRangeString(0, 180),
    }
  }

  return input
}

describe('Random inputs', () => {
  it('should pass', () => {
    expect(Number(randomFromRange(1, 10))).to.be.within(1, 10)
  })
  Array.from({ length: 50 }).forEach((_, i) => {
    it(`should pass random input ${i}`, (done) => {
      const input = randomInput()
      cy.writeFile(`cypress/downloads/randomInput${i}.json`, input)
      const filePath = `cypress/downloads/randomOutput${i}.xml`
      cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/xml',
        body: {
          taxFormUserInput: input,
        },
      })
        .then((response) => {
          cy.writeFile(filePath, response.body, 'utf-8')
        })
        .then(() => {
          /**  Validate our results with the FS form */
          cy.visit('http://localhost:3000/form/form.572.html')

          const stub = cy.stub()
          cy.on('window:alert', stub)

          cy.get('#form-button-load').click()
          cy.get('#form-buttons-load-dialog > input').selectFile(filePath)

          cy.get('#form-buttons-load-dialog-confirm > .ui-button-text').click()
          cy.get('#cmbDic1').should('have.value', input.r001_dic) // validate the form has laoded by checking DIC value
          cy.get('#form-button-validate').click().should(formSuccessful(stub))
          cy.get('#errorsContainer')
            .should((el) => expect(el.text()).to.be.empty)
            .then(() => done())
        })
    })
  })
})
