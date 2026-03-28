import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import { RollbarInstance } from '../../lib/rollbar'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Conversion Import"')
    return res.status(401).json({ error: 'Authentication required' })
  }

  let credentials: string
  try {
    credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString()
  } catch (_error) {
    return res.status(401).json({ error: 'Malformed authorization header' })
  }

  const colonIndex = credentials.indexOf(':')
  if (colonIndex === -1) {
    return res.status(401).json({ error: 'Malformed authorization header' })
  }

  const username = credentials.slice(0, colonIndex)
  const password = credentials.slice(colonIndex + 1)

  if (
    username !== process.env.CONVERSION_IMPORT_USERNAME ||
    password !== process.env.CONVERSION_IMPORT_PASSWORD
  ) {
    return res.status(403).json({ error: 'Invalid credentials' })
  }

  const filePath = process.env.CONVERSION_IMPORT_FILEPATH
  if (!filePath) {
    RollbarInstance.error('CONVERSION_IMPORT_FILEPATH env variable is not set')
    return res
      .status(500)
      .json({ error: 'Conversion import file path is not configured' })
  }

  try {
    const csv = fs.readFileSync(filePath, 'utf-8')

    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Cache-Control', 'private, no-store')
    res.setHeader(
      'Content-Disposition',
      'inline; filename="conversion-import.csv"',
    )
    res.status(200).send(csv)
  } catch (_error) {
    RollbarInstance.error(
      `Failed to read conversion import file at ${filePath}`,
      _error,
    )
    res.status(500).json({ error: 'Failed to read conversion import file' })
  }
}
