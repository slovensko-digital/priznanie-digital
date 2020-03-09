import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const token = process.env.autoformtoken;

if (!token) {
  throw new Error(' process.env.autoformtoken is not defined');
}

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'nicholas.kuhlman@ethereal.email',
    pass: 'sNSZMhYquJ6Dvjn6tD',
  },
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const parsedBody = JSON.parse(req.body);
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"nicholas.kuhlman@ethereal.email"', // sender address
    to: 'nicholas.kuhlman@ethereal.email', // list of receivers
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

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  res.send('ok');
};
