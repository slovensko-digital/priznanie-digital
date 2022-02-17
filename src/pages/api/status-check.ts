import { NextApiRequest, NextApiResponse } from 'next'
import { getGitCommit } from '../../lib/constants'

const statusCheck = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).send({
      git_commit: getGitCommit(),
    })
  } catch (error) {
    res.status(500)
  }
}

export default statusCheck