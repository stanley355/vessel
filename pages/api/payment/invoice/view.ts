import fetcher from "../../../../lib/fetcher";
import { NextApiRequest, NextApiResponse } from "next";

const invoiceHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const URL = `${process.env.PAYMENT_URL}/invoice/?invoiceID=${req.query.invoiceID}`;

  const resp = await fetcher(URL, {
    method: "GET",
    headers: {
      "Authorization": process.env.PAYMENT_API_TOKEN,
    },
    data: JSON.stringify(req.body),
  });

  res.setHeader("Content-Type", "application/json");
  res.json(resp);
};

export default invoiceHandler;
