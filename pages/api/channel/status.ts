import fetcher from "../../../lib/fetcher";
import { NextApiRequest, NextApiResponse } from "next";

const channelStatus = async (req: NextApiRequest, res: NextApiResponse) => {
  const URL = `${process.env.CHANNEL_URL}/channel/?slug=${req.query.slug}`;

  const resp = await fetcher(URL, {
    method: "GET",
  });

  res.setHeader("Content-Type", "application/json");
  res.json(resp);
};

export default channelStatus;
