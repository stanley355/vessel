import fetcher from "../../../lib/fetcher";
import { NextApiRequest, NextApiResponse } from "next";

const viewSubscriptionHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const param = `user_id=${req.body.user_id}&channels_id=${
    req.body.channels_id
  }${req.body.invoice_id ? `&invoice_id=${req.body.invoice_id}` : ""}`;
  const URL = `${process.env.AUTHOR_URL}/subscriptions/?${param}`;

  const resp = await fetcher(URL, {});

  res.setHeader("Content-Type", "application/json");
  res.json(resp);
};

export default viewSubscriptionHandler;
