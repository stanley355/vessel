import getConfig from "next/config";
import fetcher from "../fetcher";

const { BASE_URL } = getConfig().publicRuntimeConfig;

interface ICreateChannel {
  userID: string;
  channelName: string;
  subscriptionPrice: number;
  profileImgURL: string;
}

const createChannel = async (data: ICreateChannel) => {
  const payload = {
    owner_id: data.userID,
    channel_name: data.channelName,
    subscription_price: data.subscriptionPrice,
    profile_img_url: data.profileImgURL
  };

  const createChannelRes = await fetcher(`${BASE_URL}/api/channel/`, {
    method: "POST",
    data: payload,
  });

  return createChannelRes;
};

export default createChannel;
