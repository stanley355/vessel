import getConfig from "next/config";
import fetcher from "../fetcher";

interface ICreateOrder {
  channelID: number;
  subscriberID: string;
  subscriptionDuration: number;
  amount: number;
}

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const createOrder = async (payload: ICreateOrder) => {
  const orderRes = await fetcher(`${KONTENKU_URL}/api/payment/order/`, {
    method: "POST",
    data: JSON.stringify(payload),
  });

  return orderRes;
};

export default createOrder;
