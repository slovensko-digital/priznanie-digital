import { TaxFormUserInput } from "../lib/types";
import { withPartnerTaxForm } from "./testCases/withPartnerTaxForm";
import { convertToXML, convertToJson } from "../lib/xml/xmlConverter";
import { xml2json } from "xml-js";
// @ts-ignore
import * as withPartnerXML from "./testCases/withPartner.xml";
import { promises as fs } from "fs";
import { OutputJson } from "../lib/xml/OutputJson";

const comparable = (xml: string) => xml2json(xml, { compact: true, spaces: 2 });
const stringify = (object: object) => JSON.stringify(object, null, 2);
test("withPartner", () => {
  const taxForm = withPartnerTaxForm;
  const outputXml = convertToXML(taxForm);
  const outputJson = convertToJson(taxForm);

  fs.writeFile(__dirname + "/testCases/withPartner.output.xml", outputXml);
  fs.writeFile(
    __dirname + "/testCases/withPartner.output.json",
    stringify(outputJson),
  );

  expect(comparable(outputXml)).toBe(comparable(withPartnerXML.default));
});
