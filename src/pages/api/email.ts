import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const name = `${req.query.name}`;
  const email = `${req.query.email}`;
  const newsletter = `${req.query.newsletter}` === 'true';

  console.log('/api/email', { name, email, newsletter }); // TODO: save data

  setTimeout(() => {
    res.statusCode = 200;
    res.end(JSON.stringify({ saved: true }));
  }, 1000);
};
