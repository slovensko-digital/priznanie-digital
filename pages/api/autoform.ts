import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!process.env.autoformtoken) {
    throw new Error("Autoform token is missing in `process.env` variable");
  }
  const personsDataJson = await fetch(
    `https://autoform.ekosystem.slovensko.digital/api/corporate_bodies/search?q=name:${req.query.fullName}&limit=20&active=true&private_access_token=${process.env.autoformtoken}
`,
  );

  const personsData = await personsDataJson.json();

  personsData.message === "Bad credentials"
    ? (res.statusCode = 401)
    : (res.statusCode = 200);

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(personsData));
};
