import fetcher from "../../../lib/fetcher";
import { NextApiRequest, NextApiResponse } from "next";

const subscriptionHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const URL = `${process.env.AUTHOR_URL}/subscriptions/`;

  const resp = await fetcher(URL, {
    method: req.method,
    data: JSON.stringify(req.body),
  });

  res.setHeader("Content-Type", "application/json");
  res.json(resp);
};

export default subscriptionHandler;
