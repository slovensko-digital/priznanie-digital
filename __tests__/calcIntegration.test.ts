import { promises as fs, readdirSync } from 'fs'
import { parseStringPromise } from 'xml2js'
import { convertToXML, convertToJson } from '../src/lib/xml/xmlConverter'
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

describe('vydavkyPar6ods10_ods1a2 field', () => {
  test('should be set to "1" when t1r10_prijmy > 0 (self-employed)', async () => {
    const inputModule = await import('./testCases/completeInput')
    const input: TaxFormUserInput = inputModule.completeInput

    const taxForm = calculate(setDate(input, new Date(2024, 1, 10)))
    const jsonForm = convertToJson(taxForm)

    expect(jsonForm.dokument.telo.vydavkyPar6ods10_ods1a2).toBe('1')
  })

  test('should remain "0" when t1r10_prijmy = 0 (not self-employed)', async () => {
    const inputModule = await import('./testCases/noPrijemZoZivnostiInput')
    const input: TaxFormUserInput = inputModule.noPrijemZoZivnostiInput

    const taxForm = calculate(setDate(input, new Date(2024, 1, 10)))
    const jsonForm = convertToJson(taxForm)

    expect(jsonForm.dokument.telo.vydavkyPar6ods10_ods1a2).toBe('0')
  })
})

describe('r146 and r146a fields in XML', () => {
  test('should be filled when hasChildren is "yes"', async () => {
    const inputModule = await import('./testCases/withChildrenInput')
    const input: TaxFormUserInput = {
      ...inputModule.withChildrenInput,
      hasChildren: 'yes',
    }

    const taxForm = calculate(setDate(input, new Date(2024, 1, 10)))
    const jsonForm = convertToJson(taxForm)

    expect(jsonForm.dokument.telo.r146).toBeDefined()
    expect(jsonForm.dokument.telo.r146a).toBeDefined()
  })

  test('should be filled when hasChildren is "income-used-by-someone-else"', async () => {
    const inputModule = await import('./testCases/withChildrenInput')
    const input: TaxFormUserInput = {
      ...inputModule.withChildrenInput,
      hasChildren: 'income-used-by-someone-else',
      children: [],
    }

    const taxForm = calculate(setDate(input, new Date(2024, 1, 10)))
    const jsonForm = convertToJson(taxForm)

    expect(jsonForm.dokument.telo.r146).toBeDefined()
    expect(jsonForm.dokument.telo.r146a).toBeDefined()
  })

  test('should be empty when hasChildren is "no"', async () => {
    const inputModule = await import('./testCases/withChildrenInput')
    const input: TaxFormUserInput = {
      ...inputModule.withChildrenInput,
      hasChildren: 'no',
      children: [],
    }

    const taxForm = calculate(setDate(input, new Date(2024, 1, 10)))
    const jsonForm = convertToJson(taxForm)

    expect(jsonForm.dokument.telo.r146).toBe('')
    expect(jsonForm.dokument.telo.r146a).toBe('')
  })
})
