import React from "react";
import { GetServerSideProps } from "next";
import jsCookie from "js-cookie";
import jwtDecode from "jwt-decode";
import channelLoginHandler from "../../lib/loginHandler/channelLoginHandler";
import viewBalance from "../../lib/paymentHandler/viewBalance";
import HomeMetaHead from "../../components/pages/Home/HomeMetaHead";
import UserProfileCard from "../../components/pages/Account/UserProfileCard";
import AccountWalletLink from "../../components/pages/Account/AccountWalletLink";
import AccountSubscriptionLink from "../../components/pages/Account/AccountSubscriptionLink";
import AccountChannelLink from "../../components/pages/Account/AccountChannelLink";
import styles from "./account.module.scss";

const Account = (props: any) => {
  const { profile, balance } = props;

  return (
    <div className="container">
      <HomeMetaHead />
      <div className={styles.account}>
        <UserProfileCard profile={profile} />
        <AccountChannelLink />
        <AccountWalletLink balance={balance} />
        <AccountSubscriptionLink />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies["token"];
  const profile: any = token ? jwtDecode(token) : "";
  let balance: any;
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
    },
  };
};

export default Account;
