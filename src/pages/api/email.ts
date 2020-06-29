import { NextApiRequest, NextApiResponse } from 'next'
import {
  makeAttachment,
  TemplateParams,
  sendEmail,
  createOrUpdateContact,
} from '../../lib/sendinblue'
import { convertToXML } from '../../lib/xml/xmlConverter'
import { setDate } from '../../lib/utils'
import { buildPdf } from './pdf'
import { TaxForm } from '../../types/TaxForm'
import { TaxFormUserInput } from '../../types/TaxFormUserInput'
import { calculate } from '../../lib/calculation'

const templates = {
  tax: parseInt(process.env.sendinblue_tpl_tax, 10),
  postpone: parseInt(process.env.sendinblue_tpl_postpone, 10),
}
const contactListId = parseInt(process.env.sendinblue_list_id, 10)

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const email = `${req.body.email}`
  const params = req.body.params as TemplateParams
  const template = req.query.tpl ? `${req.query.tpl}` : 'tax'
  const taxFormUserInput: TaxFormUserInput = req.body.taxFormUserInput

  if (!email || !params || !template || !taxFormUserInput) {
    res.statusCode = 400
    return res.send({ message: 'Invalid params' })
  }

  const taxForm: TaxForm = calculate(setDate(taxFormUserInput))
  const attachmentXml = convertToXML(taxForm)
  const attachmentPdf = buildPdf(taxForm)

  try {
    const sendEmailResponse = await sendEmail({
      templateId: templates[template],
      to: email,
      params,
      attachment: [
        makeAttachment('danove_priznanie.xml', attachmentXml),
        {
          name: 'danove_priznanie.pdf',
          content: attachmentPdf.toBuffer().toString('base64'),
        },
      ],
    })

    if (sendEmailResponse.ok && params.newsletter) {
      const { firstName, lastName } = params
      const contactResponse = await createOrUpdateContact({
        email,
        firstName,
        lastName,
        listIds: [contactListId],
      })
      if (!contactResponse.ok) {
        res.statusCode = contactResponse.status
        return res.send(contactResponse)
      }
    }

    res.statusCode = sendEmailResponse.status
    return res.send({ ...(await sendEmailResponse.json()) })
  } catch (error) {
    console.error(error)
    res.statusCode = 500
    return res.send({ message: error.message })
  }
}
