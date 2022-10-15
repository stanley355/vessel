import React from "react";
import Link from "next/link";
import jwtDecode from "jwt-decode";
import getConfig from "next/config";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import HasNoPostCard from "../../components/pages/Channel/HasNoPostCard/";
import PostCard from "../../components/pages/Channel/PostCard";
import ChannelStatsBox from "../../components/pages/Channel/ChannelStatsBox";
import viewSubscription from "../../lib/subscriptionHandler/viewSubscription";
import fetcher from "../../lib/fetcher";

const { BASE_URL } = getConfig().publicRuntimeConfig;

const ChannelSlug = (props: any) => {
  const { slug, myChannel, channelStats, posts, lastSubscription } = props;
  const isMyChannel = myChannel && myChannel.slug === slug;

  const SubscriptionLink = () => (
    <div>
      <div>Anda belum berlangganan Channel ini</div>
      <div>Klik di bawah untuk mulai berlangganan</div>
      <Link href={`/subscription/${slug}`}>
        <a title={slug}>Mulai Berlangganan</a>
      </Link>
    </div>
  );

  const ChannelContent = () => {
    if (posts.length > 0) {
      if (isMyChannel) {
        return <PostCard posts={posts} />;
      }
      if (lastSubscription && lastSubscription.paid) {
        const expiredAt = new Date(lastSubscription.expired_at).getTime();
        const currentTime = new Date().getTime();

        return currentTime > expiredAt ? (
          <SubscriptionLink />
        ) : (
          <PostCard posts={posts} />
        );
      }
      return <SubscriptionLink />;
    }

    return <HasNoPostCard isMyChannel={isMyChannel} />;
  };

  return (
    <div className="container">
      {channelStats && <ChannelStatsBox stats={channelStats} />}
      <ChannelContent />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const slug = context?.params?.slug;

  const token = context.req.cookies["token"];
  const tokenChannel = context.req.cookies["token_channel"];
  let profile: any;
  let myChannel: any;
  let subscriptions;
  let lastSubscription;

  if (!token) {
    return {
      redirect: {
        destination: "/account/login/",
        permanent: false,
      },
    };
  }

  if (token) profile = jwtDecode(token);
  if (tokenChannel) myChannel = jwtDecode(tokenChannel);
  const isMyChannel = myChannel && myChannel.slug === slug;

  const channelStats = await fetcher(
    `${BASE_URL}/api/channel/status/?slug=${slug}`,
    {}
  );

  if (!isMyChannel && profile && channelStats && channelStats) {
    subscriptions = await viewSubscription({
      userID: profile.id,
      channelID: channelStats.id,
    });

    if (subscriptions && subscriptions.length > 0) {
      lastSubscription = subscriptions[subscriptions.length - 1];
    }
  }

  const posts = await fetcher(
    `${BASE_URL}/api/channel/view-post?slug=${slug}`,
    {}
  );

  return {
    props: {
      slug: slug ?? "",
      myChannel: myChannel ?? null,
      channelStats: channelStats ?? null,
      posts: posts ?? [],
      lastSubscription: lastSubscription ?? null,
    },
  };
};

export default ChannelSlug;
