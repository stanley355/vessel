import getConfig from "next/config";
import Router from "next/router";
import fetcher from "../fetcher";

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const handleAcceptedWithdrawal = async (withdrawal: any) => {
  const URL = `${KONTENKU_URL}/api/payment/withdrawal/`;
  const withdrawalRes = await fetcher(URL, {
    method: "PUT",
    data: {
      withdrawalID: withdrawal.id,
      status: "SUCCESS",
      message: `Telah di transfer pada ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
    },
  });

  if (withdrawalRes.status === "SUCCESS") {
    Router.reload();
  } else {
    alert("Withdrawal Update fail");
    return "";
  }
};

export default handleAcceptedWithdrawal;
