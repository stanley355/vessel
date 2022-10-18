import getConfig from "next/config";
import fetcher from "../fetcher";

const { BASE_URL } = getConfig().publicRuntimeConfig;

interface IFindChannel {
  slug: string;
}

const findChannel = async (slug: string) => {
  const URL = `${BASE_URL}/api/channel/status?slug=${slug}`;
  const findChannelRes = await fetcher(URL, {});

  return findChannelRes;
};

export default findChannel;
