import { convertToJson, convertToXML } from "./xmlConverter";
import basicTaxForm from "./basicTaxForm";
import basic from "./basic";
import { promises as fs } from "fs";
// @ts-ignore
import * as schema from "./schema.xsd";
// @ts-ignore
import * as basicCaseXml from "./basic.xml";

var libxml = require("libxmljs");

describe("convertToJson", () => {
  test("Case 1", () => {
    const result = convertToJson(basicTaxForm);
    expect(result).toMatchObject(basic);
  });
});

describe("convertToXML", () => {
  test("Validate to schema", async () => {
    const result = convertToXML(basicTaxForm);
    const schemaDefault = schema.default;
    await fs.writeFile(
      __dirname + "/testOutputs/xmlTestOutput_schema.xml",
      result,
    );
    var xsd = libxml.parseXml(schemaDefault);
    var xml = libxml.parseXml(result);
    xml.validate(xsd);
    expect(xml.validationErrors).toHaveLength(0);
  });
  test("Case 1", () => {
    const result = convertToXML(basicTaxForm);
    fs.writeFile(__dirname + "/testOutputs/xmlTestOutput_case1.xml", result);
    const xml = basicCaseXml.default;
    expect(result).toBe(xml);
  });
});
