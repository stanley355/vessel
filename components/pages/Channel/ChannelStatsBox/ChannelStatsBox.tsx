import React from "react";
import Link from "next/link";
import useResponsive from "../../../../lib/hooks/useResponsive";
import styles from "./ChannelStatsBox.module.scss";

interface IChannelStats {
  isMyChannel: boolean;
  stats: any;
}

const ChannelStatsBox = (props: IChannelStats) => {
  const { isMyChannel, stats } = props;

  const { isDesktop } = useResponsive();

  return (
    <div className={styles.channel__stats}>
      <div className={styles.channel__stats__head}>
        <h1>{stats.channel_name}</h1>
        {!isDesktop && !isMyChannel && (
          <Link href={`/subscription/${stats.slug}`}>
            <a title="Subscribe" className={styles.subscribe__cta}>
              Subscribe
            </a>
          </Link>
        )}
      </div>
      <div className={styles.channel__stats__numbers}>
        <span>
          <div>{stats.posts_number}</div>
          <div>Posts</div>
        </span>
        <span>
          <div>{stats.subscribers}</div>
          <div>Subscribers</div>
        </span>
      </div>
      {isDesktop && !isMyChannel && (
        <Link href={`/subscription/${stats.slug}`}>
          <a title="Subscribe" className={styles.subscribe__cta}>
            Subscribe
          </a>
        </Link>
      )}
    </div>
  );
};

export default ChannelStatsBox;
