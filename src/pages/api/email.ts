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

const templates = {
  tax: parseInt(process.env.sendinblue_tpl_tax, 10),
  postpone: parseInt(process.env.sendinblue_tpl_postpone, 10),
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const email = `${req.body.email}`
  const params = req.body.params as TemplateParams

  const attachmentXml = convertToXML(setDate(req.body.taxForm))
  const attachmentPdf = buildPdf(req.body.taxForm)

  try {
    const sendEmailResponse = await sendEmail({
      templateId: templates[params.form],
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

    if (sendEmailResponse.ok) {
      const contactResponse = await createOrUpdateContact(email, params)
      if (!contactResponse.ok) {
        res.statusCode = contactResponse.status
        return res.send({ ...contactResponse })
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
