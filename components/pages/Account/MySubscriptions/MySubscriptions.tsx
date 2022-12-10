import React from "react";
import Link from "next/link";
import { FaRegFrownOpen, FaAngleRight } from "react-icons/fa";
import checkSubscriptionStatus from "../../../../lib/subscriptionHandler/checkSubscriptionStatus";
import styles from "./MySubscriptions.module.scss";

interface IMySubscriptions {
  subscriptions: any[];
}

const MySubscriptions = (props: IMySubscriptions) => {
  const { subscriptions } = props;

  const NoSubscriptions = () => (
    <div className={styles.no__subscriptions}>
      <FaRegFrownOpen />
      <div className={styles.text}>Anda Belum Berlangganan Channel Apapun</div>
    </div>
  );

  const SubscriptionsList = () => (
    <div className={styles.list}>
      {subscriptions.map((subs: any) => (
        <Link href={`/channel/${subs.slug}`} key={subs.channel_name}>
          <a title={subs.channel_name} className={styles.link}>
            <span>
              <div className={styles.link__title}>
                {subs.channel_name.toUpperCase()}
              </div>
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
      {subscriptions.length > 0 ? <SubscriptionsList /> : <NoSubscriptions />}
    </div>
  );
};

export default MySubscriptions;
