import getConfig from "next/config";
import fetcher from "../fetcher";

interface IUpdateSubscription {
  userID: string;
  channelID: number;
  invoiceID: string;
}

const { BASE_URL } = getConfig().publicRuntimeConfig;

const updatePaidSubscription = async (body: IUpdateSubscription) => {
  const payload = {
    user_id: body.userID,
    channels_id: body.channelID,
    invoice_id: body.invoiceID,
  };

  const subsRes = await fetcher(`${BASE_URL}/api/subscription/update-paid/`, {
    method: "POST",
    data: payload,
  });

  return subsRes;
};

export default updatePaidSubscription;