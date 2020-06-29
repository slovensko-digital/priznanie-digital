import { NextApiRequest, NextApiResponse } from 'next'
import { convertToXML } from '../../lib/xml/xmlConverter'
import { setDate } from '../../lib/utils'
import { calculate } from '../../lib/calculation'
import { TaxForm } from '../../types/TaxForm'
import { TaxFormUserInput } from '../../types/TaxFormUserInput'

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const rawTaxFormUserInput = req.body.taxFormUserInput
  if (!rawTaxFormUserInput) {
    return res.status(500).json({ error: 'invalid data' })
  }

  const taxFormUserInput: TaxFormUserInput = JSON.parse(rawTaxFormUserInput)
  const taxForm: TaxForm = calculate(setDate(taxFormUserInput, new Date()))

  res.setHeader(
    'content-disposition',
    'attachment; filename=danove_priznanie.xml',
  )
  res.writeHead(200, { 'Content-Type': 'text/xml' })
  res.write(convertToXML(taxForm))
  res.end()
}
