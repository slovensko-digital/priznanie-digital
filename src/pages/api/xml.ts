import { NextApiRequest, NextApiResponse } from 'next'
import { convertToXML } from '../../lib/xml/xmlConverter'
import { setDate } from '../../lib/utils'
import { calculate } from '../../lib/calculation'
import { TaxForm } from '../../types/TaxForm'
import { TaxFormUserInput } from '../../types/TaxFormUserInput'
import { RollbarInstance } from '../../lib/rollbar'

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const taxFormUserInput: TaxFormUserInput = req.body.taxFormUserInput

  if (!taxFormUserInput) {
    RollbarInstance.error('Invalid taxFormUserInput', { reqBody: req.body })
    return res.status(500).json({ error: 'invalid data' })
  }
  const taxForm: TaxForm = calculate(setDate(taxFormUserInput))

  res.setHeader(
    'content-disposition',
    'attachment; filename=danove_priznanie.xml',
  )
  res.writeHead(200, { 'Content-Type': 'text/xml' })
  res.write(convertToXML(taxForm))
  res.end()
}
