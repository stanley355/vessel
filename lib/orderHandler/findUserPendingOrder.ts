import getConfig from "next/config";
import fetcher from "../fetcher";

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const findUserPendingOrder = async (userID: string) => {
  const orderRes = await fetcher(
    `${KONTENKU_URL}/api/payment/order/user-pending?subscriberID=${userID}`,
    {}
  );

  return orderRes;
};

export default findUserPendingOrder;
