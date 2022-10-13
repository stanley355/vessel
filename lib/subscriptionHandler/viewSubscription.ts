import getConfig from "next/config";
import fetcher from "../fetcher";

interface IViewSubscription {
  userID: string;
  channelID: number;
  invoiceID?: string;
}

const { BASE_URL } = getConfig().publicRuntimeConfig;

const viewSubscription = async (body: IViewSubscription) => {
  const payload = {
    user_id: body.userID,
    channels_id: body.channelID,
    ...(body.invoiceID && { invoice_id: body.invoiceID }),
  };

  const { data } = await fetcher(`${BASE_URL}/api/subscription/view/`, {
    method: "POST",
    data: payload,
  });

  return data;
};

export default viewSubscription;
