import React from "react";
import Link from "next/link";
import { FaPlayCircle, FaChevronCircleRight } from "react-icons/fa";
import styles from "./AccountChannelLink.module.scss";

const AccountChannelLink = () => {
  return (
    <Link href="/account/channel/">
      <div className={styles.channel__link}>
        <div className={styles.main}>
          <span>
            <FaPlayCircle />
          </span>
          <span className={styles.content}>
            <div className={styles.title}>Channel Saya</div>
            <div>Belum Ada Channel</div>
          </span>
        </div>
        <div className={styles.arrow}>
          <FaChevronCircleRight />
        </div>
      </div>
    </Link>
  );
};

export default AccountChannelLink;
