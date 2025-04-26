import { NextApiRequest, NextApiResponse } from "next";
import { getGitCommit } from "../../lib/constants";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).send({
      git_commit: getGitCommit(),
    });
  } catch (_error) {
    res.status(500);
  }
};
