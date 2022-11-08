import getConfig from "next/config";
import fetcher from "../fetcher";

const { BASE_URL } = getConfig().publicRuntimeConfig;

const updateChannelSubscriber = async (channelID: number) => {
  const URL = `${BASE_URL}/api/channel/subscribers?channelID=${channelID}`;
  const channelRes = await fetcher(URL, {
    method: "PUT",
  });

  return channelRes;
};

export default updateChannelSubscriber;
