import React, { useState } from "react";
import getConfig from "next/config";
import jwtDecode from "jwt-decode";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import ChannelStatus from "../../components/ChannelStatus";
import ChannelNoPosts from "../../components/pages/Channel/ChannelNoPosts";
import ChannelNotSubscribed from "../../components/pages/Channel/ChannelNotSubscribed";
import SubscribeChannelForm from "../../components/pages/Channel/SubscribeChannelForm";
import AwaitingPaymentForm from "../../components/pages/Channel/AwaitingPaymentForm";
import viewSubscriptions from "../../lib/subscriptionHandler/viewSubscriptions";
import ChannelMetaHead from "../../components/pages/Channel/ChannelMetaHead";
import findChannel from "../../lib/channelHandler/findChannel";
import fetcher from "../../lib/fetcher";
import PostCard from "../../components/PostCard";
import "node_modules/video-react/dist/video-react.css";
import styles from "./ChannelSlug.module.scss";

const { BASE_URL } = getConfig().publicRuntimeConfig;

interface IChannelSlug {
  isSubscribing: boolean;
  profile: any;
  channel: any;
  posts: any[];
  pendingOrder: any;
}

const ChannelSlug = (props: IChannelSlug) => {
  const { isSubscribing, profile, channel, posts, pendingOrder } = props;

  const [showSubscribeForm, setShowSubscribeForm] = useState(false);

  const PostsSection = ({ postList }: any) => (
    <div className={styles.post__container}>
      {postList.map((post: any) => (
        <div key={post.id}>
          <PostCard isHome={false} channel={channel} post={post} />
        </div>
      ))}
    </div>
  );

  const SubscriptionSection = () => {
    if (showSubscribeForm) {
      return <SubscribeChannelForm profile={profile} channel={channel} />;
    }

    if (pendingOrder && pendingOrder.status === "PENDING") {
      return (
        <AwaitingPaymentForm
          profile={profile}
          channel={channel}
          pendingOrder={pendingOrder}
          onRenewClick={() => setShowSubscribeForm(true)}
        />
      );
    }

    return (
      <ChannelNotSubscribed
        onSubscribeClick={() => setShowSubscribeForm(true)}
      />
    );
  };

  const ChannelBody = () => {
    if (channel && channel.posts_number > 0) {
      if (isSubscribing) {
        return <PostsSection postList={posts} />;
      }

      const freePosts = posts.filter((post: any) => post.is_free);
      return (
        <>
          <SubscriptionSection />
          <h3>Free Posts</h3>
          {freePosts.length > 0 && <PostsSection postList={freePosts} />}
        </>
      );
    }
    return <ChannelNoPosts />;
  };

  const MainSection = () => {
    return (
      <div className={styles.main}>
        <div className={styles.main__head}>
          <h2>Posts</h2>
        </div>
        <div className={styles.posts__wrap}>
          <ChannelBody />
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      {channel && posts.length && (
        <ChannelMetaHead channel={channel} posts={posts} />
      )}
      <div className={styles.channel__slug}>
        {channel && <ChannelStatus isPublic channel={channel} />}
        <MainSection />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const slug: any = context?.params?.slug ?? "";
  const token = context.req.cookies["token"];

  if (!token) {
    return {
      redirect: {
        destination: "/account/login/",
        permanent: false,
      },
    };
  }

  const profile: any = token ? jwtDecode(token) : "";
  const channel = (await findChannel(slug)) ?? null;
  let isSubscribing: boolean = false;

  if (profile.id === channel.owner_id) {
    return {
      redirect: {
        destination: "/account/",
        permanent: false,
      },
    };
  }

  const subscription = await viewSubscriptions(profile.id);

  if (subscription && subscription.length > 0) {
    const runningSubscriptions = subscription.map((subs: any) => {
      const date = new Date();
      const isExpired = date.getTime() > new Date(subs.expired_at).getTime();
      if (!isExpired) return subs.channels_id;
    });

    isSubscribing = runningSubscriptions.includes(channel.id);
  }

  const posts =
    (await fetcher(`${BASE_URL}/api/channel/post/view?slug=${slug}`, {})) ?? [];

  const pendingOrders =
    (await fetcher(
      `${BASE_URL}/api/payment/order/channel-pending?channelID=${channel.id}&subscriberID=${profile.id}`,
      {}
    )) ?? [];

  return {
    props: {
      isSubscribing,
      profile,
      channel,
      posts,
      pendingOrder:
        pendingOrders && pendingOrders.length > 0 ? pendingOrders[0] : null,
    },
  };
};

export default ChannelSlug;
