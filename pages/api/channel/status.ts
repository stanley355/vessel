import fetcher from "../../../lib/fetcher";
import { NextApiRequest, NextApiResponse } from "next";

const channelStatus = async (req: NextApiRequest, res: NextApiResponse) => {
  const URL = `${process.env.CHANNEL_URL}/channel/?slug=${req.query.slug}`;

  let response: any;
  try {
    const res = await fetcher(URL, {
      method: 'GET'
    });
    response = res.data;
  } catch (err) {
    response = err;
  }

  res.setHeader("Content-Type", "application/json");
  res.json(response);
};

export default channelStatus;
