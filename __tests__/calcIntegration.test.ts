/// <reference types="jest" />
// import { xml2json } from 'xml-js';
import { promises as fs } from 'fs';
import { parseStringPromise } from 'xml2js';
import { convertToXML, convertToJson } from '../src/lib/xml/xmlConverter';
import { calculate } from '../src/lib/calculation';
import { TaxFormUserInput } from '../src/types/TaxFormUserInput';

const WRITE_FILES = true;

const comparable = (xml: string) =>
  parseStringPromise(xml, { trim: true, normalize: true, normalizeTags: true });

const stringify = (object: object) => JSON.stringify(object, null, 2);
describe('calcIntergration', () => {
  [
    // 'base',
    // 'complete',
    // 'withPartner',
    // 'withEmployment',
    // 'withPension',
    // 'withMortgage',
    'withChildren',
  ].forEach(testCase => {
    test('withChildren', async () => {
      const testCaseValidatedXML = await fs.readFile(
        `${__dirname}/testCases/${testCase}.xml`,
      );

      const inputModule = await import(`./testCases/${testCase}Input`);

      // Access named export
      const input: TaxFormUserInput = inputModule[`${testCase}Input`];

      const taxForm = calculate(input);

      const outputXml = convertToXML(taxForm);

      if (WRITE_FILES) {
        const outputJson = convertToJson(taxForm);
        fs.writeFile(
          `${__dirname}/testCases/${testCase}TaxForm.output.json`,
          stringify(taxForm),
        );
        fs.writeFile(
          `${__dirname}/testCases/${testCase}.output.xml`,
          outputXml,
        );
        fs.writeFile(
          `${__dirname}/testCases/${testCase}.output.json`,
          stringify(outputJson),
        );
      }

      const result = await comparable(outputXml);
      const expected = await comparable(testCaseValidatedXML.toString());

      return expect(result).toStrictEqual(expected);
    });
  });
});
