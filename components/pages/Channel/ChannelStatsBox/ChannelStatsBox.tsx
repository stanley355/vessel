import React from 'react';
import styles from './ChannelStatsBox.module.scss';

interface IChannelStats {
  stats: any;
}

const ChannelStatsBox = (props: IChannelStats) => {
  const { stats } = props;

  return (
    <div className={styles.channel__stats}>
      <h1>{stats.channel_name}</h1>
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
    </div>
  )
}

export default ChannelStatsBox;