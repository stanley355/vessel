import React from "react";
import MetaHead from "../../../MetaHead";

interface IChannelMetaHead {
  channel: any;
  posts: any[];
}

const ChannelMetaHead = (props: IChannelMetaHead) => {
  const { channel, posts } = props;

  const CHANNEL_META = {
    title: `${channel.channel_name} x Kontenku - Exclusive Content for Subscribers`,
    description: `${channel.channel_name} x Kontenku - Tempat ${channel.channel_name} menawarkan konten eksklusif yang dapat dibayar dengan harga premium. Nikmati video dan musik yang Anda sukai, unggah konten original, dan bagikan semuanya untuk para fans.`,
  };

  return <MetaHead meta={CHANNEL_META} />;
};

export default ChannelMetaHead;
