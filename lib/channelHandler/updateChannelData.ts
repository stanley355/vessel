import getConfig from "next/config";
import fetcher from "../fetcher";

interface IUpdateChannelData {
  channelID: number;
  channelName?: number;
  subscriptionPrice?: number;
  profileImgURL?: number;
}

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const updateChannelData = async (payload: IUpdateChannelData) => {
  const URL = `${KONTENKU_URL}/api/channel/`;

  const channelRes = await fetcher(URL, {
    method: "PUT",
    data: {
      channel_id: payload.channelID,
      ...(payload.channelName && { channel_name: payload.channelName }),
      ...(payload.subscriptionPrice && {
        subscription_price: payload.subscriptionPrice,
      }),
      ...(payload.profileImgURL && { profile_img_url: payload.profileImgURL }),
    },
  });

  return channelRes;
};

export default updateChannelData;
