import { NextApiRequest, NextApiResponse } from 'next'
import {
  makeAttachment,
  sendEmail,
  createOrUpdateContact,
  PostponeTemplateParams,
} from '../../lib/sendinblue'
import { setDate } from '../../lib/utils'
import { PostponeUserInput } from '../../types/PostponeUserInput'
import { convertPostponeToXML } from '../../lib/postpone/postponeConverter'

const contactListId = Number.parseInt(process.env.sendinblue_list_id, 10)

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const email = `${req.body.email}`
  const params = req.body.params as PostponeTemplateParams
  const templateId = Number.parseInt(process.env.sendinblue_tpl_postpone, 10)
  const postponeUserInput: PostponeUserInput = req.body.postponeUserInput

  if (!email || !params || !postponeUserInput) {
    res.statusCode = 400
    return res.send({ message: 'Invalid params' })
  }

  const attachmentXml = convertPostponeToXML(setDate(postponeUserInput))

  try {
    const sendEmailResponse = await sendEmail({
      templateId,
      to: email,
      params,
      attachment: [makeAttachment('danove_priznanie.xml', attachmentXml)],
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
