import fetch from 'isomorphic-unfetch';

const baseUrl = 'https://api.sendinblue.com/v3';
const token = process.env.sendinbluetoken;

if (!token) {
  throw new Error(' process.env.sendinbluetoken is not defined');
}

const headers = {
  accept: 'application/json',
  'content-type': 'application/json',
  'api-key': token,
};

export interface EmailAttributes {
  firstname: string;
  lastname: string;
  newsletter: boolean;
  deadline: string;
  form: string;
}

export interface SendEmailUsingTemplateParams {
  templateId: number;
  email: string;
  attributes: EmailAttributes;
  attachment?: SendEmailAttachment[];
}
export const sendEmailUsingTemplate = async ({
  templateId,
  email,
  attributes,
  attachment,
}: SendEmailUsingTemplateParams) => {
  // TODO this enpoint is deprecated, use https://developers.sendinblue.com/reference#sendtransacemail
  const result = await fetch(`${baseUrl}/smtp/templates/${templateId}/send`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      emailTo: [email],
      attributes,
      attachment: attachment && attachment.length > 0 ? attachment : undefined,
    }),
  });

  if (result.status !== 201) {
    throw {
      message: `Error sending email to ${email}`,
      response: await result.json(),
    };
  }
  return result;
};

export interface SendEmailAttachment {
  content: string;
  name: string;
}
export interface SendEmailParams {
  from: string;
  to: string;
  subject: string;
  textContent: string;
  attachment?: SendEmailAttachment[];
}
export const sendEmail = async ({
  from,
  to,
  subject,
  textContent,
  attachment,
}: SendEmailParams) => {
  const result = await fetch(`${baseUrl}/smtp/email`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      sender: { email: from },
      to: [{ email: to }],
      subject,
      textContent,
      attachment: attachment && attachment.length > 0 ? attachment : undefined,
    }),
  });

  if (result.status !== 201) {
    throw {
      message: `Error sending email to ${to}`,
      response: await result.json(),
    };
  }
};

export const makeAttachment = (name: string, content: any) => ({
  name,
  content: Buffer.from(JSON.stringify(content, null, 4)).toString('base64'),
});

export const saveEmailAddress = (email: string, attributes: EmailAttributes) =>
  fetch(`${baseUrl}/contacts`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email,
      attributes,
    }),
  });
