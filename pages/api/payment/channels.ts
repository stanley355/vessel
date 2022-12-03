import fetcher from "../../../lib/fetcher";
import { NextApiRequest, NextApiResponse } from "next";

const paymentChannelsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const URL = `${process.env.PAYMENT_URL}/v2/payment/channels?channelID=${req.query.channelID}`;

  const resp = await fetcher(URL, {
    method: "GET",
    headers: {
      Authorization: process.env.PAYMENT_API_TOKEN,
    },
  });

  res.setHeader("Content-Type", "application/json");
  res.json(resp);
};

export default paymentChannelsHandler;
