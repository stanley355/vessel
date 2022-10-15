import getConfig from "next/config";
import fetcher from "../fetcher";

const { BASE_URL } = getConfig().publicRuntimeConfig;

const viewInvoice = async (invoiceID: number) => {
  const invoceRes = await fetcher(
    `${BASE_URL}/api/payment/view-invoice?invoiceID=${invoiceID}`,
    {
      method: "GET",
    }
  );

  return invoceRes;
};

export default viewInvoice;
