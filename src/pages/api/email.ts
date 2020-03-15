import fetch from 'isomorphic-unfetch';
import { NextApiRequest, NextApiResponse } from 'next';
import { SaveEmailAttributes } from '../../types/api';

const baseUrl = 'https://api.sendinblue.com/v3';
const token = process.env.sendinbluetoken;
const TEMPLATE_WITHOUT_NEWSLETTER = 3;
const TEMPLATE_WITH_NEWSLETTER = 4;

if (!token) {
  throw new Error(' process.env.sendinbluetoken is not defined');
}

const saveEmail = (email: string, attributes: SaveEmailAttributes) =>
  fetch(`${baseUrl}/contacts`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': token,
    },
    body: JSON.stringify({
      email,
      attributes,
    }),
  });

const sendConfirmationEmail = (
  templateId: number,
  email: string,
  attributes: SaveEmailAttributes,
) =>
  fetch(`${baseUrl}/smtp/templates/${templateId}/send`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': token,
    },
    body: JSON.stringify({
      emailTo: [email],
      attributes,
    }),
  });

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const email = `${req.body.email}`;
  const attributes = req.body.attributes as SaveEmailAttributes;

  const response = await saveEmail(email, attributes);

  if (response.status === 201) {
    const confirmation = await sendConfirmationEmail(
      attributes.newsletter
        ? TEMPLATE_WITH_NEWSLETTER
        : TEMPLATE_WITHOUT_NEWSLETTER,
      email,
      attributes,
    );
    if (confirmation.status !== 201) {
      const confirmationResponse = await confirmation.json();
      console.error(`Error sending email ${email}`, confirmationResponse);
    }
  }

  res.statusCode = response.status;
  res.send({ ...(await response.json()) });
};
