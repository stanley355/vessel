import React from 'react';
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
  )

  return (
    <div className={styles.my__subscriptions}>
      <div className={styles.title}>My Subscriptions</div>

      <NoSubscriptions />
    </div>
  )
}

export default MySubscriptions;