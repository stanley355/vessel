import fetcher from "../../../lib/fetcher";
import { URLSearchParams } from "url";
import { NextApiRequest, NextApiResponse } from "next";

const viewSubscriptionHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const params = {
    user_id: req.query.user_id ?? "",
    ...(req.query.channels_id && { channels_id: req.query.channels_id }),
    ...(req.query.invoice_id && { invoice_id: req.query.invoice_id }),
  };

  const queryString = new URLSearchParams(params);
  const URL = `${process.env.AUTHOR_URL}/subscriptions/?${queryString}`;

  const resp = await fetcher(URL, {
    method: "GET",
    data: JSON.stringify(req.body),
  });

  res.setHeader("Content-Type", "application/json");
  res.json(resp);
};

export default viewSubscriptionHandler;
