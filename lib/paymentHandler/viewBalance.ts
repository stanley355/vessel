import getConfig from "next/config";
import fetcher from "../fetcher";

const { BASE_URL } = getConfig().publicRuntimeConfig;

const viewBalance = async (userID: string) => {
  const URL = `${BASE_URL}/api/payment/balance/?userID=${userID}`;

  const balanceRes = await fetcher(URL, {});

  return balanceRes;
};

export default viewBalance;
