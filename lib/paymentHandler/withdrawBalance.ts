import getConfig from "next/config";
import fetcher from "../fetcher";

interface IWithdrawBalance {
  userID: string;
  userName: string;
  userEmail: string;
  bankName: string;
  bankAccount: string;
  accountHolderName: string;
  amount: string;
}

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const withdrawBalance = async (payload: IWithdrawBalance) => {
  const balanceRes = await fetcher(`${KONTENKU_URL}/api/payment/balance/`, {
    method: "PUT",
    data: payload,
  });

  return balanceRes;
};

export default withdrawBalance;
