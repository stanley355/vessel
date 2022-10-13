import getConfig from "next/config";
import fetcher from "../fetcher";

const { BASE_URL } = getConfig().publicRuntimeConfig;

const viewInvoice = async (invoiceID: number) => {
  const res = await fetcher(
    `${BASE_URL}/api/payment/view-invoice?invoiceID=${invoiceID}`,
    {
      method: "GET",
    }
  );

  if (res && res.data) {
    return res.data;
  } else {
    return null;
  }
};

export default viewInvoice;
