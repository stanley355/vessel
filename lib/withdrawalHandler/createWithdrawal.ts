import getConfig from "next/config";
import fetcher from "../fetcher";

interface ICreateWithdrawal {
  userID: string;
  bankName: "BCA" | "GO_PAY";
  accountNumber: string;
  accountOwnerName: string;
  amount: number;
}

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const createWithdrawal = async (payload: ICreateWithdrawal) => {
  const withdrawalRes = await fetcher(
    `${KONTENKU_URL}/api/payment/withdrawal/`,
    {
      method: "POST",
      data: JSON.stringify(payload),
    }
  );

  return withdrawalRes;
};

export default createWithdrawal;
