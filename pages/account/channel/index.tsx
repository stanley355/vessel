import React, { useState } from "react";
import { GetServerSideProps } from "next";
import dynamic from 'next/dynamic';
import jwtDecode from "jwt-decode";
import jsCookie from "js-cookie";
import channelLoginHandler from "../../../lib/loginHandler/channelLoginHandler";
import viewPost from "../../../lib/postHandler/viewPost";
import CreateChannelForm from "../../../components/pages/Account/CreateChannelForm";
import ChannelStatus from "../../../components/ChannelStatus";
import useResponsive from "../../../lib/hooks/useResponsive";
import ChannelMetaHead from "../../../components/pages/Channel/ChannelMetaHead";
import "node_modules/video-react/dist/video-react.css";
import styles from "./AccountChannel.module.scss";

interface IChannelTab {
  channel: any;
  posts: any[];
}

const AccountChannel = (props: IChannelTab) => {
  const { channel, posts } = props;

  const { isDesktop } = useResponsive();

  const ChannelPage = () => {
    if (channel) {
      if (posts.length > 0) return <ChannelStatus channel={channel} />;
      const UploadPostForm = dynamic(() => import('../../../components/pages/Account/UploadPostForm'));
      return <UploadPostForm onBackBtnClick={() => {}} />;
    }

    return <CreateChannelForm />;
  };

  return (
    <div className={isDesktop ? "container" : ""}>
      {channel && <ChannelMetaHead channel={channel} posts={posts} />}
      <ChannelPage />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies["token"];
  const profile: any = token ? jwtDecode(token) : "";
  let channel: any;
  let posts: any[] = [];

  if (!token) {
    return {
      redirect: {
        destination: "/account/login/",
        permanent: false,
      },
    };
  }

  // Refetch channel data if there's necessary changes e.g (subscribers/post)
  if (profile && profile.has_channel) {
    const channelLogin = await channelLoginHandler(token);

    if (channelLogin && channelLogin.token) {
      channel = jwtDecode(channelLogin.token);
      jsCookie.set("token_channel", channelLogin.token, { expires: 15 });
    }
  }

  if (channel && channel.posts_number > 0) {
    posts = await viewPost(channel.slug);
  }

  return {
    props: {
      profile: profile ?? null,
      channel: channel ?? null,
      posts,
    },
  };

  return {
    props: {},
  };
};

export default AccountChannel;
