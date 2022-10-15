import fetcher from "../../../lib/fetcher";
import { NextApiRequest, NextApiResponse } from "next";

const expireInvoice = async (req: NextApiRequest, res: NextApiResponse) => {
  const URL = `${process.env.PAYMENT_URL}/invoice/expire?invoiceID=${req.query.invoiceID}`;

  const resp = await fetcher(URL, {
    method: "POST",
  });

  res.setHeader("Content-Type", "application/json");
  res.json(resp);
};

export default expireInvoice;