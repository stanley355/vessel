import fetcher from "../../../lib/fetcher";
import { NextApiRequest, NextApiResponse } from "next";

const createSubscriptionHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const URL = `${process.env.PAYMENT_URL}/invoice/`;

  let response: any;
  try {
    const res = await fetcher(URL, {
      method: "POST",
      data: JSON.stringify(req.body),
    });

    response = res.data ?? { error: "Bad Request" };
  } catch (err) {
    response = err;
  }

  res.setHeader("Content-Type", "application/json");
  res.json(response);
};

export default createSubscriptionHandler;
