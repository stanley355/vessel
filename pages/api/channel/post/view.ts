import fetcher from "../../../../lib/fetcher";
import { NextApiRequest, NextApiResponse } from "next";

const viewPostHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const URL = `${process.env.CHANNEL_URL}/post/?slug=${req.query.slug}`;

  const resp = await fetcher(URL, {});

  res.setHeader("Content-Type", "application/json");
  res.json(resp);
};

export default viewPostHandler;
