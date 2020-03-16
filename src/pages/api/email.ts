import { NextApiRequest, NextApiResponse } from 'next';
import {
  EmailAttributes,
  makeAttachment,
  saveEmailAddress,
  sendEmailUsingTemplate,
} from '../../lib/sendinblue';

const TEMPLATE_WITHOUT_NEWSLETTER = 3;
const TEMPLATE_WITH_NEWSLETTER = 4;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const email = `${req.body.email}`;
  const attributes = req.body.attributes as EmailAttributes;

  const response = await sendEmailUsingTemplate({
    templateId: attributes.newsletter
      ? TEMPLATE_WITH_NEWSLETTER
      : TEMPLATE_WITHOUT_NEWSLETTER,
    email,
    attributes,
    attachment: [
      makeAttachment('odklad_danoveho_priznania.xml', req.body.file),
    ],
  });

  if (response.status === 201) {
    const saveResponse = await saveEmailAddress(email, attributes);
  }

  res.statusCode = response.status;
  res.send({ ...(await response.json()) });
};
