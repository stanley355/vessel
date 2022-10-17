import React from 'react';
import Link from 'next/link';
import styles from './ChannelStatus.module.scss';

interface IChannelStatus {
  channel: {
    profile_img_url: string;
    channel_name: string;
    posts_number: number;
    subscribers: number;
    slug: string;
  };
}

const ChannelStatus = (props: IChannelStatus) => {
  const { channel } = props;

  return (
    <div className={styles.channel__status}>
      <div className={styles.img__wrap}>
        <img src={channel.profile_img_url} alt={channel.channel_name} width={300} height={300} />
      </div>

      <Link href={`/channel/${channel.slug}`}>
        <a title={channel.channel_name} className={styles.title}>
          {channel.channel_name}
        </a>
      </Link>

      <div className={styles.status__box}>
        <span>
          <div>{channel.posts_number}</div>
          <div>posts</div>
        </span>

        <span>
          <div>{channel.subscribers}</div>
          <div>subscribers</div>
        </span>
      </div>
    </div>
  )
}

export default ChannelStatus;