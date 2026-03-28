import { NextApiRequest, NextApiResponse } from 'next'
import { makeAttachment, sendEmail } from '../../lib/sendinblue'
import { RollbarInstance } from '../../lib/rollbar'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const parsedBody = JSON.parse(req.body)

  const attachment = []
  if (parsedBody.taxFormUserInput) {
    attachment.push(
      makeAttachment(
        'taxFormUserInput.json.txt',
        JSON.stringify(parsedBody.taxFormUserInput, null, 2),
      ),
    )
  }
  if (parsedBody.postponeUserInput) {
    attachment.push(
      makeAttachment(
        'postponeUserInput.json.txt',
        parsedBody.postponeUserInput,
      ),
    )
  }

  try {
    await sendEmail({
      to: 'navody@slovensko.digital',
      replyTo: `${parsedBody.email || 'noreply@slovensko.digital'}`,
      subject: parsedBody.whatWereYouDoing,
      textContent: `${parsedBody.whatWentWrong}\n\n
Email: ${parsedBody.email || '[neuvedený]'}
URL: ${parsedBody.url}
Dátum: ${new Date().toLocaleString()}`,
      attachment,
    })
    res.status(200).send({ sent: true })
  } catch (_error) {
    RollbarInstance.error(_error)
    res.status(400).send({ sent: false })
  }
}
