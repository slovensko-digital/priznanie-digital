import { NextApiRequest, NextApiResponse } from 'next'
import { convertToXML } from '../../lib/xml/xmlConverter'
import { setDate, parseInputNumber } from '../../lib/utils'
import { TaxForm } from '../../types/TaxForm'

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (!req.body) {
    return res.status(500).json({ error: 'invalid data' })
  }

  const form: TaxForm = req.body
  Object.keys(form).forEach((key) => {
    const parsedNumber = parseInputNumber(form[key])
    if (!isNaN(parsedNumber)) {
      form[key] = parsedNumber
    }
  })

  res.setHeader(
    'content-disposition',
    'attachment; filename=danove_priznanie.xml',
  )
  res.writeHead(200, { 'Content-Type': 'text/xml' })

  res.write(convertToXML(setDate(form)))
  res.end()
}
