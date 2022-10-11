import React from "react";
import { GetServerSideProps } from "next";
import jsCookie from "js-cookie";
import jwtDecode from "jwt-decode";
import logoutUser from "../../lib/loginHandler/logoutUser";
import ChannelSection from "../../components/pages/Account/ChannelSection";
import CreateChannelForm from "../../components/pages/Account/CreateChannelForm";
import ProfileSection from "../../components/pages/Account/ProfileSection";
import channelLoginHandler from "../../lib/loginHandler/channelLoginHandler";
import styles from "./account.module.scss";

const Account = (props: any) => {
  const { profile, channel } = props;

  return (
    <div className="container">
      <div className={styles.account}>
        {channel ? <ChannelSection channel={channel} /> : <CreateChannelForm />}
        {profile && <ProfileSection profile={profile} />}
        <button className={styles.account__logout} onClick={logoutUser}>
          Logout
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies["token"];
  let profile: any = token ? jwtDecode(token) : "";
  let channel;

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
    const channelToken = await channelLoginHandler(token);

    if (channelToken) {
      jsCookie.set("token_channel", channelToken);
      channel = jwtDecode(channelToken);
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
