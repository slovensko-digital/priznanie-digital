import { NextApiRequest, NextApiResponse } from 'next';
import {
  EmailAttributes,
  makeAttachment,
  saveEmailAddress,
  sendEmailUsingTemplate,
} from '../../lib/sendinblue';

const TEMPLATE_WITHOUT_NEWSLETTER = 3;
const TEMPLATE_WITH_NEWSLETTER = 4;

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const email = `${req.body.email}`;
  const attributes = req.body.attributes as EmailAttributes;

  try {
    const sendEmailResponse = await sendEmailUsingTemplate({
      templateId: attributes.newsletter
        ? TEMPLATE_WITH_NEWSLETTER
        : TEMPLATE_WITHOUT_NEWSLETTER,
      email,
      attributes,
      attachment: [
        makeAttachment('odklad_danoveho_priznania.xml', req.body.file),
      ],
    });

    if (sendEmailResponse.ok) {
      const saveEmailResponse = await saveEmailAddress(email, attributes);
      if (!saveEmailResponse.ok) {
        res.statusCode = saveEmailResponse.status;
        return res.send({ ...(await saveEmailResponse.json()) });
      }
    }

    res.statusCode = sendEmailResponse.status;
    return res.send({ ...(await sendEmailResponse.json()) });
  } catch (error) {
    res.statusCode = 500;
    return res.send(error);
  }
};
