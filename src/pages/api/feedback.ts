import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const token = process.env.autoformtoken;

if (!token) {
  throw new Error(' process.env.autoformtoken is not defined');
}

const transporter = nodemailer.createTransport({
  sendmail: true,
  newline: 'unix',
  path: '/usr/sbin/sendmail',
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const parsedBody = JSON.parse(req.body);
  // send mail with defined transport object
  const info = await transporter.sendMail({
    // TODO get real mails
    from: 'priznanie.digital@slovensko.digital', // sender address
    to: 'priznanie.digital@protonmail.com', // list of receivers
    subject: parsedBody.whatWereYouDoing, // Subject line
    text: parsedBody.whatWentWrong, // plain text body
    attachments: [
      {
        filename: 'userInput.json',
        content: JSON.stringify(parsedBody.taxFormUserInput),
      },
    ],
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  res.send('ok');
};
