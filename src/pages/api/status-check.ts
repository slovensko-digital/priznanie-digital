import { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { buildTimestamp, buildCommit },
} = getConfig()

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).send({
      build_timestamp: buildTimestamp,
      build_time_human:
        buildTimestamp &&
        new Date(parseInt(buildTimestamp, 10) * 1000).toISOString(),
      git_commit: buildCommit,
    })
  } catch (error) {
    res.status(500)
  }
}
