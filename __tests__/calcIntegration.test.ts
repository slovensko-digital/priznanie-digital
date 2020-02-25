import { withPartnerInput } from "./testCases/withPartnerInput";
import { convertToXML, convertToJson } from "../lib/xml/xmlConverter";
import { xml2json } from "xml-js";
// @ts-ignore
import * as withPartnerXML from "./testCases/withPartner.xml";
import { promises as fs } from "fs";
import { calculate } from "../lib/calculation";

const comparable = (xml: string) => xml2json(xml, { compact: true, spaces: 2 });
const stringify = (object: object) => JSON.stringify(object, null, 2);
test.only("withPartner", () => {
  const taxForm = calculate(withPartnerInput);
  fs.writeFile(
    __dirname + "/testCases/withPartnerTaxForm.output.json",
    stringify(taxForm),
  );

  const outputXml = convertToXML(taxForm);
  const outputJson = convertToJson(taxForm);

  fs.writeFile(__dirname + "/testCases/withPartner.output.xml", outputXml);
  fs.writeFile(
    __dirname + "/testCases/withPartner.output.json",
    stringify(outputJson),
  );

  expect(comparable(outputXml)).toBe(comparable(withPartnerXML.default));
});
