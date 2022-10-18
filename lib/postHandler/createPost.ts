import getConfig from "next/config";
import Router from "next/router";
import { WARNING_MSG } from "../warning-messages";
import fetcher from "../fetcher";

interface ICreatePost {
  channelID: number;
  channelSlug: string;
  downloadURL: string;
  description: string;
  postType: string;
  isFree: boolean;
}

const { BASE_URL } = getConfig().publicRuntimeConfig;

const createPost = async (payload: ICreatePost) => {
  const data = {
    channels_id: payload.channelID,
    channels_slug: payload.channelSlug,
    img_url: payload.downloadURL,
    description: payload.description,
    post_type: payload.postType,
    is_free: payload.isFree,
  };

  const postRes = await fetcher(`${BASE_URL}/api/channel/post/`, {
    method: "POST",
    data: data,
  });

  return postRes;
};

export default createPost;
