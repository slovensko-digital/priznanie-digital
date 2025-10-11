import fs from 'fs'
import libxml from 'libxmljs'

export interface ValidateXmlParams {
  filePath: string
  schemaPath: string
}

export async function validateXml({ filePath, schemaPath }: ValidateXmlParams) {
  const xmlString = fs.readFileSync(filePath, 'utf-8');
  const xsdString = fs.readFileSync(schemaPath, 'utf-8');

  const xmlDoc = libxml.parseXml(xmlString);
  const xsdDoc = libxml.parseXml(xsdString);
  const isValid = await xmlDoc.validate(xsdDoc);

  if (isValid) {
    return { valid: true, messages: [] };
  }
  const messages = xmlDoc.validationErrors.map((e) => e.message.trim());

  return {
    valid: false,
    messages: messages,
  };
}
