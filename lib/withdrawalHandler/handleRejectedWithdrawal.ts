import getConfig from "next/config";
import Router from "next/router";
import fetcher from "../fetcher";

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const handleRejectedWithdrawal = async (withdrawal: any, message: string) => {
  const URL = `${KONTENKU_URL}/api/payment/withdrawal/`;
  const withdrawalRes = await fetcher(URL, {
    method: "PUT",
    data: {
      withdrawalID: withdrawal.id,
      status: "REJECTED",
      message: message,
    },
  });

  if (withdrawalRes.status === "REJECTED") {
    Router.reload();
  } else {
    alert("Withdrawal Update fail");
    return "";
  }
};

export default handleRejectedWithdrawal;
