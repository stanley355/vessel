import CryptoJS from "crypto-js";
import { NextApiRequest, NextApiResponse } from "next";

const withdrawalAdminHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {

  const admin = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  };

  const encpyted = CryptoJS.AES.encrypt(JSON.stringify(admin), process.env.ADMIN_CRYPTO_SECRET ?? "").toString();

  res.setHeader("Content-Type", "application/json");
  res.json(encpyted);
};

export default withdrawalAdminHandler;
