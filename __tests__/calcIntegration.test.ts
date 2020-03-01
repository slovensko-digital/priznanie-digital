/// <reference types="jest" />
import { xml2json } from 'xml-js';
import { promises as fs } from 'fs';
import { withPartnerInput } from './testCases/withPartnerInput';
import { convertToXML, convertToJson } from '../src/lib/xml/xmlConverter';
// @ts-ignore
import * as withPartnerXML from './testCases/withPartner.xml';
import { calculate } from '../src/lib/calculation';

const comparable = (xml: string) => xml2json(xml, { compact: true, spaces: 2 });
const stringify = (object: object) => JSON.stringify(object, null, 2);
test('withPartner', () => {
  const taxForm = calculate(withPartnerInput);
  fs.writeFile(
    `${__dirname}/testCases/withPartnerTaxForm.output.json`,
    stringify(taxForm),
  );

  const outputXml = convertToXML(taxForm);
  const outputJson = convertToJson(taxForm);

  fs.writeFile(`${__dirname}/testCases/withPartner.output.xml`, outputXml);
  fs.writeFile(
    `${__dirname}/testCases/withPartner.output.json`,
    stringify(outputJson),
  );

  // @ts-ignore
  expect(comparable(outputXml)).toBe(comparable(withPartnerXML.default));
});
