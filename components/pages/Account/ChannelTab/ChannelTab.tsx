import React, { useState } from 'react';
import CreateChannelForm from '../CreateChannelForm';
import ChannelStatus from '../ChannelStatus';
import NoChannelCard from '../NoChannelCard';
import NoPostsCard from '../NoPostsCard';
import UploadPostForm from '../UploadPostForm';
import styles from './ChannelTab.module.scss';

interface IChannelTab {
  channel: any;
}

const ChannelTab = (props: IChannelTab) => {
  const { channel } = props;

  const [showCreateChannelForm, setShowCreateChannelForm] = useState(false);
  const [showUploadPostForm, setShowUploadPostForm] = useState(false);

  const MainChannelTab = () => {
    return showUploadPostForm ? <UploadPostForm onBackBtnClick={() => setShowUploadPostForm(false)} /> : <NoPostsCard onUploadClick={() => setShowUploadPostForm(true)} />;
  }

  const NoChannelComponent = () => {
    return showCreateChannelForm ? <CreateChannelForm /> : <NoChannelCard onCreateChannelClick={() => setShowCreateChannelForm(true)} />;
  }

  const HasChannelComponent = () => {
    return (
      <div className={styles.channel__tab}>
        <ChannelStatus channel={channel} />
        <div className={styles.main}>
          <h2>My Posts</h2>
          <MainChannelTab />
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