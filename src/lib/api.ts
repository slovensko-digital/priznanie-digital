import {
  AutoformResponseBody,
  PSCResponseBody,
  SaveEmailResponse,
} from '../types/api'
import { TemplateParams } from './sendinblue'
import { TaxFormUserInput } from '../types/TaxFormUserInput'
import { translit } from './utils'
import { PostponeUserInput } from '../types/PostponeUserInput'

export const getCity = async (zip: string) => {
  const response = await fetch(
    `https://api.posta.sk/private/search?q=${zip.replace(/\D/g, '')}&m=zip`,
  )
  const pscData: PSCResponseBody = await response.json()
  return pscData?.offices?.[0]?.name ?? ''
}

export const getAutoformByPersonName = async (
  name: string,
): Promise<AutoformResponseBody[]> => {
  return fetch(`/api/autoform?name=${name}`).then((response) => response.json())
}

export const getNgoByName = async (
  name: string,
): Promise<AutoformResponseBody[]> => {
  return fetch(`/api/ngo?name=${name}`).then((response) => response.json())
}

const postFetch = async (path: string, body: any) => {
  return fetch(path, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((response) => response.json())
}

export const sendTaxEmail = async (
  email: string,
  params: TemplateParams,
  taxFormUserInput: TaxFormUserInput,
): Promise<SaveEmailResponse> => {
  return postFetch('/api/tax-email', { email, params, taxFormUserInput })
}

export const sendPostponeEmail = async (
  email: string,
  params: TemplateParams,
  postponeUserInput: PostponeUserInput,
): Promise<SaveEmailResponse> => {
  return postFetch('/api/postpone-email', { email, params, postponeUserInput })
}

export const getNace = async () => {
  return fetch(`nace.json`)
    .then((response) => response.json())
    .then((values) => {
      return values.map((item) => ({ ...item, translit: translit(item.label) }))
    })
}
