import fetcher from "../../../../lib/fetcher";
import { NextApiRequest, NextApiResponse } from "next";

const balanceHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const URL = `${process.env.PAYMENT_URL}/balance/`;

  const resp = await fetcher(URL, {
    method: req.method,
    headers: {
      "Authorization": process.env.PAYMENT_API_TOKEN
    },
    data: JSON.stringify(req.body),
  });

  res.setHeader("Content-Type", "application/json");
  res.json(resp);
};

export default balanceHandler;
