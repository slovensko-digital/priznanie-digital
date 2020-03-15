import fetch from 'isomorphic-unfetch';
import { NextApiRequest, NextApiResponse } from 'next';
import { SaveEmailAttributes } from '../../types/api';

const baseUrl = 'https://api.sendinblue.com/v3';
const token = process.env.sendinbluetoken;

if (!token) {
  throw new Error(' process.env.sendinbluetoken is not defined');
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const email = `${req.body.email}`;
  const attributes = req.body.attributes as SaveEmailAttributes;

  const response = await fetch(`${baseUrl}/contacts`, {
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

  res.statusCode = response.status;
  res.send(await response.json());
};
