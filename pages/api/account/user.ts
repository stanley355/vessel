import fetcher from "../../../lib/fetcher";
import { NextApiRequest, NextApiResponse } from "next";

const userHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const URL = `${process.env.AUTHOR_URL}/users/`;

  let response: any;
  try {
    const res = await fetcher(URL, {
      method: req.method,
      data: JSON.stringify(req.body),
    });

    response = res.data;
  } catch (err) {
    response = err;
  }

  res.setHeader("Content-Type", "application/json");
  res.json(response);
};

export default userHandler;