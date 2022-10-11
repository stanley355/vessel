import React from "react";
import Link from "next/link";
import styles from "./ChannelSection.module.scss";

interface IChannelSection {
  channel: any;
}

const ChannelSection = (props: IChannelSection) => {
  const { channel } = props;

  return (
    <div className={styles.channel__section}>
      <h3>My Channel</h3>

      <div>Channel Name: {channel.channel_name}</div>
      <div>Posts Number: {channel.posts_number}</div>
      <div>Last Post: {channel.updated_at}</div>
      <div>Subscribers: {channel.subscribers}</div>
      <div>Subscription Price: {channel.subscription_price}</div>

      <div className={styles.link__wrap}>
        <Link href={`/channel/${channel.slug}`}>
          <a title={channel.channel_name}>Go to my channel</a>
        </Link>
      </div>
    </div>
  );
};

export default ChannelSection;
