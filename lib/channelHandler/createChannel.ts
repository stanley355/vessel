import getConfig from "next/config";
import fetcher from "../fetcher";

const { BASE_URL } = getConfig().publicRuntimeConfig;

interface ICreateChannel {
  userID: string;
  channelName: string;
  subscriptionPrice: number;
}

const createChannel = async (data: ICreateChannel) => {
  const payload = {
    owner_id: data.userID,
    channel_name: data.channelName,
    subscription_price: data.subscriptionPrice,
  };

  const createChannelRes = await fetcher(`${BASE_URL}/channel`, {
    method: "POST",
    data: payload,
  });

  console.log("Output", createChannelRes);
};

export default createChannel;
