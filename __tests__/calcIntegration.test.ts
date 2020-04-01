/// <reference types="jest" />
// import { xml2json } from 'xml-js';
import { promises as fs } from 'fs'
import { parseStringPromise } from 'xml2js'
import { convertToXML, convertToJson } from '../src/lib/xml/xmlConverter'
import { calculate } from '../src/lib/calculation'
import { TaxFormUserInput } from '../src/types/TaxFormUserInput'
import { PostponeUserInput } from '../src/types/PostponeUserInput'
import {
  convertPostponeToXML,
  convertPostponeToJson,
} from '../src/lib/postpone/postponeConverter'

const WRITE_FILES = false

const comparable = (xml: string) =>
  parseStringPromise(xml, { trim: true, normalize: true, normalizeTags: true })

const stringify = (object: object) => JSON.stringify(object, null, 2)
describe('calcIntergration', () => {
  ;[
    'base',
    'complete',
    'completeDecimal',
    'withPartner',
    'withEmployment',
    'withPension',
    'withMortgage',
    'withChildren',
    'with2percent',
    'withSpa',
  ].forEach((testCase) => {
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

      const taxForm = calculate(input)

      const outputXml = convertToXML(taxForm)

      if (WRITE_FILES) {
        const outputJson = convertToJson(taxForm)
        fs.writeFile(
          `${__dirname}/testCases/${testCase}TaxForm.output.json`,
          stringify(taxForm),
        )
        fs.writeFile(`${__dirname}/testCases/${testCase}.output.xml`, outputXml)
        fs.writeFile(
          `${__dirname}/testCases/${testCase}.output.json`,
          stringify(outputJson),
        )
      }

      const result = await comparable(outputXml)
      const expected = await comparable(testCaseValidatedXML.toString())

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
          `${__dirname}/testCases/postpone/${testCase}.output.json`,
          stringify(convertPostponeToJson(input)),
        )
        fs.writeFile(
          `${__dirname}/testCases/postpone/${testCase}.output.xml`,
          outputXml,
        )
      }

      const result = await comparable(outputXml)
      const expected = await comparable(testCaseValidatedXML.toString())

      return expect(result).toStrictEqual(expected)
    })
  })
})
