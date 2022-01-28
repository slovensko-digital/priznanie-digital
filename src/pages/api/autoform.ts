import type { NextApiRequest, NextApiResponse } from 'next'
import { AutoformResponseBody } from '../../types/api'
import { withSentry } from '@sentry/nextjs'

const baseUrl =
  'https://autoform.ekosystem.slovensko.digital/api/corporate_bodies'
const limit = 20
const token = process.env.autoformtoken

if (!token) {
  throw new Error(' process.env.autoformtoken is not defined')
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const name = encodeURI(`${req.query.name}`)

  const query = `name:${name}`

  const response = await fetch(
    `${baseUrl}/search?q=${query}&limit=${limit}&private_access_token=${token}&filter=active`,
  )

  const personsData: AutoformResponseBody[] = await response.json()

  res.statusCode = response.status
  res.send(personsData)
}

export default withSentry(handler)
