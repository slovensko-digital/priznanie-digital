// / <reference types="jest" />

import libxml from 'libxmljs';
import { promises as fs } from 'fs';
import { convertToXML } from '../src/lib/xml/xmlConverter';
import taxForm from './testCases/completeTaxForm.json';
import basic from './testCases/completeTaxForm.json';
import { TaxForm } from '../src/types/TaxForm';
import { convertPostponeToXML } from '../src/lib/postpone/postponeConverter';

describe('Converters ', () => {
  test('DP validate to schema', async () => {
    const schema = await fs.readFile(`${__dirname}/xml/schema.xsd`);
    const result = convertToXML(taxForm as TaxForm);

    const xsd = libxml.parseXml((schema as any) as string);
    const xml = libxml.parseXml(result);

    xml.validate(xsd);
    expect(xml.validationErrors).toHaveLength(0);
  });
  // test('Pospone validate to schema', async () => {
  //   const schema = await fs.readFile(`${__dirname}/xml/schemaOdklad.xsd`);

  //   const postponeUserInput = {};
  //   const result = convertPostponeToXML(postponeUserInput);

  //   console.log(result);

  //   const xsd = libxml.parseXml(schema);
  //   const xml = libxml.parseXml(result);

  //   xml.validate(xsd);
  //   expect(xml.validationErrors).toHaveLength(0);
  // });
});
