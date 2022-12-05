import getConfig from "next/config";
import fetcher from "../fetcher";

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const findAllUserWithdrawal = async (userID: string) => {
  const withdrawalRes = await fetcher(
    `${KONTENKU_URL}/api/payment/withdrawal/user?userID=${userID}`,
    {}
  );

  return withdrawalRes;
};

export default findAllUserWithdrawal;
