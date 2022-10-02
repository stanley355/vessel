import React from 'react';
import Router from 'next/router';
import { FaRegFrownOpen, FaAngleLeft, FaUpload } from 'react-icons/fa';
import styles from './HasNoPostCard.module.scss';
import Link from 'next/link';

interface IHasNoPost {
  isMyChannel: boolean;
}

const HasNoPostCard = (props: IHasNoPost) => {
  const { isMyChannel } = props;

  return (
    <div className={styles.post__card}>
      <h3 className={styles.title}>Channel ini belum ada Post <FaRegFrownOpen /> </h3>
      {isMyChannel ?
        <Link href="/channel/upload">
          <a title="Upload" className={styles.cta}>
            <FaUpload /> Upload
          </a>
        </Link>
        : <button
          onClick={() => Router.back()}
          className={styles.cta}>
          <FaAngleLeft /> Kembali
        </button>
      }

    </div>
  )
}

export default HasNoPostCard;