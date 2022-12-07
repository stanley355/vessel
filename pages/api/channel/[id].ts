import fetcher from "../../../lib/fetcher";
import { NextApiRequest, NextApiResponse } from "next";

const findChannelByIDHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const URL = `${process.env.CHANNEL_URL}/channel/?id=${req.query.id}`;

  const resp = await fetcher(URL, {
    method: "GET",
  });

  res.setHeader("Content-Type", "application/json");
  res.json(resp);
};

export default findChannelByIDHandler;
