import getConfig from "next/config";
import fetcher from "../fetcher";

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const viewHomePosts = async (subscriptions: any[]) => {
  const URL = `${KONTENKU_URL}/api/channel/post/home/`;

  const postRes = await fetcher(URL, {
    data: {
      subscriptions,
    },
  });

  return postRes;
};

export default viewHomePosts;
