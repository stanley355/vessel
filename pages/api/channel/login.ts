import fetcher from "../../../lib/fetcher";
import { NextApiRequest, NextApiResponse } from "next";

const channelLoginHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const URL = `${process.env.CHANNEL_URL}/channel/?owner_id=${req.query.owner_id}`;

  const resp = await fetcher(URL, {
    method: "GET",
  });

  res.setHeader("Content-Type", "application/json");
  res.json(resp);
};

export default channelLoginHandler;
