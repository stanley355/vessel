import fetcher from "../../../lib/fetcher";
import NextCors from "nextjs-cors";
import { NextApiRequest, NextApiResponse } from "next";

const dokuNotificationHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  let response = {};

  if (req.body && req.body.order) {
    const orderURL = `${process.env.PAYMENT_URL}/v2/order/paid?orderID=${req.body.order.invoice_number}`;

    const orderRes = await fetcher(orderURL, {
      method: "PUT",
      headers: {
        Authorization: process.env.PAYMENT_API_TOKEN,
      },
      data: JSON.stringify(req.body),
    });

    if (orderRes && orderRes.id) {
      const authorURL = `${process.env.AUTHOR_URL}/subscriptions/`;

      const authorPayload = {
        user_id: orderRes.subscriber_id,
        channels_id: orderRes.channel_id,
        duration: orderRes.subscription_duration,
      };
      response = await fetcher(authorURL, {
        method: "POST",
        data: JSON.stringify(authorPayload),
      });
    }

  }
  res.setHeader("Content-Type", "application/json");
  res.json(response);
};

export default dokuNotificationHandler;
