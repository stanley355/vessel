import fetcher from "../../../lib/fetcher";
import { NextApiRequest, NextApiResponse } from "next";
import generateDokuSignatureKey from "../../../lib/doku/generateDokuSignatureKey";

const dokuStatusHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const URL = `${process.env.DOKU_API_URL}/v1/status/${req.body.order_id}`;

  const resp = await fetcher(URL, {
    method: "GET",
    headers: {
      "Client-Id": process.env.DOKU_CLIENT_ID,
      "Request-Id": req.body.order_id,
      "Request-Timestamp": new Date().toISOString(),
      Signature: `HMACSHA256=${generateDokuSignatureKey(req.body)}`,
    },
    data: JSON.stringify(req.body.doku_payload),
  });

  res.setHeader("Content-Type", "application/json");
  res.json(resp);
};

export default dokuStatusHandler;
