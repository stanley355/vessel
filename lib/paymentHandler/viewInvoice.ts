import getConfig from "next/config";
import fetcher from "../fetcher";

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const viewInvoice = async (invoiceID: string) => {
  const URL = `${KONTENKU_URL}/api/payment/invoice/view?invoiceID=${invoiceID}`;

  const invoiceRes = await fetcher(URL, {});

  return invoiceRes;
};

export default viewInvoice;
