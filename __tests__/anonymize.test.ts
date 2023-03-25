import { anoymizeChild } from "../src/components/Feedback"

describe('anonymize', () => {
    describe('#annoymizeChild', () => {
        const scenarios = [
            { input: {
                id: 1,
                priezviskoMeno: '',
                rodneCislo: '901006 / 6472',

                wholeYear: false,
                monthFrom: '0',
                monthTo: '11',
              }, month: 10, year: 1990 },
              { input: {
                id: 1,
                priezviskoMeno: '',
                rodneCislo: '050426 / 9744',
              
                wholeYear: false,
                monthFrom: '0',
                monthTo: '11',
              }, month: 4, year: 2005 },
              { input: {
                id: 1,
                priezviskoMeno: '',
                rodneCislo: '705426 / 0169',
              
                wholeYear: false,
                monthFrom: '0',
                monthTo: '11',
              }, month: 4, year: 1970 },
              { input: {
                id: 1,
                priezviskoMeno: '',
                rodneCislo: '185717 / 4924',
              
                wholeYear: false,
                monthFrom: '0',
                monthTo: '11',
              }, month: 7, year: 2018 },
              { input: {
                id: 1,
                priezviskoMeno: '',
                rodneCislo: '646118 / 6369',
              
                wholeYear: false,
                monthFrom: '0',
                monthTo: '11',
              }, month: 11, year: 1964 },
        ]

        scenarios.forEach(({ input, month, year }) => {
            it(`From personalID ${input.rodneCislo} get month ${month} and year ${year}`, () => {
                const anonym = anoymizeChild(input)
                expect(anonym.mesiacNarodenia).toBe(month)
                expect(anonym.rokNarodenia).toBe(year)
                expect(anonym.rodneCislo).toBe("anon")
            })
        })
    })
})