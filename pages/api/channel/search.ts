import fetcher from "../../../lib/fetcher";
import { NextApiRequest, NextApiResponse } from "next";

const searhChannelHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const URL = `${process.env.CHANNEL_URL}/channel/search/?channel_name=${req.query.channelName}`;

  const resp = await fetcher(URL, {
    method: "GET",
    data: {},
  });

  res.setHeader("Content-Type", "application/json");
  res.json(resp);
};

export default searhChannelHandler;
