import React from "react";
import LogoutBtn from "../LogoutBtn";
import UserProfileCard from "../UserProfileCard";
import MySubscriptions from "../MySubscriptions";
import MyWallet from "../MyWallet";
import AccountChannelInfo from "../AccountChannelInfo";
import styles from "./ProfileTab.module.scss";

interface IProfileTab {
  profile: {
    fullname: string;
    email: string;
  };
  channel: any;
  balance: any;
  subscriptions: any[];
}

const ProfileTab = (props: IProfileTab) => {
  const { profile, channel, balance, subscriptions } = props;

  return (
    <div className={styles.profile__tab}>
      <div className={styles.profile__tab__user}>
        {profile && <UserProfileCard profile={profile} />}
        <LogoutBtn />
      </div>
      {channel && <AccountChannelInfo channel={channel} />}
      <MyWallet balance={balance} />
      <MySubscriptions subscriptions={subscriptions} />
    </div>
  );
};

export default ProfileTab;
