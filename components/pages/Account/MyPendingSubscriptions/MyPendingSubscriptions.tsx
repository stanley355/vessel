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
      <div className={styles.text}>Tidak ada item</div>
    </div>
  );  

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
