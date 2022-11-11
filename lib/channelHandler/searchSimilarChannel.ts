import getConfig from "next/config";
import fetcher from "../fetcher";

const { BASE_URL } = getConfig().publicRuntimeConfig;

const searchSimilarChannel = async (channelName: string) => {
  const URL = `${BASE_URL}/api/channel/search?channelName=${channelName}`;
  const similarChannel = await fetcher(URL, {});

  return similarChannel;
};

export default searchSimilarChannel;
