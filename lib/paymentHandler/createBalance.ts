import getConfig from "next/config";
import fetcher from "../fetcher";

interface ICreateBalance {
  userID: string;
  userName: string;
}

const { BASE_URL } = getConfig().publicRuntimeConfig;

const createBalance = async (payload: ICreateBalance) => {
  const balanceRes = await fetcher(`${BASE_URL}/api/payment/balance/`, {
    method: "POST",
    data: payload,
  });

  return balanceRes; 
};

export default createBalance;