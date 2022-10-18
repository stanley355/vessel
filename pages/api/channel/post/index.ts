import fetcher from "../../../../lib/fetcher";
import { NextApiRequest, NextApiResponse } from "next";

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const URL = `${process.env.CHANNEL_URL}/post/`;

  const resp = await fetcher(URL, {
    method: req.method,
    data: JSON.stringify(req.body),
  });

  res.setHeader("Content-Type", "application/json");
  res.json(resp);
};

export default postHandler;
