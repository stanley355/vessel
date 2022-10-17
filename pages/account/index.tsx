import React, { useState } from "react";
import { GetServerSideProps } from "next";
import jsCookie from "js-cookie";
import jwtDecode from "jwt-decode";
import ChannelTab from "../../components/pages/Account/ChannelTab";
import channelLoginHandler from "../../lib/loginHandler/channelLoginHandler";
import ProfileTab from "../../components/pages/Account/ProfileTab";
import styles from "./account.module.scss";

const Account = (props: any) => {
  const { profile, channel } = props;

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
        onClick={() => setActiveTab("profile")}
        className={activeTab === "profile" ? styles.btn__active : ""}
      >
        Account
      </button>
    </div>
  );

  const ActiveTabBody = () => {
    switch (activeTab) {
      case "channel":
        return <ChannelTab channel={channel} />;
      case "profile":
        return <ProfileTab profile={profile} />;
      default:
        return <ChannelTab channel={channel} />;
    }
  };

  return (
    <div className="container">
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
  let profile: any = token ? jwtDecode(token) : "";
  let channel: any;

  if (!token) {
    return {
      redirect: {
        destination: "/account/login/",
        permanent: false,
      },
    };
  }

  if (token) profile = jwtDecode(token);

  // Refetch channel data if there's necessary changes e.g (subscribers/post)
  if (profile && profile.has_channel) {
    const channelLogin = await channelLoginHandler(token);

    if (channelLogin && channelLogin.token) {
      channel = jwtDecode(channelLogin.token);
      jsCookie.set("token_channel", channelLogin.token);
    }
  }

  return {
    props: {
      profile: profile ?? null,
      channel: channel ?? null,
    },
  };
};

export default Account;
