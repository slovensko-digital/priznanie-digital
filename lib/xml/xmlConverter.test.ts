// / <reference types="jest" />

import { promises as fs } from 'fs';
import { convertToJson, convertToXML } from './xmlConverter';
import basicTaxForm from './basicTaxForm';
import basic from './basic';
// @ts-ignore
import * as schema from './schema.xsd';
// @ts-ignore
import * as basicCaseXml from './basic.xml';
import { TaxForm } from '../types';

const libxml = require('libxmljs');

describe('convertToJson', () => {
  test('Case 1', () => {
    const result = convertToJson(basicTaxForm as TaxForm);
    expect(result).toMatchObject(basic);
  });
});

describe('convertToXML', () => {
  test('Validate to schema', async () => {
    const result = convertToXML(basicTaxForm as TaxForm);
    const schemaDefault = schema.default;
    // Await fs.writeFile(
    //   __dirname + "/testOutputs/xmlTestOutput_schema.xml",
    //   result,
    // );
    const xsd = libxml.parseXml(schemaDefault);
    const xml = libxml.parseXml(result);
    xml.validate(xsd);
    expect(xml.validationErrors).toHaveLength(0);
  });
  test('Case 1', () => {
    const result = convertToXML(basicTaxForm as TaxForm);
    fs.writeFile(`${__dirname}/testOutputs/xmlTestOutput_case1.xml`, result);
    const xml = basicCaseXml.default;
    expect(result).toBe(xml);
  });
});
