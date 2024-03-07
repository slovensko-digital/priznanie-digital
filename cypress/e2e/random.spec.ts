import Decimal from 'decimal.js'
import { TaxFormUserInput } from '../../src/types/TaxFormUserInput'
import { EmployedUserInput } from '../../src/types/PageUserInputs'
import { TAX_YEAR } from '../../src/lib/calculation'
import { formSuccessful } from './executeCase'


const randomFromRange = (min: number, max: number) => {
  const minD = new Decimal(min)
  const maxD = new Decimal(max)
  return (Decimal.random().times(maxD.minus(minD))).plus(minD)
}

const randomFromRangeString = (min: number, max: number) => {
  return randomFromRange(min, max).toFixed(2)
}

const randomInput = (): TaxFormUserInput => {
  const employed = Math.random() > 0.5
  const hasChildren = Math.random() > 0.5
  const partner = Math.random() > 0.7
  const rent = Math.random() > 0.5
  const uroky = Math.random() > 0.5

  let input: TaxFormUserInput = {
    t1r10_prijmy: randomFromRangeString(0, 100000),
    priloha3_r11_socialne: randomFromRangeString(0, 100000),
    priloha3_r13_zdravotne: randomFromRangeString(0, 100000),
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
    uhrnPovinnehoPoistnehoNaZdravotnePoistenie: randomFromRangeString(0, 100000),
    udajeODanovomBonuseNaDieta: randomFromRangeString(0, 100000),
    uhrnPreddavkovNaDan: randomFromRangeString(0, 100000),
  }

  if (employed) {
    input = { ...input, ...zamestnanie }
  }

  if (hasChildren) {
    // const childrenCount = randomFromRange(1, 7).round().toNumber()
    // Array.from({ length: childrenCount }).forEach((value, index) => {
    //   input.children.push({
    //     id: index,
    //     priezviskoMeno: 'Fake Name',
    //     rodneCislo: string
    //     wholeYear: boolean
    //     monthFrom: string
    //     monthTo: string
    //   })
    // })
  }

  if (partner) {
    input = {
      ...input,
      r031_priezvisko_a_meno: 'Partner Fake',
      r031_rodne_cislo: '9609226286',
      r032_partner_pocet_mesiacov: randomFromRange(1, 12).round().toNumber().toString(),
      r032_partner_vlastne_prijmy: randomFromRangeString(0, 10000),
      r032_uplatnujem_na_partnera: true,
      partner_spolocna_domacnost: true,
      partner_podmienky: { '1': true }
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
      vyskaOslobodenia: prilezitostnaCinnost ? randomFromRangeString(0, 500) : '500',
    }
  }

  if (uroky) {
    const rok = randomFromRangeString(TAX_YEAR - 5, TAX_YEAR)
    input = {
      ...input,
      r035_uplatnuje_uroky: true,
      uroky_rok_uzatvorenia: rok,
      uroky_zaciatok_urocenia_den: '21',
      uroky_zaciatok_urocenia_mesiac: '8',
      uroky_zaciatok_urocenia_rok: rok,
      uroky_dalsi_dlznik: true,
      uroky_pocet_dlznikov: '2',
      r035_zaplatene_uroky: randomFromRangeString(0, 9999),
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
      cy.log(JSON.stringify(input, null, 2))
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
        }).then(() => {
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