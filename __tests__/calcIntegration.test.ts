import { TaxFormUserInput } from "../lib/types";
import { withPartnerTaxForm } from "./testCases/withPartnerTaxForm";
import { convertToXML } from "../lib/xml/xmlConverter";
import { xml2json } from "xml-js";
// @ts-ignore
import * as withPartnerXML from "./testCases/withPartner.xml";
import { promises as fs } from "fs";

const comparable = xml => xml2json(xml, { compact: true, spaces: 2 });

test("withPartner", () => {
  const input = withPartnerTaxForm;

  // const calculated = calculate(input);
  const converted = convertToXML(input);
  fs.writeFile(__dirname + "/testCases/withPartner.output.xml", converted);
  expect(comparable(converted)).toBe(comparable(withPartnerXML.default));
});
