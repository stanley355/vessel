import getConfig from "next/config";
import fetcher from "../fetcher";

interface IUpdateBalanceChannel {
  userID: string;
  channelID: number;
  channelName: string;
}

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const updateBalanceChannel = async (payload: IUpdateBalanceChannel) => {
  const balanceRes = await fetcher(`${KONTENKU_URL}/api/payment/balance/channel/`, {
    method: "PUT",
    data: payload,
  });

  return balanceRes;
};

export default updateBalanceChannel;
