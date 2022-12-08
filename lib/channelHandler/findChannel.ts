import getConfig from "next/config";
import fetcher from "../fetcher";

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const findChannel = async (slug: string) => {
  const URL = `${KONTENKU_URL}/api/channel/status?slug=${slug}`;
  const findChannelRes = await fetcher(URL, {});

  return findChannelRes;
};

export default findChannel;
