import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaCog } from "react-icons/fa";
import styles from "./ChannelStatus.module.scss";

interface IChannelStatus {
  isPublic: boolean;
  channel: {
    profile_img_url: string;
    channel_name: string;
    posts_number: number;
    subscribers: number;
    slug: string;
  };
}

const ChannelStatus = (props: IChannelStatus) => {
  const { isPublic, channel } = props;

  return (
    <div className={styles.channel__status}>
      <div className={styles.img__wrap}>
        <img
          src={channel.profile_img_url}
          alt={channel.channel_name}
          width={300}
          height={300}
        />
      </div>

      <div className={styles.desc}>
        <div className={styles.title}>{channel.channel_name}</div>
        <div className={styles.subtitle}>
          <span> {channel.posts_number} posts</span>
          <span>|</span>
          <span>{channel.subscribers} subscribers</span>
        </div>
      </div>

      {!isPublic &&
        <Link href="/channel/setting/">
          <span className={styles.setting}>
            <FaCog />
          </span>
        </Link>}
    </div>
  );
};

export default ChannelStatus;
