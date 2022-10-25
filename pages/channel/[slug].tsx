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
import checkSubscriptionStatus from "../../lib/subscriptionHandler/checkSubscriptionStatus";
import viewSubscriptions from "../../lib/subscriptionHandler/viewSubscriptions";
import viewInvoice from "../../lib/paymentHandler/viewInvoice";
import findChannel from "../../lib/channelHandler/findChannel";
import fetcher from "../../lib/fetcher";
import styles from "./ChannelSlug.module.scss";

const { BASE_URL } = getConfig().publicRuntimeConfig;

interface IChannelSlug {
  profile: any;
  channel: any;
  posts: any[];
  subscription: any;
  invoice: any;
}

const ChannelSlug = (props: IChannelSlug) => {
  const { profile, channel, posts, subscription, invoice } = props;

  const [showSubscribeForm, setShowSubscribeForm] = useState(false);


  const PostsSection = ({ postList }: any) => (
    <div>
      {postList.map((post: any) =>
        <div key={post.id}>
          <PostCard channel={channel} post={post} />
        </div>
      )}
    </div>
  )

  const SubscriptionSection = () => {
    if (showSubscribeForm) {
      return <SubscribeChannelForm profile={profile} channel={channel} />
    }
    return subscription ? <AwaitingPaymentForm
      profile={profile}
      channelName={channel.channel_name}
      subscriptionDuration={subscription.duration}
      totalPrice={invoice.amount}
      invoiceStatus={invoice.status}
      invoiceLink={invoice.invoice_url}
      onRenewClick={() => setShowSubscribeForm(true)}
    /> : <ChannelNotSubscribed
      onSubscribeClick={() => setShowSubscribeForm(true)}
    />
  }

  const ChannelBody = () => {
    if (channel && channel.posts_number > 0) {
      const subscriptionStatus = checkSubscriptionStatus(subscription);

      if (subscriptionStatus === "ONGOING") {
        return <PostsSection postList={posts} />
      } else {
        const freePosts = posts.filter((post: any) => post.is_free);
        return (
          <>
            <SubscriptionSection />
            {freePosts.length > 0 && <PostsSection postList={freePosts} />}
          </>
        )
      }
    } else {
      return <ChannelNoPosts />;
    }
  };

  const MainSection = () => {
    return (
      <div className={styles.main}>
        <div className={styles.main__head}>
          <h2>Posts</h2>
          <button type="button" className={styles.subscribe__btn}>
            Subscribe
          </button>
        </div>
        <div className={styles.posts__wrap}>
          <ChannelBody />
        </div>
      </div>
    );
  };

  return (
    <div className="container">
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
  const profile: any = token ? jwtDecode(token) : "";
  const channel = (await findChannel(slug)) ?? null;
  const posts = await fetcher(`${BASE_URL}/api/channel/post/view?slug=${slug}`, {}) ?? [];

  let subscription;
  let invoice;

  if (profile && channel && channel.id) {
    const payload = {
      userID: profile.id,
      channelID: channel.id,
    };
    const subscriptionList = await viewSubscriptions(payload);
    subscription = subscriptionList[subscriptionList.length - 1];
  }

  if (subscription && !subscription.paid && !subscription.expired_at) {
    invoice = await viewInvoice(subscription.invoice_id);
  }



  if (!token) {
    return {
      redirect: {
        destination: "/account/login/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      profile,
      channel,
      posts,
      subscription: subscription ?? null,
      invoice: invoice ?? null,
    },
  };
};

export default ChannelSlug;
