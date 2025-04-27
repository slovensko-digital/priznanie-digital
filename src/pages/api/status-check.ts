import { NextApiRequest, NextApiResponse } from 'next'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200)
  } catch (_error) {
    res.status(500)
  }
}
