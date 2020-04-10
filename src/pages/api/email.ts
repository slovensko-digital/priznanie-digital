import { NextApiRequest, NextApiResponse } from 'next'
import {
  makeAttachment,
  TemplateParams,
  sendEmail,
  createOrUpdateContact,
} from '../../lib/sendinblue'

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

  try {
    const sendEmailResponse = await sendEmail({
      templateId: templates[params.form],
      to: email,
      params,
      attachment: [
        makeAttachment(
          params.form === 'postpone'
            ? 'odklad_danoveho_priznania.xml'
            : 'danove_priznanie.xml',
          req.body.file,
        ),
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
