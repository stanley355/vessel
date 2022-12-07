import React from "react";
import Link from "next/link";
import { FaRegFrownOpen, FaAngleRight } from "react-icons/fa";
import styles from "./MyPendingSubscriptions.module.scss";

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

  const SubscriptionsList = () => (
    <div className={styles.list}>
      {pendingSubscriptions.map((subs: any) => (
        <Link href={`/checkout/${subs.id}`} key={subs.id}>
          <a title={subs.id} className={styles.link}>
            hi
            {/* <span>
              <div className={styles.link__title}>
                {subs.channels_name.toUpperCase()}
              </div>
              <div>status: {checkSubscriptionStatus(subs)}</div>
            </span>
            <span>
              <FaAngleRight />
            </span> */}
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
