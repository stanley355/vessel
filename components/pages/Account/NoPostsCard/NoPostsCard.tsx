import React from 'react';
import { FaRegFrownOpen } from 'react-icons/fa';
import styles from './NoPostsCard.module.scss';

interface INoPosts {
  onCreateChannelClick: () => void;
}

const NoPostsCard = (props: INoPosts) => {
  const { onCreateChannelClick } = props;
  
  return (
    <div className={styles.no__posts}>
      <FaRegFrownOpen />
      <div className={styles.title}>Anda belum mempunyai Post</div>
      <button type='button' className={styles.cta} onClick={onCreateChannelClick}>Buat Channel</button>
    </div>
  )
}

export default NoPostsCard;