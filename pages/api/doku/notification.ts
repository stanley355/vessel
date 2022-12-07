import fetcher from "../../../lib/fetcher";
import { NextApiRequest, NextApiResponse } from "next";

const dokuNotificationHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  let response = {};

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

  res.setHeader("Content-Type", "application/json");
  res.json(response);
};

export default dokuNotificationHandler;
