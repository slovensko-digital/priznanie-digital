/// <reference types="jest" />
// import { xml2json } from 'xml-js';
import { promises as fs } from 'fs';
import { parseStringPromise } from 'xml2js';
import { withPartnerInput } from './testCases/withPartnerInput';
import { withEmploymentInput } from './testCases/withEmploymentInput';
import { convertToXML, convertToJson } from '../src/lib/xml/xmlConverter';
import { calculate } from '../src/lib/calculation';
import { baseInput } from './testCases/baseInput';

const comparable = (xml: string) =>
  parseStringPromise(xml, { trim: true, normalize: true, normalizeTags: true });
const stringify = (object: object) => JSON.stringify(object, null, 2);
describe('calcIntergration', () => {
  test('base', async () => {
    return fs.readFile(`${__dirname}/testCases/base.xml`).then(baseXML => {
      const taxForm = calculate(baseInput);
      fs.writeFile(
        `${__dirname}/testCases/baseTaxForm.output.json`,
        stringify(taxForm),
      );

      const outputXml = convertToXML(taxForm);
      const outputJson = convertToJson(taxForm);

      fs.writeFile(`${__dirname}/testCases/base.output.xml`, outputXml);
      fs.writeFile(
        `${__dirname}/testCases/base.output.json`,
        stringify(outputJson),
      );

      return expect(comparable(outputXml)).toStrictEqual(
        comparable(baseXML.toString()),
      );
    });
  });
  test('withPartner', async () => {
    return fs
      .readFile(`${__dirname}/testCases/withPartner.xml`)
      .then(withPartnerXML => {
        const taxForm = calculate(withPartnerInput);
        fs.writeFile(
          `${__dirname}/testCases/withPartnerTaxForm.output.json`,
          stringify(taxForm),
        );

        const outputXml = convertToXML(taxForm);
        const outputJson = convertToJson(taxForm);

        fs.writeFile(
          `${__dirname}/testCases/withPartner.output.xml`,
          outputXml,
        );
        fs.writeFile(
          `${__dirname}/testCases/withPartner.output.json`,
          stringify(outputJson),
        );

        return expect(comparable(outputXml)).toStrictEqual(
          comparable(withPartnerXML.toString()),
        );
      });
  });
  test('withEmployment', async () => {
    const withEmploymentXML = await fs.readFile(
      `${__dirname}/testCases/withEmployment.xml`,
    );

    const taxForm = calculate(withEmploymentInput);
    const outputXml = convertToXML(taxForm);
    const outputJson = convertToJson(taxForm);

    fs.writeFile(
      `${__dirname}/testCases/withEmploymentTaxForm.output.json`,
      stringify(taxForm),
    );
    fs.writeFile(`${__dirname}/testCases/withEmployment.output.xml`, outputXml);
    fs.writeFile(
      `${__dirname}/testCases/withEmployment.output.json`,
      stringify(outputJson),
    );
    const result = await comparable(outputXml);
    const expected = await comparable(withEmploymentXML.toString());

    return expect(result).toStrictEqual(expected);
  });
});
