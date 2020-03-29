import { NextApiRequest, NextApiResponse } from 'next'
import {
  makeAttachment,
  TemplateAttributes,
  sendEmail,
  createOrUpdateContact,
} from '../../lib/sendinblue'

const TEMPLATE_POSTPONE_WITH_NEWSLETTER = parseInt(
  process.env.sendinblue_tpl_postpone_with_newsletter,
  10,
)
const TEMPLATE_POSTPONE_WITHOUT_NEWSLETTER = parseInt(
  process.env.sendinblue_tpl_postpone_without_newsletter,
  10,
)
const TEMPLATE_TAX_WITH_NEWSLETTER = parseInt(
  process.env.sendinblue_tpl_tax_with_newsletter,
  10,
)
const TEMPLATE_TAX_WITHOUT_NEWSLETTER = parseInt(
  process.env.sendinblue_tpl_tax_without_newsletter,
  10,
)

const getTemplateId = ({ form, newsletter }: TemplateAttributes) => {
  switch (form) {
    case 'postpone':
      return newsletter
        ? TEMPLATE_POSTPONE_WITH_NEWSLETTER
        : TEMPLATE_POSTPONE_WITHOUT_NEWSLETTER
    case 'tax':
      return newsletter
        ? TEMPLATE_TAX_WITH_NEWSLETTER
        : TEMPLATE_TAX_WITHOUT_NEWSLETTER
    default:
      return undefined
  }
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const email = `${req.body.email}`
  const attributes = req.body.attributes as TemplateAttributes

  try {
    const sendEmailResponse = await sendEmail({
      templateId: getTemplateId(attributes),
      to: email,
      attributes,
      attachment: [
        makeAttachment(
          attributes.form === 'postpone'
            ? 'odklad_danoveho_priznania.xml'
            : 'danove_priznanie.xml',
          req.body.file,
        ),
      ],
    })

    if (sendEmailResponse.ok) {
      const contactResponse = await createOrUpdateContact(email, attributes)
      if (!contactResponse.ok) {
        res.statusCode = contactResponse.status
        return res.send({ ...contactResponse })
      }
    }

    res.statusCode = sendEmailResponse.status
    return res.send({ ...(await sendEmailResponse.json()) })
  } catch (error) {
    console.log(error)
    res.statusCode = 500
    return res.send({ message: error.message })
  }
}
