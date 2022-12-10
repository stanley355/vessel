import getConfig from "next/config";
import fetcher from "../fetcher";

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const findSubscribedChannel = async (subscriptions: any[]) => {
  const date = new Date();
  const subscriptionsList = subscriptions.map((subs: any) => {
    const isExpired = date.getTime() > new Date(subs.expired_at).getTime();
    if (!isExpired) return Number(subs.channels_id);
  });

  const URL = `${KONTENKU_URL}/api/channel/subscriptions/`;
  const channelRes = await fetcher(URL, {
    data: {
      id_list: subscriptionsList,
    },
  });

  return channelRes;
};

export default findSubscribedChannel;
