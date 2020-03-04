import fetch from 'isomorphic-unfetch';
import { NextApiRequest, NextApiResponse } from 'next';
import { AutoformResponseBody } from '../../types/autoformResponse';

const baseUrl =
  'https://autoform.ekosystem.slovensko.digital/api/corporate_bodies';
const limit = 20;
const token =
  '89e56e0d966f79a2dca7d1a0f6f97799796e6cc77b616bbc4b796c086290c0acd1ab2f91dad4fb56';

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
