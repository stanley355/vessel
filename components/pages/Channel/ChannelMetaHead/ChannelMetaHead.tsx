import React from "react";
import MetaHead from "../../../MetaHead";

interface IChannelMetaHead {
  channel: any;
  posts: any[];
}

const ChannelMetaHead = (props: IChannelMetaHead) => {
  const { channel, posts } = props;

  const CHANNEL_META = {
    title: `${channel.channel_name} x Kontenku Langganan Konten Terbaik - Nikmati Konten Berkualitas Tinggi Setiap Hari`,
    description: `${channel.channel_name} x Kontenku - Nikmati konten berkualitas tinggi setiap hari dengan berlangganan konten kami. Terupdate, informatif, dan menyenangkan, langganan konten kami adalah pilihan terbaik bagi Anda.`,
  };

  return <MetaHead meta={CHANNEL_META} />;
};

export default ChannelMetaHead;
