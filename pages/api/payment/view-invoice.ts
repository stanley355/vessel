import fetcher from "../../../lib/fetcher";
import { NextApiRequest, NextApiResponse } from "next";

const expireInvoice = async (req: NextApiRequest, res: NextApiResponse) => {
  const URL = `${process.env.PAYMENT_URL}/invoice?invoiceID=${req.query.invoiceID}`;

  let response: any;
  try {
    const res = await fetcher(URL, {
      method: "GET",
    });

    response = res.data;
  } catch (err) {
    response = err;
  }

  res.setHeader("Content-Type", "application/json");
  res.json(response);
};

export default expireInvoice;