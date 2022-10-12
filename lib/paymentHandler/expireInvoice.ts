import getConfig from "next/config";
import fetcher from "../fetcher";

const { BASE_URL } = getConfig().publicRuntimeConfig;

const expireInvoice = async (invoiceID: number) => {
  const res = await fetcher(
    `${BASE_URL}/api/payment/expire-invoice?invoiceID=${invoiceID}`,
    {
      method: "POST",
    }
  );

  if (res && res.data) {
    return res.data;
  } else {
    return null;
  }
};

export default expireInvoice;
