import fetcher from "../../../lib/fetcher";
import { NextApiRequest, NextApiResponse } from "next";

const viewSubscriptionHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const URL = `${process.env.AUTHOR_URL}/subscriptions/`;

  const resp = await fetcher(URL, {
    method: "GET",
    data: JSON.stringify(req.body),
  });

  res.setHeader("Content-Type", "application/json");
  res.json(resp);
};

export default viewSubscriptionHandler;
