import getConfig from "next/config";
import fetcher from "../fetcher";

interface ICreateInvoice {
  externalID: string;
  payerEmail: string;
  description: string;
  amount: number;
}

const { BASE_URL } = getConfig().publicRuntimeConfig;

const createInvoice = async (payload: ICreateInvoice) => {
  const invoiceRes = await fetcher(`${BASE_URL}/api/payment/invoice/`, {
    method: "POST",
    data: payload,
  });

  return invoiceRes;
};

export default createInvoice;
