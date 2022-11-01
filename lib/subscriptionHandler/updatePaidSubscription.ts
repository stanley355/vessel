import getConfig from "next/config";
import fetcher from "../fetcher";

interface IUpdateSubscription {
  userID: string;
  channelID: number;
  invoiceID: string;
}

const { BASE_URL } = getConfig().publicRuntimeConfig;

const updatePaidSubscription = async (payload: IUpdateSubscription) => {
  const URL = `${BASE_URL}/api/subscriptions/paid/`;

  const subscriptionRes = await fetcher(URL, {
    method: "PUT",
    data: {
      user_id: payload.userID,
      channels_id: payload.channelID,
      invoice_id: payload.invoiceID,
    },
  });

  return subscriptionRes;
};

export default updatePaidSubscription;
