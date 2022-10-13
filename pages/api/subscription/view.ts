import fetcher from "../../../lib/fetcher";
import { NextApiRequest, NextApiResponse } from "next";

const viewSubscriptionHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const param = `user_id=${req.body.user_id}&channels_id=${req.body.channels_id}${req.body.invoice_id ? `&invoice_id=${req.body.invoice_id}` : ""}`;
  const URL = `${process.env.AUTHOR_URL}/subscriptions/?${param}`;

  let response: any;
  try {
    const res = await fetcher(URL, {
      method: "GET",
    });

    response = res.data ?? { error: "Bad Request" };
  } catch (err) {
    response = err;
  }

  res.setHeader("Content-Type", "application/json");
  res.json(response);
};

export default viewSubscriptionHandler;
