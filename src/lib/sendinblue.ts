import fetch from 'isomorphic-unfetch'

const baseUrl = 'https://api.sendinblue.com/v3'
const token = process.env.sendinbluetoken
const sender = {
  name: 'priznanie.digital',
  email: 'priznanie.digital@slovensko.digital',
}

if (!token) {
  throw new Error('process.env.sendinbluetoken is not defined')
}

const headers = {
  accept: 'application/json',
  'content-type': 'application/json',
  'api-key': token,
}

export type TemplateParams = PostponeTemplateParams | TaxTemplateParams

export interface PostponeTemplateParams extends BaseTemplateParams {
  deadline?: string
}

export interface TaxTemplateParams extends BaseTemplateParams {
  summaryTable: string
}

export interface BaseTemplateParams {
  firstname: string
  lastname: string
  newsletter: boolean
  form: string
}

export interface SendEmailAttachment {
  content: string
  name: string
}
export interface SendTextParams {
  to: string
  subject: string
  textContent: string
  attachment?: SendEmailAttachment[]
}
export interface SendTemplateParams {
  to: string
  templateId: number
  params: TemplateParams
  attachment?: SendEmailAttachment[]
}
export type SendEmailParams = SendTextParams | SendTemplateParams

const isTemplateParams = (
  params: SendEmailParams,
): params is SendTemplateParams => {
  return (params as SendTemplateParams).templateId !== undefined
}

const buildEmailBody = (emailParams: SendEmailParams) => {
  let body
  if (isTemplateParams(emailParams)) {
    const { templateId, params } = emailParams
    body = {
      params,
      templateId,
    }
  } else {
    const { subject, textContent } = emailParams
    body = {
      subject,
      textContent,
    }
  }

  const { to, attachment } = emailParams
  return {
    sender,
    to: [{ email: to }],
    attachment: attachment && attachment.length > 0 ? attachment : undefined,
    ...body,
  }
}

export const sendEmail = async (params: SendEmailParams) => {
  const result = await fetch(`${baseUrl}/smtp/email`, {
    method: 'POST',
    headers,
    body: JSON.stringify(buildEmailBody(params)),
  })

  if (result.status !== 201) {
    const message = `Error sending email to ${params.to}`
    console.error(message)
    console.error(await result.json())
    throw new Error(message)
  }

  return result
}

export const makeAttachment = (name: string, content: any) => ({
  name,
  content: Buffer.from(JSON.stringify(content, null, 4)).toString('base64'),
})

const createContact = (email: string, attributes: TemplateParams) =>
  fetch(`${baseUrl}/contacts`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email,
      attributes,
    }),
  })

const updateContact = (email: string, attributes: TemplateParams) =>
  fetch(`${baseUrl}/contacts/${email}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ attributes }),
  })

const getContact = (email: string) =>
  fetch(`${baseUrl}/contacts/${email}`, { headers })

export const createOrUpdateContact = async (
  email: string,
  params: TemplateParams,
): Promise<Response> => {
  const saveReponse = await createContact(email, params)
  if (!saveReponse.ok) {
    const saveReponseJson = await saveReponse.json()
    if (saveReponseJson.code === 'duplicate_parameter') {
      const savedContact = await (await getContact(email)).json()
      const form = savedContact.attributes.FORM || ''
      return await updateContact(email, {
        ...params,
        form: form.includes(params.form) ? form : `${form},${params.form}`,
      })
    }
  }
  return saveReponse
}
