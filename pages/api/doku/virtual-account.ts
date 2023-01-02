import fetcher from "../../../lib/fetcher";
import { NextApiRequest, NextApiResponse } from "next";
import generateDokuSignatureKey from "../../../lib/doku/generateDokuSignatureKey";

const dokuVAHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const URL = `${process.env.DOKU_API_URL}${req.body.doku_va_path}`;

  const resp = await fetcher(URL, {
    method: "POST",
    headers: {
      "Client-Id": process.env.DOKU_CLIENT_ID,
      "Request-Id": req.body.order_id,
      "Request-Timestamp": new Date().toISOString(),
      Signature: `HMACSHA256=${generateDokuSignatureKey(
        req.body.doku_payload
      )}`,
    },
    data: JSON.stringify(req.body.doku_payload),
  });

  res.setHeader("Content-Type", "application/json");
  res.json(resp);
};

export default dokuVAHandler;
