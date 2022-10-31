import React from 'react';
import Link from 'next/link';
import { FaWallet } from 'react-icons/fa';
import styles from './MyWallet.module.scss';

const MyWallet = () => {
  return (
    <div className={styles.my__wallet}>
      <div className={styles.balance}>
        <FaWallet />
        <span>
          <div>My Wallet</div>
          <div>Rp 0</div>
        </span>
      </div>

      <Link href="/account/wallet">
        <a title='My Wallet'>
          See More
        </a>
      </Link>
    </div>
  )
}

export default MyWallet;