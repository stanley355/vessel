import getConfig from "next/config";
import fetcher from "../fetcher";

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const viewPaymentsByChannel = async (channelID: number) => {
  const URL = `${KONTENKU_URL}/api/payment/channels?channelID=${channelID}`;

  const paymentRes = await fetcher(URL, {});

  return paymentRes;
};

export default viewPaymentsByChannel;
