import React, { useState } from 'react';
import CreateChannelForm from '../CreateChannelForm';
import ChannelStatus from '../ChannelStatus';
import NoChannelCard from '../NoChannelCard';

interface IChannelTab {
  channel: any;
}

const ChannelTab = (props: IChannelTab) => {
  const { channel } = props;

  const [showForm, setShowForm] = useState(false);

  const NoChannelComponent = () => {
    return showForm ? <CreateChannelForm /> : <NoChannelCard onCreateChannelClick={() => setShowForm(true)} />;
  }

  console.log(111, channel);

  return (
    <div>
      {channel ? <ChannelStatus channel={channel} /> : <NoChannelComponent />}
    </div>
  )
}

export default ChannelTab;