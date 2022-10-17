import React from 'react';
import CreateChannelForm from '../CreateChannelForm';
import NoChannelCard from '../NoChannelCard';

interface IChannelTab {
  channel: any;
}

const ChannelTab = (props: IChannelTab) => {
  const { channel } = props;
  return (
    <div>
      {/* {channel ? <div>Channel ini</div> : <NoChannelCard />} */}
      <CreateChannelForm />
    </div>
  )
}

export default ChannelTab;