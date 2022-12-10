import React from "react";
import MetaHead from "../../../MetaHead";

interface IChannelMetaHead {
  channel: any;
  posts: any[];
}

const ChannelMetaHead = (props: IChannelMetaHead) => {
  const { channel, posts } = props;

  // TODO: Create meta title and description
  const CHANNEL_META = {
    title: `${channel.channel_name} x Kontenku - Channel musik dan video kesukaanmu`,
    description: `${channel.channel_name} x Kontenku - Nikmati lebih banyak konten musik dan video ${channel.channel_name}, dan bagikan semuanya dengan teman, keluarga, dan dunia di YouTube.`,
    publishedTime: channel.created_at,
    modifiedTime: posts && posts.length ? posts[0].created_at : "",
    channelName: `${channel.channel_name} | Kontenku`,
  };

  return <MetaHead meta={CHANNEL_META} />;
};

export default ChannelMetaHead;
