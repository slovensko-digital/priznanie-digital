import getConfig from "next/config";
import type { AutoformResponseBody } from '../types/api'
import { translit } from './utils'

const {
  publicRuntimeConfig: { autoformPublicToken },
} = getConfig()

export const getAutoformByPersonName = async (
  name: string,
): Promise<AutoformResponseBody[]> => {
  const baseUrl =
    'https://autoform.ekosystem.slovensko.digital/api/corporate_bodies'
  const limit = 20

  const query = `name:${encodeURI(name)}`

  try {

    const response = await fetch(
      `${baseUrl}/search?q=${query}&limit=${limit}&access_token=${autoformPublicToken}&filter=active`,
    )

    return await response.json()
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getNgoByName = async (
  name: string,
): Promise<AutoformResponseBody[]> => {
  return fetch(`/api/ngo?name=${name}`).then((response) => response.json())
}

export const getNace = async () => {
  return fetch(`nace.json`)
    .then((response) => response.json())
    .then((values) => {
      return values.map((item) => ({ ...item, translit: translit(item.label) }))
    })
}
