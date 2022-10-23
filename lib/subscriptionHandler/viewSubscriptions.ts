import getConfig from "next/config";
import { URLSearchParams } from "url";
import fetcher from "../fetcher";

interface IViewSubscriptions {
  userID: string;
  channelID?: number;
  invoiceID?: string;
}

const { BASE_URL } = getConfig().publicRuntimeConfig;

const viewSubscriptions = async (payload: IViewSubscriptions) => {
  const params = {
    user_id: payload.userID ?? "",
    ...(payload.channelID && { channels_id: String(payload.channelID) }),
    ...(payload.invoiceID && { invoice_id: payload.invoiceID}),
  };

  const queryString = new URLSearchParams(params);
  const URL = `${BASE_URL}/api/subscriptions/view?${queryString}`;

  const subscriptionRes = await fetcher(URL, {});

  return subscriptionRes;
};

export default viewSubscriptions;
