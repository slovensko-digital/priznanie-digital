import fs from 'fs'
import validator from 'xsd-schema-validator'

export interface ValidateXmlParams {
  filePath: string
  schemaPath: string
}

export async function validateXml({ filePath, schemaPath }: ValidateXmlParams) {
  const xmlContent = fs.readFileSync(filePath, 'utf8')
  const result = await validator.validateXML(xmlContent, schemaPath);
  console.log('aaaaaaaaaa');
  console.log(result);
  return result ? result : true;
}
