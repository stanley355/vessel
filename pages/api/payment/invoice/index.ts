import fetcher from "../../../../lib/fetcher";
import { NextApiRequest, NextApiResponse } from "next";

const invoiceHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const URL = `${process.env.PAYMENT_URL}/invoice/`;

  const resp = await fetcher(URL, {
    method: req.method,
    data: JSON.stringify(req.body),
  });

  res.setHeader("Content-Type", "application/json");
  res.json(resp);
};

export default invoiceHandler;
