import getConfig from "next/config";
import fetcher from "../fetcher";

const { BASE_URL } = getConfig().publicRuntimeConfig;

const viewInvoice = async (invoiceID: string) => {
  const URL = `${BASE_URL}/api/payment/invoice/view?invoiceID=${invoiceID}`;

  const invoiceRes = await fetcher(URL, {});

  return invoiceRes;
};

export default viewInvoice;
