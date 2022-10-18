import getConfig from "next/config";
import fetcher from "../fetcher";

const { BASE_URL } = getConfig().publicRuntimeConfig;

const viewPost = async (slug: string) => {
  const URL = `${BASE_URL}/api/channel/post/view?slug=${slug}`;

  const postRes = await fetcher(URL, {});

  return postRes;
};

export default viewPost;
