import getConfig from "next/config";
import fetcher from "../fetcher";

interface ICreateBalance {
  userID: string;
  userName: string;
}

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const createBalance = async (payload: ICreateBalance) => {
  const balanceRes = await fetcher(`${KONTENKU_URL}/api/payment/balance/`, {
    method: "POST",
    data: payload,
  });

  return balanceRes;
};

export default createBalance;
