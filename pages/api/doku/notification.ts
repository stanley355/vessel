import fetcher from "../../../lib/fetcher";
import NextCors from "nextjs-cors";
import { NextApiRequest, NextApiResponse } from "next";

const dokuNotificationHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  console.log(111, req.body);
  await NextCors(req, res, {
    methods: ["POST"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  let response = {};


    console.log(222, req.body);
  if (req.body && req.body.order) {
    const orderURL = `${process.env.PAYMENT_URL}/v2/order/paid?orderID=${req.body.order.invoice_number}`;

    const orderRes = await fetcher(orderURL, {
      method: "PUT",
      headers: {
        Authorization: process.env.PAYMENT_API_TOKEN,
      },
      data: JSON.stringify(req.body),
    });


    console.log(333, orderRes);
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


    console.log(444, response);
  }
  res.setHeader("Content-Type", "application/json");
  res.json(response);
};

export default dokuNotificationHandler;
