import fetch from 'isomorphic-unfetch';
import { NextApiRequest, NextApiResponse } from 'next';
import { AutoformResponseBody } from '../../types/api';

const baseUrl =
  'https://autoform.ekosystem.slovensko.digital/api/corporate_bodies';
const limit = 20;
const token = process.env.autoformtoken;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const firstName = encodeURI(req.query.firstName as string);
  const lastName = encodeURI(req.query.lastName as string);

  const query = `name:${firstName}+${lastName}`;

  const response = await fetch(
    `${baseUrl}/search?q=${query}&limit=${limit}&private_access_token=${token}&filter=active`,
  );

  const personsData: AutoformResponseBody = await response.json();

  res.statusCode = response.status;
  res.send(personsData);
};
