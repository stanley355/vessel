import fetcher from "../../../lib/fetcher";
import { NextApiRequest, NextApiResponse } from "next";

const paymentHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const URL = `${process.env.PAYMENT_URL}/v2/payment/`;

  const resp = await fetcher(URL, {
    method: req.method,
    headers: {
      Authorization: process.env.PAYMENT_API_TOKEN,
    },
    data: JSON.stringify(req.body),
  });

  res.setHeader("Content-Type", "application/json");
  res.json(resp);
};

export default paymentHandler;
