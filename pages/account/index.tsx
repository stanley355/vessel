import React from "react";
import { GetServerSideProps } from "next";
import jsCookie from "js-cookie";
import jwtDecode from "jwt-decode";
import logoutUser from "../../lib/loginHandler/logoutUser";
import ChannelSection from "../../components/pages/Account/ChannelSection";
import CreateChannelForm from "../../components/pages/Account/CreateChannelForm";
import channelLoginHandler from "../../lib/loginHandler/channelLoginHandler";

import UserProfileCard from "../../components/pages/Account/UserProfileCard";
import styles from "./account.module.scss";

const Account = (props: any) => {
  const { profile, channel } = props;

  return (
    <div className="container">
      <div className={styles.account}>
        <div className={styles.account__user}>
          {profile && <UserProfileCard profile={profile} />}
          <button className={styles.logout__btn} onClick={logoutUser}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies["token"];
  let profile: any = token ? jwtDecode(token) : "";

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
      jsCookie.set("token_channel", channelLogin.token);
    }
  }

  return {
    props: {
      profile: profile ?? null,
    },
  };
};

export default Account;
