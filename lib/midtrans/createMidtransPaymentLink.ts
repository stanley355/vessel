import { channel } from "diagnostics_channel";
import getConfig from "next/config";
import fetcher from "../fetcher";

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

interface ICreateMidtransPaymentLink {
  orderID: string;
  user: any;
  channel: any;
  amount: any;
}

const createMidtransPaymentLink = async (data: ICreateMidtransPaymentLink) => {
  const fullnameArr = data.user.fullname.split(" ");

  const payload = {
    "transaction_details": {
      "order_id": data.orderID,
      "gross_amount": data.amount,
      "payment_link_id": data.orderID,
    },
    usage_limit: 5,
    expiry: {
      duration: 5,
      unit: "days",
    },
    enabled_payments: [
      "credit_card",
      "gopay",
      "bri_epay",
      "echannel",
      "permata_va",
      "bni_va",
      "bri_va",
    ],
    "item_details": [
      {
        "id": data.channel.id,
        "name": data.channel.channel_name,
        "price": data.amount,
        "quantity": 1,
        "brand": data.channel.channel_name,
        "category": "Content Subscription",
        "merchant_name": "Kontenku",
      },
    ],
    "customer_details": {
      "first_name": fullnameArr[0],
      "last_name": fullnameArr.length > 0 ? fullnameArr[1] : "",
      "email": data.user.email,
      "phone": "089637789023", //TODO: Change with user's phone num
      "notes":
        "Terima kasih atas dukungan Anda. Silakan ikuti petunjuk untuk pembayaran.",
    },
  };

  const midtransRes = await fetcher(
    `${KONTENKU_URL}/api/midtrans/payment-link/`,
    {
      method: "POST",
      data: payload,
    }
  );

  return midtransRes;
};

export default createMidtransPaymentLink;
