import React from "react";
import Link from "next/link";
import { FaRegFrownOpen, FaAngleRight } from "react-icons/fa";
import setOrderExpiryDate from "../../../../lib/orderHandler/setOrderExpiryDate";
import isOrderExpired from "../../../../lib/orderHandler/isOrderExpired";
import styles from "./MyPendingSubscriptions.module.scss";
import checkOrderStatus from "../../../../lib/orderHandler/checkOrderStatus";

interface IMyPendingSubscriptions {
  pendingSubscriptions: any[];
}

const MyPendingSubscriptions = (props: IMyPendingSubscriptions) => {
  const { pendingSubscriptions } = props;

  const NoSubscriptions = () => (
    <div className={styles.no__subscriptions}>
      <FaRegFrownOpen />
      <div className={styles.text}>Anda Belum Berlangganan Channel Apapun</div>
    </div>
  );

  //   {
  //     "id": "6d182f8a-b7d0-426d-83f1-083ff2fa4f66",
  //     "created_at": "2022-12-06T13:56:53.000Z",
  //     "updated_at": "2022-12-06T13:56:57.158Z",
  //     "expired_at": "2022-12-07T13:56:56.000Z",
  //     "channel_id": 8,
  //     "subscriber_id": "3586a3c5-a8c3-42f4-92f8-a9a940738802",
  //     "subscription_duration": 1,
  //     "amount": 15000,
  //     "merchant": "DOKU",
  //     "merchant_order_id": "6d182f8a-b7d0-426d-83f1-083ff2fa4f66",
  //     "merchant_payment_link": "https://app.doku.com/how-to-pay/v2/doku-virtual-account/8000000000136891/cBHP52DW28mr3RXGD_IZd6sdlk7auB_T8PjRK436EoU",
  //     "status": "PENDING",
  //     "merchant_va_number": "8000000000136891"
  // }

  

  const SubscriptionsList = () => (
    <div className={styles.list}>
      {pendingSubscriptions.map((subs: any) => (
        <Link href={`/checkout/${subs.id}`} key={subs.id}>
          <a title={subs.id} className={styles.link}>
            <span>
              <div className={styles.link__title}>
                Subscription Order ID: {subs.id}
              </div>
              <div>Durasi: {subs.subscription_duration} bulan</div>
              <div>status: {checkOrderStatus(subs)}</div>
              <div>expired: {setOrderExpiryDate(subs)}</div>
            </span>
            <span>
              <FaAngleRight />
            </span>
          </a>
        </Link>
      ))}
    </div>
  );

  return (
    <div className={styles.my__subscriptions}>
      {pendingSubscriptions.length > 0 ? <SubscriptionsList /> : <NoSubscriptions />}
    </div>
  );
};

export default MyPendingSubscriptions;
