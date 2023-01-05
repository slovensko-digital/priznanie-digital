import { NextApiRequest, NextApiResponse } from 'next'
import { convertToXML } from '../../features/summary/9-pokracovat/xml/xmlConverter'
import { setDate } from '../../features/_shared/_utils/utils'
import { calculate } from '../../features/_shared/calculation/calculation'
import { TaxForm } from '../../features/_shared/taxform/TaxForm'
import { TaxFormUserInput } from '../../features/_shared/taxform/TaxFormUserInput'

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const rawTaxFormUserInput = req.body.taxFormUserInput
  if (!rawTaxFormUserInput) {
    return res.status(500).json({ error: 'invalid data' })
  }

  const taxFormUserInput: TaxFormUserInput = JSON.parse(rawTaxFormUserInput)
  const taxForm: TaxForm = calculate(setDate(taxFormUserInput))

  res.setHeader(
    'content-disposition',
    'attachment; filename=danove_priznanie.xml',
  )
  res.writeHead(200, { 'Content-Type': 'text/xml' })
  res.write(convertToXML(taxForm))
  res.end()
}
