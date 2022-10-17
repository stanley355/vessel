import React, { useState } from 'react';
import CreateChannelForm from '../CreateChannelForm';
import NoChannelCard from '../NoChannelCard';

interface IChannelTab {
  channel: any;
}

const ChannelTab = (props: IChannelTab) => {
  const { channel } = props;

  const [showForm, setShowForm] = useState(false);

  const NoChannelComponent = () => {
    return showForm ? <CreateChannelForm /> : <NoChannelCard onCreateChannelClick={() => setShowForm(true)}/>;
  }

  return (
    <div>
      {channel ? <div>Channel ini</div> : <NoChannelComponent /> }
    </div>
  )
}

export default ChannelTab;