import fs from 'fs'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Conversion Import"')
    return res.status(401).json({ error: 'Authentication required' })
  }

  const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString()
  const [username, password] = credentials.split(':')

  if (
    username !== process.env.CONVERSION_IMPORT_USERNAME ||
    password !== process.env.CONVERSION_IMPORT_PASSWORD
  ) {
    return res.status(403).json({ error: 'Invalid credentials' })
  }

  try {
    const filePath = process.env.CONVERSION_IMPORT_FILEPATH
      || path.join(process.cwd(), 'public', 'conversion-import.csv')
    const csv = fs.readFileSync(filePath, 'utf-8')

    res.setHeader('Content-Type', 'text/csv')
    res.setHeader(
      'Content-Disposition',
      'inline; filename="conversion-import.csv"',
    )
    res.status(200).send(csv)
  } catch (error) {
    res.status(500).json({ error: 'Failed to read conversion import file' })
  }
}
