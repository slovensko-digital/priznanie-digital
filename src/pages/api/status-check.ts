import { NextApiRequest, NextApiResponse } from 'next'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const revision = require('child_process')
      .execSync('git rev-parse --short HEAD')
      .toString()
      .trim()
    res.status(200).send({ git_sha: revision })
  } catch (error) {
    res.status(500)
  }
}
