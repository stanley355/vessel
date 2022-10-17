import React from 'react';
import NoChannelCard from '../NoChannelCard';

interface IChannelTab {
  channel: any;
}

const ChannelTab = (props: IChannelTab) => {
  const { channel } = props;
  return (
    <div>
      {channel ? <div>Channel ini</div> : <NoChannelCard />}
    </div>
  )
}

export default ChannelTab;