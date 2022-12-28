import getConfig from "next/config";
import fetcher from "../fetcher";

interface IUpdateChannelData {
  channelID: number;
  channelName?: number;
  subscriptionPrice?: number;
  profileImgUrl?: string;
}

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

export const updateChannelData = async (payload: IUpdateChannelData) => {
  const URL = `${KONTENKU_URL}/api/channel/`;

  const channelRes = await fetcher(URL, {
    method: "PUT",
    data: {
      channel_id: payload.channelID,
      ...(payload.channelName && { channel_name: payload.channelName }),
      ...(payload.subscriptionPrice && {
        subscription_price: Number(payload.subscriptionPrice),
      }),
      ...(payload.profileImgUrl && { profile_img_url: payload.profileImgUrl }),
    },
  });

  return channelRes;
};
