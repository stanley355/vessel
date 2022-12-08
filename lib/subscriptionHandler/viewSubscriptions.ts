import getConfig from "next/config";
import fetcher from "../fetcher";

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const viewSubscriptions = async (userID: string): Promise<any[]> => {
  const URL = `${KONTENKU_URL}/api/subscriptions/view?user_id=${userID}`;

  const subscriptionRes = await fetcher(URL, {});

  return subscriptionRes;
};

export default viewSubscriptions;
