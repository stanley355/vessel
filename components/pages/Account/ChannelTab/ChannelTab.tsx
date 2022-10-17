import React, { useState } from 'react';
import CreateChannelForm from '../CreateChannelForm';
import ChannelStatus from '../ChannelStatus';
import NoChannelCard from '../NoChannelCard';
import NoPostsCard from '../NoPostsCard';
import styles from './ChannelTab.module.scss';

interface IChannelTab {
  channel: any;
}

const ChannelTab = (props: IChannelTab) => {
  const { channel } = props;

  const [showForm, setShowForm] = useState(false);

  const NoChannelComponent = () => {
    return showForm ? <CreateChannelForm /> : <NoChannelCard onCreateChannelClick={() => setShowForm(true)} />;
  }

  const HasChannelComponent = () => {
    return (
      <div className={styles.channel__tab}>
        <ChannelStatus channel={channel} />
        <div className={styles.main}>
          <h2>My Posts</h2>
          <NoPostsCard onUploadClick={() => { }} />
        </div>
      </div>
    )
  }

  return (
    <div>
      {channel ? <HasChannelComponent /> : <NoChannelComponent />}
    </div>
  )
}

export default ChannelTab;