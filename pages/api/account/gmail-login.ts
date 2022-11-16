import fetcher from "../../../lib/fetcher";
import { NextApiRequest, NextApiResponse } from "next";

const gmailLoginAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  const URL = `${process.env.AUTHOR_URL}/users/login/gmail/`;

  const resp = await fetcher(URL, {
    method: "POST",
    data: JSON.stringify(req.body),
  });

  res.setHeader("Content-Type", "application/json");
  res.json(resp);
};

export default gmailLoginAPI;
