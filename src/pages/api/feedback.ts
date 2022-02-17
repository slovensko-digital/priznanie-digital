import { NextApiRequest, NextApiResponse } from 'next'
import { makeAttachment, sendEmail } from '../../lib/sendinblue'

const email = async (req: NextApiRequest, res: NextApiResponse) => {
  const parsedBody = JSON.parse(req.body)

  const ipAddress =
    req.connection.remoteAddress || req.headers['x-forwarded-for'] || '?'

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
      to: 'priznanie.digital@protonmail.com',
      subject: parsedBody.whatWereYouDoing,
      textContent: `${parsedBody.whatWentWrong}\n\n
Email: ${parsedBody.email || '[neuvedený]'}
URL: ${parsedBody.url}
IP adresa: ${ipAddress}
Dátum: ${new Date().toLocaleString()}`,
      attachment,
    })
    res.status(200).send({ sent: true })
  } catch (error) {
    res.status(400).send({ sent: false })
  }
}

export default email