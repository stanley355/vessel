import { NextApiRequest, NextApiResponse } from "next";

const withdrawalAdminHandler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.headers.authorization === process.env.PAYMENT_API_TOKEN) {
    const admin = {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    };

    res.setHeader("Content-Type", "application/json");
    res.json(admin);
  } else {
    res.setHeader("Content-Type", "application/json");
    res.json({});
  }
};

export default withdrawalAdminHandler;
