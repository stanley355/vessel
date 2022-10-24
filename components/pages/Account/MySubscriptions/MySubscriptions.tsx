import React from 'react';
import Link from 'next/link';
import { FaRegFrownOpen } from 'react-icons/fa';
import styles from './MySubscriptions.module.scss';

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


  const SubscriptionsList = () => {
    return (
      <div>
        <div>
          <span>Channel</span><span>Status</span><span>.</span>
        </div>

        {/* {subscriptions.map((subs:any) => 
          <div>
            <span>{subs.channels_name}</span>

          </div>
        )} */}
      </div>
    )
  }
  console.log(subscriptions);

  return (
    <div className={styles.my__subscriptions}>
      <div className={styles.title}>My Subscriptions</div>

      <NoSubscriptions />
    </div>
  )
}

export default MySubscriptions;