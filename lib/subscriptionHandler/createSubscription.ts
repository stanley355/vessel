import getConfig from "next/config";
import fetcher from "../fetcher";

interface ICreateSubscription {
  userID: string;
  channelID: number;
  channelSlug: string;
  duration: number;
  invoiceID: string;
}

const { BASE_URL } = getConfig().publicRuntimeConfig;

const createSubscription = async (data: ICreateSubscription) => {
  const payload = {
    user_id: data.userID,
    channels_id: Number(data.channelID),
    channels_slug: data.channelSlug,
    duration: Number(data.duration),
    invoice_id: data.invoiceID
  };

  const res = await fetcher(`${BASE_URL}/api/subscription/create/`, {
    method: "POST",
    data: payload,
  });

  if (res && res.data) {
    return res.data
  } else {
    return null;
  }
};

export default createSubscription;
