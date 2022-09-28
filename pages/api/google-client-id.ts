import getConfig from "next/config";
import { NextApiRequest, NextApiResponse } from "next";

const { GOOGLE_CLIENT_ID } = getConfig().serverRuntimeConfig;

export default (req: NextApiRequest, res: NextApiResponse) => {
  const config = {
    clientID: GOOGLE_CLIENT_ID,
  };

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(config);
};
