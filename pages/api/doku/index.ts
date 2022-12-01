import fetcher from "../../../lib/fetcher";
import { NextApiRequest, NextApiResponse } from "next";
import sha256 from "crypto-js/sha256";
import hmacSHA256 from "crypto-js/hmac-sha256";
import Base64 from "crypto-js/enc-base64";

const generateSignatureKey = (payload: any) => {
  const clientID = `Client-Id:BRN-0263-1669701997867`;
  const requestID = `Request-Id:kontenku-${new Date().toISOString()}`;
  const requestTimestamp = `Request-Timestamp:${new Date().toISOString()}`;
  const reqTarget = "Request-Target:/doku-virtual-account/v2/payment-code";
  const hashDigest = sha256(payload);
  const hmacDigest = Base64.stringify(hashDigest);
  const digest = `Digest:${hmacDigest}`;

  const signatureString =
    clientID +
    "\n" +
    requestID +
    "\n" +
    requestTimestamp +
    "\n" +
    reqTarget +
    "\n" +
    digest;

  const privateKey = "SK-fanLHix4PrGbBdfBYSNw";
  const hmacSignature = Base64.stringify(
    hmacSHA256(signatureString, privateKey)
  );

  return hmacSignature;
};

const dokuHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const URL = "https://api.doku.com/doku-virtual-account/v2/payment-code/";

  const resp = await fetcher(URL, {
    method: "POST",
    headers: {
      "Client-Id": "BRN-0263-1669701997867",
      "Request-Id": `kontenku-${new Date().toISOString()}`,
      "Request-Timestamp": new Date().toISOString(),
      "Signature": `HMACSHA256=${generateSignatureKey(req.body)}`,
    },
    data: JSON.stringify(req.body),
  });

  res.setHeader("Content-Type", "application/json");
  res.json(resp);
};

export default dokuHandler;
