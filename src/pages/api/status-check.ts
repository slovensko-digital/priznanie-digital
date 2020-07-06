import { NextApiRequest, NextApiResponse } from 'next'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).send({ commitHash: process.env.commitHash })
  } catch (error) {
    res.status(500)
  }
}
