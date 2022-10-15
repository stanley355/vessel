import fetcher from "../../../lib/fetcher";
import { NextApiRequest, NextApiResponse } from "next";

const viewSubscriptionHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const URL = `${process.env.AUTHOR_URL}/subscriptions/paid/`;

  const resp = await fetcher(URL, {
    method: "PUT",
    data: {
      user_id: req.body.user_id,
      channels_id: req.body.channels_id,
      invoice_id: req.body.invoice_id,
    },
  });

  res.setHeader("Content-Type", "application/json");
  res.json(resp);
};

export default viewSubscriptionHandler;
