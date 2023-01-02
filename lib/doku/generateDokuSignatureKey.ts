import sha256 from "crypto-js/sha256";
import hmacSHA256 from "crypto-js/hmac-sha256";
import Base64 from "crypto-js/enc-base64";

interface IReqBody {
  order_id: string;
  doku_va_path: string;
  doku_payload: any;
}

// WARNING! Must be called on server side
const generateDokuSignatureKey = (payload: IReqBody) => {
  const clientID = `Client-Id:${process.env.DOKU_CLIENT_ID}`;
  const reqID = `Request-Id:${payload.order_id}`;
  const reqTimestamp = `Request-Timestamp:${new Date().toISOString()}`;
  const reqTarget = `Request-Target:${payload.doku_va_path}`;

  const hashDigest = sha256(payload.doku_payload);
  const hmacDigest = Base64.stringify(hashDigest);
  const digest = `Digest:${hmacDigest}`;

  const signatureString =
    clientID +
    "\n" +
    reqID +
    "\n" +
    reqTimestamp +
    "\n" +
    reqTarget +
    "\n" +
    digest;

  const privateKey = process.env.DOKU_SECRET_KEY ?? "";
  const hmacSignature = Base64.stringify(
    hmacSHA256(signatureString, privateKey)
  );

  return hmacSignature;
};

export default generateDokuSignatureKey;
