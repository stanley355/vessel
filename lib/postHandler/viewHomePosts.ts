import getConfig from "next/config";
import fetcher from "../fetcher";

const { BASE_URL } = getConfig().publicRuntimeConfig;

const viewHomePosts = async (subscriptions: any[]) => {
  const URL = `${BASE_URL}/api/channel/post/home/`;

  const postRes = await fetcher(URL, {
    data: {
      subscriptions,
    },
  });

  return postRes;
};

export default viewHomePosts;
