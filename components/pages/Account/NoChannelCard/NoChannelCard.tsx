import React from 'react';
import { FaRegFrownOpen } from 'react-icons/fa';
import styles from './NoChannelCard.module.scss';

const NoChannelCard = () => {
  return (
    <div className={styles.no__channel}>
      <FaRegFrownOpen />
      <div className={styles.title}>Anda belum mempunyai Channel</div>
      <button type='button' className={styles.cta}>Buat Channel</button>
    </div>
  )
}

export default NoChannelCard;