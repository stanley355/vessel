import React, { useState } from "react";
import getConfig from "next/config";
import jwtDecode from "jwt-decode";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import ChannelStatus from "../../components/pages/Account/ChannelStatus";
import ChannelNoPosts from "../../components/pages/Channel/ChannelNoPosts";
import ChannelNotSubscribed from "../../components/pages/Channel/ChannelNotSubscribed";
import SubscribeChannelForm from "../../components/pages/Channel/SubscribeChannelForm";
import AwaitingPaymentForm from "../../components/pages/Channel/AwaitingPaymentForm";
import PostCard from "../../components/pages/Account/PostCard";
import ChannelMetaHead from "../../components/pages/Channel/ChannelMetaHead";
import findChannel from "../../lib/channelHandler/findChannel";
import fetcher from "../../lib/fetcher";
import styles from "./ChannelSlug.module.scss";

const { BASE_URL } = getConfig().publicRuntimeConfig;

interface IChannelSlug {
  profile: any;
  channel: any;
  posts: any[];
  pendingOrder: any;
}

const ChannelSlug = (props: IChannelSlug) => {
  const { profile, channel, posts, pendingOrder } = props;

  const [showSubscribeForm, setShowSubscribeForm] = useState(false);

  const PostsSection = ({ postList }: any) => (
    <div>
      {postList.map((post: any) => (
        <div key={post.id}>
          <PostCard channel={channel} post={post} />
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
      // TODO: Add all post after subscription
      // const subscriptionStatus =
      //   subscription && checkSubscriptionStatus(subscription);

      // if (subscription && subscriptionStatus === "ONGOING") {
      //   return <PostsSection postList={posts} />;
      // } else {

      const freePosts = posts.filter((post: any) => post.is_free);
      return (
        <>
          <SubscriptionSection />
          {freePosts.length > 0 && <PostsSection postList={freePosts} />}
        </>
      );
      // }
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
        {channel && <ChannelStatus channel={channel} />}
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

  if (profile.id === channel.owner_id) {
    return {
      redirect: {
        destination: "/account/",
        permanent: false,
      },
    };
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
      profile,
      channel,
      posts,
      pendingOrder:
        pendingOrders && pendingOrders.length > 0 ? pendingOrders[0] : null,
    },
  };
};

export default ChannelSlug;
