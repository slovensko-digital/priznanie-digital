import { NextApiRequest, NextApiResponse } from 'next'
import { RollbarInstance } from '../../lib/rollbar'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200)
  } catch (_error) {
    RollbarInstance.error(_error)
    res.status(500)
  }
}
