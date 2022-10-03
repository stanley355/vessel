import getConfig from "next/config";
import Router from "next/router";
import { WARNING_MSG } from "../warning-messages";
import fetcher from "../fetcher";

interface ICreatePostData {
  channelID: number;
  channelSlug: string;
  downloadURL: string;
  description: string;
  postType: string;
}

const { BASE_URL } = getConfig().publicRuntimeConfig;

const createPostData = async (props: ICreatePostData) => {
  const payload = {
    channels_id: props.channelID,
    channels_slug: props.channelSlug,
    img_url: props.downloadURL,
    description: props.description,
    post_type: props.postType,
    is_free: false,
  };

  console.log(payload);

  const res = await fetcher(`${BASE_URL}/api/channel/post/`, {
    method: "POST",
    data: payload,
  });

  if (res && res.data.id) {
    Router.push(`/channel/${props.channelSlug}`);
  } else {
    alert(WARNING_MSG.TRY_AGAIN);
    return "";
  }
};

export default createPostData;
