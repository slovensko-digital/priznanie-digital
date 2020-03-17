import { NextApiRequest, NextApiResponse } from 'next';
import { EmailAttributes, saveEmailAddress } from '../../lib/sendinblue';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const email = `${req.body.email}`;
  const attributes = req.body.attributes as EmailAttributes;

  try {
    const saveEmailResponse = await saveEmailAddress(email, attributes);

    res.statusCode = saveEmailResponse.status;
    res.send({ ...(await saveEmailResponse.json()) });
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
};
