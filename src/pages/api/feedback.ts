import { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

// const util = require('util');

const token = process.env.SENDGRID_API_KEY;

if (!token) {
  throw new Error('process.env.SENDGRID_API_KEY is not defined');
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const parsedBody = JSON.parse(req.body);

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const content = {
    to: 'priznanie.digital@protonmail.com',
    from: 'priznanie.digital@slovensko.digital',
    subject: parsedBody.whatWereYouDoing,
    text: parsedBody.whatWentWrong,
    attachments: [
      {
        filename: 'userInput.json',
        content: Buffer.from(
          JSON.stringify(parsedBody.taxFormUserInput),
        ).toString('base64'),
      },
    ],
  };
  try {
    await sgMail.send(content);
    res.status(200).send('Message sent successfully.');
  } catch (error) {
    // console.log(
    //   util.inspect(error, { compact: true, depth: 10, breakLength: 80 }),
    // );
    res.status(400).send('Message not sent.');
  }
};
