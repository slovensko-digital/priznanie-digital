import fs from 'fs'
import { validateXML } from 'xmllint-wasm'

export interface ValidateXmlParams {
  filePath: string
  schemaPath: string
}

export interface ValidateXmlResult {
  valid: boolean
  messages: string[]
}

export default async function validateXml({
  filePath,
  schemaPath,
}: ValidateXmlParams): Promise<ValidateXmlResult> {
  const result = await validateXML({
    xml: { fileName: 'file.xml', contents: fs.readFileSync(filePath, 'utf-8') },
    schema: {
      fileName: 'schema.xsd',
      contents: fs.readFileSync(schemaPath, 'utf-8'),
    },
  })

  return {
    valid: result.valid,
    messages: result.errors.map((e) => e.rawMessage.trim()),
  }
}
