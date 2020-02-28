import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;
  const personsDataJson = await fetch(
    `https://autoform.ekosystem.slovensko.digital/api/corporate_bodies/search?q=name:${req.query.fullName}&limit=20&private_access_token=${process.env.autoformtoken}
`,
  );
  const personsData = await personsDataJson.json();
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(personsData));
};
