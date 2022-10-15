import getConfig from "next/config";
import fetcher from "../fetcher";

const { BASE_URL } = getConfig().publicRuntimeConfig;

const expireInvoice = async (invoiceID: number) => {
  const invoiceRes = await fetcher(
    `${BASE_URL}/api/payment/expire-invoice?invoiceID=${invoiceID}`,
    {
      method: "POST",
    }
  );

  return invoiceRes;
};

export default expireInvoice;
