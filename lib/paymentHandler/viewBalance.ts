import getConfig from "next/config";
import fetcher from "../fetcher";

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const viewBalance = async (userID: string) => {
  const URL = `${KONTENKU_URL}/api/payment/balance/?userID=${userID}`;

  const balanceRes = await fetcher(URL, {});

  return balanceRes;
};

export default viewBalance;
