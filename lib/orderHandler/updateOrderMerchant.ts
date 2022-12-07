import getConfig from "next/config";
import fetcher from "../fetcher";

interface IUpdateOrderMerchant {
  orderID: string;
  merchant: string;
  merchantOrderID?:string;
  merchantPaymentLink?:string;
  merchantVAnumber?: string;
  expiredAt?: string;
}

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const updateOrderMerchant = async (payload: IUpdateOrderMerchant) => {
  const orderRes = await fetcher(`${KONTENKU_URL}/api/payment/order/`, {
    method: "PUT",
    data: JSON.stringify(payload),
  });

  return orderRes;
};

export default updateOrderMerchant;
