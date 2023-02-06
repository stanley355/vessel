import React, { useState } from "react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import jwtDecode from "jwt-decode";
import jsCookie from "js-cookie";
import channelLoginHandler from "../../../lib/loginHandler/channelLoginHandler";
import viewPost from "../../../lib/postHandler/viewPost";
import useResponsive from "../../../lib/hooks/useResponsive";
import CreateChannelForm from "../../../components/pages/Account/CreateChannelForm";
import ChannelStatus from "../../../components/ChannelStatus";
import ChannelMetaHead from "../../../components/pages/Channel/ChannelMetaHead";
import PostCard from "../../../components/PostCard";
import "node_modules/video-react/dist/video-react.css";
import styles from "./AccountChannel.module.scss";

interface IChannelTab {
  channel: any;
  posts: any[];
}

const AccountChannel = (props: IChannelTab) => {
  const { channel, posts } = props;

  const [showUpload, setShowUpload] = useState(false);

  const { isDesktop } = useResponsive();

  const PostContainer = () => (
    <div className={styles.post__container}>
      {posts.map((post: any, index: number) => (
        <div key={index}>
          <PostCard isHome={false} channel={channel} post={post} />
        </div>
      ))}
    </div>
  );

  const ChannelPage = () => {
    if (channel) {
      const UploadPostForm = dynamic(
        () => import("../../../components/pages/Account/UploadPostForm")
      );
      if (posts.length > 0)
        return (
          <>
            <ChannelStatus
              isPublic={false}
              channel={channel}
              onUploadClick={() => setShowUpload(!showUpload)}
            />
            {showUpload ? <UploadPostForm /> : <PostContainer />}
          </>
        );
      return <UploadPostForm />;
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
};

export default AccountChannel;
