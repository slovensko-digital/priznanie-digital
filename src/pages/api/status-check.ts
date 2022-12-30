import { NextApiRequest, NextApiResponse } from 'next'
import { getGitCommit } from '../../plugins/api/_utils/constants'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).send({
      git_commit: getGitCommit(),
    })
  } catch (error) {
    res.status(500)
  }
}
