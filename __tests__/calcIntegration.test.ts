import { promises as fs, readdirSync } from 'fs'
import { parseStringPromise } from 'xml2js'
import { convertToXML } from '../src/lib/xml/xmlConverter'
import { calculate, TAX_YEAR } from '../src/lib/calculation'
import { TaxFormUserInput } from '../src/types/TaxFormUserInput'
import { PostponeUserInput } from '../src/types/PostponeUserInput'
import { convertPostponeToXML } from '../src/lib/postpone/postponeConverter'
import { setDate } from '../src/lib/utils'

// const WRITE_FILES = process.env.WRITE_FILES === 'yes'
const WRITE_FILES = false

const comparable = (xml: string) =>
  parseStringPromise(xml, { trim: true, normalize: true, normalizeTags: true })

const testCases = readdirSync('./__tests__/testCases/', { withFileTypes: true })
  .filter((item) => !item.isDirectory())
  .map((item) => item.name)
  .map((item) => item.replace('Input.ts', ''))

describe('calcIntergration', () => {
  testCases.forEach((testCase) => {
    test(testCase, async () => {
      const inputModule = await import(`./testCases/${testCase}Input`)

      // Access named export
      const input: TaxFormUserInput = inputModule[`${testCase}Input`]

      if (!input) {
        throw new Error(`Could not load input: ${testCase}Input`)
      }

      const taxForm = calculate(setDate(input, new Date(2024, 1, 10)))
      convertToXML(taxForm)

      // here are no tests for the output, this test are used mainly for coverage
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

      const outputXml = convertPostponeToXML(
        setDate(input, new Date(TAX_YEAR + 1, 0, 1)),
      )

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
