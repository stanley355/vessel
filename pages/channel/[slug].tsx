import React from "react";
import jwtDecode from "jwt-decode";
import getConfig from "next/config";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import HasNoPostCard from "../../components/pages/Channel/HasNoPostCard/";
import PostCard from "../../components/pages/Channel/PostCard";
import ChannelStatsBox from "../../components/pages/Channel/ChannelStatsBox";
import fetcher from "../../lib/fetcher";

const { BASE_URL } = getConfig().publicRuntimeConfig;

const ChannelSlug = (props: any) => {
  const { slug, myChannel, channelStats, posts } = props;
  const isMyChannel = myChannel && myChannel.slug === slug;

  return (
    <div className="container">
      {channelStats && (
        <ChannelStatsBox stats={channelStats} isMyChannel={isMyChannel} />
      )}
      {posts.length > 0 ? (
        <PostCard posts={posts} />
      ) : (
        <HasNoPostCard isMyChannel={isMyChannel} />
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const slug = context?.params?.slug;

  const token = context.req.cookies["token"];
  const tokenChannel = context.req.cookies["token_channel"];
  let myChannel;

  if (!token) {
    return {
      redirect: {
        destination: "/account/login/",
        permanent: false,
      },
    };
  }

  if (tokenChannel) myChannel = jwtDecode(tokenChannel);

  const channelStats = await fetcher(
    `${BASE_URL}/api/channel/status/?slug=${slug}`,
    {}
  );
  const posts = await fetcher(
    `${BASE_URL}/api/channel/view-post?slug=${slug}`,
    {}
  );

  return {
    props: {
      slug: slug ?? "",
      myChannel: myChannel ?? null,
      channelStats: channelStats?.data ?? null,
      posts: posts?.data ?? [],
    },
  };
};

export default ChannelSlug;
