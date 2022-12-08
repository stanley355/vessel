import React, { useState } from "react";
import { GetServerSideProps } from "next";
import jsCookie from "js-cookie";
import jwtDecode from "jwt-decode";
import channelLoginHandler from "../../lib/loginHandler/channelLoginHandler";
import viewPost from "../../lib/postHandler/viewPost";
import viewSubscriptions from "../../lib/subscriptionHandler/viewSubscriptions";
import viewBalance from "../../lib/paymentHandler/viewBalance";
import filterSimilarSubscription from "../../lib/filterSimilarSubscription";
import ChannelTab from "../../components/pages/Account/ChannelTab";
import ProfileTab from "../../components/pages/Account/ProfileTab";
import HomeMetaHead from "../../components/pages/Home/HomeMetaHead";
import styles from "./account.module.scss";
import findUserPendingOrder from "../../lib/orderHandler/findUserPendingOrder";

const Account = (props: any) => {
  const { profile, balance, subscriptions, channel, posts, pendingOrder } = props;
  const [activeTab, setActiveTab] = useState("channel");

  const AccountTabHeader = () => (
    <div className={styles.account__tabs}>
      <button
        type="button"
        onClick={() => setActiveTab("channel")}
        className={activeTab === "channel" ? styles.btn__active : ""}
      >
        Channel
      </button>
      <button
        type="button"
        onClick={() => setActiveTab("account")}
        className={activeTab === "account" ? styles.btn__active : ""}
      >
        Account
      </button>
    </div>
  );

  const ActiveTabBody = () => {
    switch (activeTab) {
      case "channel":
        return <ChannelTab channel={channel} posts={posts} />;
      case "account":
        return (
          <ProfileTab
            profile={profile}
            channel={channel}
            balance={balance}
            subscriptions={subscriptions}
            pendingOrder={pendingOrder}
          />
        );
      default:
        return <ChannelTab channel={channel} posts={posts} />;
    }
  };

  return (
    <div className="container">
      <HomeMetaHead posts={[]} />
      <div className={styles.account}>
        <AccountTabHeader />
        <div className={styles.account__tabs__body}>
          <ActiveTabBody />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies["token"];
  const profile: any = token ? jwtDecode(token) : "";
  let balance: any;
  let subscriptions: any = [];
  let pendingOrder:any = [];
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

  if (profile && profile.id) {
    balance = await viewBalance(profile.id);
    subscriptions = await viewSubscriptions(profile.id);
    pendingOrder = await findUserPendingOrder(profile.id);
  }

  // Refetch channel data if there's necessary changes e.g (subscribers/post)
  if (profile && profile.has_channel) {
    const channelLogin = await channelLoginHandler(token);

    if (channelLogin && channelLogin.token) {
      channel = jwtDecode(channelLogin.token);
      jsCookie.set("token_channel", channelLogin.token);
    }
  }

  if (channel && channel.posts_number > 0) {
    posts = await viewPost(channel.slug);
  }

  if (subscriptions && subscriptions.length > 0) {
    subscriptions = filterSimilarSubscription(subscriptions);
  }

  return {
    props: {
      profile: profile ?? null,
      balance: balance ?? null,
      channel: channel ?? null,
      posts,
      subscriptions,
      pendingOrder
    },
  };
};

export default Account;
