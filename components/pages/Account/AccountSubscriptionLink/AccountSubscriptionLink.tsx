import React from 'react';
import Link from 'next/link';
import { FaBell, FaChevronCircleRight } from "react-icons/fa";
import styles from './AccountSubscriptionLink.module.scss';

const AccountSubscriptionLink = () => {
  return (
    <Link href="/account/subscription">
      <div className={styles.subscription__link}>
        <div className={styles.main}>
          <span><FaBell /></span>
          <span className={styles.content}>
            <div className={styles.title}>
              Subscription Saya
            </div>
            <div>
              Ongoing/Pending Subscription
            </div>
          </span>
        </div>
        <div className={styles.arrow}>
          <FaChevronCircleRight />
        </div>
      </div>
    </Link>
  )
}

export default AccountSubscriptionLink;