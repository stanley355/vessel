import fetcher from "../../../../lib/fetcher";
import { NextApiRequest, NextApiResponse } from "next";

const invoiceHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const URL = `${process.env.PAYMENT_URL}/invoice/?invoiceID=${req.query.invoiceID}`;

  const resp = await fetcher(URL, {
    method: "GET",
    data: JSON.stringify(req.body),
  });

  console.log(212, resp);

  res.setHeader("Content-Type", "application/json");
  res.json(resp);
};

export default invoiceHandler;
