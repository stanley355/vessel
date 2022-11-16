import getConfig from "next/config";
import fetcher from "../fetcher";

interface ICreatePayment {
  channelID: number;
  channelName: string;
  subscriberID: string;
  subscriberName: string;
  subscriptionDuration: number;
  totalAmount: number;
}

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const createPayment = async (payload: ICreatePayment) => {
  const paymentRes = await fetcher(`${KONTENKU_URL}/api/payment/`, {
    method: "POST",
    data: payload,
  });

  return paymentRes;
};

export default createPayment;
