import { promises as fs } from 'fs'
import { parseStringPromise } from 'xml2js'
import { convertToXML } from '../src/features/summary/9-pokracovat/xml/xmlConverter'
import { calculate } from '../src/features/_shared/calculation/calculation'
import { TaxFormUserInput } from '../src/features/_shared/taxform/TaxFormUserInput'
import { PostponeUserInput } from '../src/features/_shared/pages/_types/PostponeUserInput'
import { convertPostponeToXML } from '../src/features/odklad/4-pokracovat/postpone/postponeConverter'
import { setDate } from '../src/features/_shared/_utils/utils'

// const WRITE_FILES = process.env.WRITE_FILES === 'yes'
const WRITE_FILES = false

const comparable = (xml: string) =>
  parseStringPromise(xml, { trim: true, normalize: true, normalizeTags: true })

const testCases = [
  'base',
  'withPartner',
  'withEmployment',
  'withPension',
  'withChildren',
  'with2percent',
  'with3percent',
  'withBonus',
  'withTaxReturn',
  'withEmploymentBonus',
  'withHighIncome',
  'bugReport1',
  // 'bugReport2',
  'bugReport3',
  'bugReport4',
  'complete',
  'completeDecimal',
]

describe.skip('calcIntergration', () => {
  testCases.forEach((testCase) => {
    test(testCase, async () => {
      const testCaseValidatedXML = await fs.readFile(
        `${__dirname}/testCases/${testCase}.xml`,
      )

      const inputModule = await import(`./testCases/${testCase}Input`)

      // Access named export
      const input: TaxFormUserInput = inputModule[`${testCase}Input`]

      if (!input) {
        throw new Error(`Could not load input: ${testCase}Input`)
      }

      const taxForm = calculate(setDate(input, new Date(2022, 0, 10)))
      const outputXml = convertToXML(taxForm)

      const result = await comparable(outputXml)
      const expected = await comparable(testCaseValidatedXML.toString())

      if (WRITE_FILES) {
        fs.writeFile(
          `${__dirname}/testCases/${testCase}-expected.json`,
          JSON.stringify(expected, null, 2),
        )
        fs.writeFile(
          `${__dirname}/testCases/${testCase}-result.json`,
          JSON.stringify(result, null, 2),
        )
        fs.writeFile(
          `${__dirname}/testCases/${testCase}-outputXml.json`,
          JSON.stringify(outputXml, null, 2),
        )
      }

      return expect(result).toStrictEqual(expected)
    })
  })
})

describe('postpone', () => {
  ;['basic', 'foreignIncome'].forEach((testCase) => {
    test(testCase, async () => {
      const testCaseValidatedXML = await fs.readFile(
        `${__dirname}/testCases/postpone/${testCase}.xml`,
      )

      const inputModule = await import(`./testCases/postpone/${testCase}Input`)

      // Access named export
      const input: PostponeUserInput = inputModule[`${testCase}Input`]

      const outputXml = convertPostponeToXML(input)

      if (WRITE_FILES) {
        fs.writeFile(
          `${__dirname}/testCases/postpone/${testCase}.xml`,
          outputXml,
        )
      }

      const result = await comparable(outputXml)
      const expected = await comparable(testCaseValidatedXML.toString())

      return expect(result).toStrictEqual(expected)
    })
  })
})
