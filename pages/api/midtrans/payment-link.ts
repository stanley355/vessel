import fetcher from "../../../lib/fetcher";
import { NextApiRequest, NextApiResponse } from "next";

const midtransPaymentLinkHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const URL = `${process.env.MIDTRANS_API_URL}/v1/payment-links/`;

  const resp = await fetcher(URL, {
    method: req.method,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${process.env.MIDTRANS_API_KEY}`
    },
    data: JSON.stringify(req.body),
  });

  res.setHeader("Content-Type", "application/json");
  res.json(resp);
};

export default midtransPaymentLinkHandler;
