import fetcher from "../../../lib/fetcher";
import { NextApiRequest, NextApiResponse } from "next";

const paidSubscriptionHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const URL = `${process.env.AUTHOR_URL}/subscriptions/paid/`;

  const resp = await fetcher(URL, {
    method: 'PUT',
    data: JSON.stringify(req.body),
  });

  res.setHeader("Content-Type", "application/json");
  res.json(resp);
};

export default paidSubscriptionHandler;
