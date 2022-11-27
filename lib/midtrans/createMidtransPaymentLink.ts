import getConfig from "next/config";
import fetcher from "../fetcher";

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

interface ICreateChannel {
  userID: string;
  channelName: string;
  subscriptionPrice: number;
  profileImgURL: string;
}

const createChannel = async (data: ICreateChannel) => {
  const payload = {
    owner_id: data.userID,
    channel_name: data.channelName,
    subscription_price: data.subscriptionPrice,
    profile_img_url: data.profileImgURL,
  };

  const createChannelRes = await fetcher(`${KONTENKU_URL}/api/channel/`, {
    method: "POST",
    data: payload,
  });

  return createChannelRes;
};

export default createChannel;


// {
//   "transaction_details": {
//     "order_id": "001",
//     "gross_amount": 190000,
//     "payment_link_id": "for-payment-123"
//   },
//   "credit_card": {
//     "secure": true
//   },
//   "usage_limit":  1,
//   "expiry": {
//     "start_time": "2022-04-01 18:00 +0700",
//     "duration": 20,
//     "unit": "days"
//   },
//   "enabled_payments": [
//     "credit_card",
//     "bca_va",
//     "indomaret"
//   ],
//   "item_details": [
//     {
//       "id": "pil-001",
//       "name": "Pillow",
//       "price": 95000,
//       "quantity": 2,
//       "brand": "Midtrans",
//       "category": "Furniture",
//       "merchant_name": "PT. Midtrans"
//     }
//   ],
//   "customer_details": {
//     "first_name": "John",
//     "last_name": "Doe",
//     "email": "john.doe@midtrans.com",
//     "phone": "+62181000000000",
//     "notes": "Thank you for your purchase. Please follow the instructions to pay."
//   },
// "custom_field1": "custom field 1 content", 
// "custom_field2": "custom field 2 content", 
// "custom_field3": "custom field 3 content"
// }