import { promises as fs } from 'fs'
import { parseStringPromise } from 'xml2js'
import { convertToXML } from '../src/lib/xml/xmlConverter'
import { calculate } from '../src/lib/calculation'
import { TaxFormUserInput } from '../src/types/TaxFormUserInput'
import { PostponeUserInput } from '../src/types/PostponeUserInput'
import { convertPostponeToXML } from '../src/lib/postpone/postponeConverter'
import { setDate } from '../src/lib/utils'

// const WRITE_FILES = process.env.WRITE_FILES === 'yes'
const WRITE_FILES = false

const comparable = (xml: string) =>
  parseStringPromise(xml, { trim: true, normalize: true, normalizeTags: true })

const testCases = [
  'base',
  // 'complete',
  // 'completeDecimal',
  'withPartner',
  'withEmployment',
  'withPension',
  'withChildren',
  'with2percent',
  'with3percent',
  // 'withBonus',
  // 'withTaxReturn',
  // 'withEmploymentBonus',
  // 'withHighIncome',
  // 'withSpaNoPartnerNoChildren',
  // 'bugReport1',
  // 'bugReport2',
  // 'bugReport3',
  // 'bugReport4',
]

describe('calcIntergration', () => {
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
