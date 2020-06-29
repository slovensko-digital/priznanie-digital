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
  if (!req.body.taxFormUserInput) {
    return res.status(500).json({ error: 'invalid data' })
  }

  const formInput: TaxFormUserInput = JSON.parse(req.body.taxFormUserInput)
  const form: TaxForm = calculate(setDate(formInput))

  res.setHeader(
    'content-disposition',
    'attachment; filename=danove_priznanie.xml',
  )
  res.writeHead(200, { 'Content-Type': 'text/xml' })
  res.write(convertToXML(form))
  res.end()
}
