import fetcher from "../../../lib/fetcher";
import { NextApiRequest, NextApiResponse } from "next";

const channelSubscriberHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const URL = `${process.env.CHANNEL_URL}/channel/subscribers/?channel_id=${String(
    req.query.channelID
  )}`;

  const resp = await fetcher(URL, {
    method: req.method,
  });

  res.setHeader("Content-Type", "application/json");
  res.json(resp);
};

export default channelSubscriberHandler;
