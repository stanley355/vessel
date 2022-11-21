import React from "react";
import MetaHead from "../../../MetaHead";

interface IChannelMetaHead {
  channel: any;
  posts: any[];
}

const ChannelMetaHead = (props: IChannelMetaHead) => {
  const { channel, posts } = props;

  const CHANNEL_META = {
    title: `${channel.channel_name} x Kontenku - Dukung channel ${channel.channel_name} di Kontenku`,
    description: `${channel.channel_name} x Kontenku - Temukan lebih banyak konten ${channel.channel_name} di Kontenku dengan mensubscribe ${channel.channel_name}`,
    publishedTime: channel.created_at,
    modifiedTime: posts && posts.length ? posts[0].created_at : "",
    channelName: `${channel.channel_name} | Kontenku`,
  };

  return <MetaHead meta={CHANNEL_META} />;
};

export default ChannelMetaHead;
