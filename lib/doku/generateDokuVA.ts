import { profile } from "console";
import getConfig from "next/config";
import fetcher from "../fetcher";
import generateDokuVApath from "./generateDokuVApath";

const generateUniqueReference = (orderID: string) => {
  const orderIDarr = orderID.split("-");

  return orderIDarr[0] + "-" + new Date().getSeconds();
};

interface IDokuVA {
  bankName: string;
  profile: any;
  channel: string;
  order: any;
}

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const generateDokuVA = async (payload: IDokuVA) => {
  const dokuPayload = {
    "order": {
      "invoice_number": payload.order.id,
      "amount": payload.order.amount,
    },
    "virtual_account_info": {
      "expired_time": 60 * 24, //One day
      "reusable_status": false,
      "info1": `${payload.channel} Subscription`,
      ...(payload.bankName === "BNI" && {
        "merchant_unique_reference": generateUniqueReference(payload.order.id),
      }),
    },
    "customer": {
      "name": payload.profile.fullname,
      "email": payload.profile.email,
    },
  };

  const apiPayload = {
    order_id: payload.order.id,
    doku_va_path: generateDokuVApath(payload.bankName),
    doku_payload: dokuPayload,
  };

  const abc = await fetcher(`${KONTENKU_URL}/api/doku/virtual-account/`, {
    method: "POST",
    data: apiPayload,
  });

  console.log(333, abc);
  return abc;
};

export default generateDokuVA;
