import React from 'react';
import { FaGrin } from 'react-icons/fa';
import styles from './WaitingConfirmation.module.scss';

const WaitingConfirmation = () => {
  return (
    <div className={styles.waiting__confirmation}>
      <div className={styles.status}>Status: Menunggu Konfirmasi</div>
      <div className={styles.box}>
        <FaGrin />
        <div>Terima Kasih pembayaran Anda akan segera kami konfirmasi</div>
        <div>Harap Mengecek Halaman ini secara berkala dalam 1 x 24 jam</div>
      </div>
    </div>
  );
}

export default WaitingConfirmation;