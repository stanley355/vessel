import React from "react";
import { GetServerSideProps } from "next";
import jsCookie from "js-cookie";
import jwtDecode from "jwt-decode";
import channelLoginHandler from "../../lib/loginHandler/channelLoginHandler";
import viewSubscriptions from "../../lib/subscriptionHandler/viewSubscriptions";
import viewBalance from "../../lib/paymentHandler/viewBalance";
import findUserPendingOrder from "../../lib/orderHandler/findUserPendingOrder";
import findSubscribedChannel from "../../lib/channelHandler/findSubscribedChannel";
import HomeMetaHead from "../../components/pages/Home/HomeMetaHead";
import UserProfileCard from "../../components/pages/Account/UserProfileCard";
import AccountWalletLink from "../../components/pages/Account/AccountWalletLink";
import styles from "./account.module.scss";

const Account = (props: any) => {
  const { profile, balance, subscriptions, pendingOrder } = props;

  return (
    <div className="container">
      <HomeMetaHead />
      <div className={styles.account}>
        <UserProfileCard profile={profile} />
        <AccountWalletLink balance={balance} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies["token"];
  const profile: any = token ? jwtDecode(token) : "";
  let balance: any;
  let subscriptions: any = [];
  let pendingOrder: any = [];
  let channel: any;

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
    pendingOrder = await findUserPendingOrder(profile.id);
    const subscriptionsID = await viewSubscriptions(profile.id);

    if (subscriptionsID && subscriptionsID.length > 0) {
      subscriptions = (await findSubscribedChannel(subscriptionsID)) ?? [];
    }
  }

  // Refetch channel data if there's necessary changes e.g (subscribers/post)
  if (profile && profile.has_channel) {
    const channelLogin = await channelLoginHandler(token);

    if (channelLogin && channelLogin.token) {
      channel = jwtDecode(channelLogin.token);
      jsCookie.set("token_channel", channelLogin.token, { expires: 15 });
    }
  }

  return {
    props: {
      profile: profile ?? null,
      balance: balance ?? null,
      channel: channel ?? null,
      subscriptions,
      pendingOrder,
    },
  };
};

export default Account;
