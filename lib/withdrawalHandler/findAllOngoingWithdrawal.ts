import getConfig from "next/config";
import fetcher from "../fetcher";

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const findAllOngoingWithdrawal = async () => {
  const withdrawalRes = await fetcher(
    `${KONTENKU_URL}/api/payment/withdrawal/ongoing/`,
    {}
  );

  return withdrawalRes;
};

export default findAllOngoingWithdrawal;
