import getConfig from "next/config";
import fetcher from "../fetcher";

interface ICreateSubscription {
  userID: string;
  channelID: number;
  channelSlug: string;
  duration: number;
  invoiceID: string;
  channelName: string;
}

const { BASE_URL } = getConfig().publicRuntimeConfig;

const createSubscription = async (payload: ICreateSubscription) => {
  const data = {
    user_id: payload.userID,
    channels_id: payload.channelID,
    channels_slug: payload.channelSlug,
    duration: payload.duration,
    invoice_id: payload.invoiceID,
    channels_name: payload.channelName,
  }

  const subscriptionRes = await fetcher(`${BASE_URL}/api/subscriptions/`, {
    method: "POST",
    data: data,
  });

  return subscriptionRes;
};

export default createSubscription;
