// eslint-disable-next-line unicorn/filename-case
import { NextApiRequest, NextApiResponse } from 'next'
import {
  TemplateParams,
  sendEmail,
  createOrUpdateContact,
} from '../../../lib/sendinblue'

const contactListId = Number.parseInt(process.env.sendinblue_list_id, 10)

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const email = `${req.body.email}`
  const params = req.body.params as TemplateParams
  const templateId = Number.parseInt(process.env.sendinblue_tpl_not_ready, 10)

  if (!email) {
    res.statusCode = 400
    return res.send({ message: 'Invalid params' })
  }

  try {
    const sendEmailResponse = await sendEmail({
      templateId,
      to: email,
      params,
    })

    if (sendEmailResponse.ok && params.newsletter) {
      const { firstName = '', lastName = '' } = params
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
