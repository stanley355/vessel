import fetcher from "../../../lib/fetcher";
import { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const URL = `${process.env.AUTHOR_URL}/login/gmail/`;

  let response: any;
  try {
    const res = await fetcher(URL, {
      method: "POST",
      data: JSON.stringify(req.body),
    });

    response = res.data;
  } catch (err) {
    response = err;
  }

  res.setHeader("Content-Type", "application/json");
  res.json(response);
};

export default loginHandler;
