import getConfig from "next/config";
import fetcher from "../fetcher";

interface ICreateInvoice {
  externalID: string;
  userFullname: string;
  userEmail: string;
  description: string;
  amount: number;
}

const { BASE_URL } = getConfig().publicRuntimeConfig;

const createInvoice = async (data: ICreateInvoice) => {
  const payload = {
    externalID: data.externalID,
    payerEmail: data.userEmail,
    description: data.description,
    amount: data.amount,
  };

  const invoiceRes = await fetcher(`${BASE_URL}/api/payment/create-invoice/`, {
    method: "POST",
    data: payload,
  });

  return invoiceRes;
};

export default createInvoice;
