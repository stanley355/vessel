import React from 'react';
import { FaWallet } from 'react-icons/fa';
import styles from './WalletHead.module.scss';

const WalletHead = () => {
  return (
    <div className={styles.wallet__head}>
      <span>
        <FaWallet />
        <div className={styles.info}>
          <div>My Wallet</div>
          <div>RP 0</div>
        </div>
      </span>

      <button type='button'>Withdraw</button>
    </div>
  )
}

export default WalletHead;