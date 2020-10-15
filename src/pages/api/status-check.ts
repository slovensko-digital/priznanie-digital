import { NextApiRequest, NextApiResponse } from 'next'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).send({ git_commit: process.env.COMMIT })
  } catch (error) {
    res.status(500)
  }
}
