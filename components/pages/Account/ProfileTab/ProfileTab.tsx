import React, { useState } from "react";
import LogoutBtn from "../LogoutBtn";
import UserProfileCard from "../UserProfileCard";
import MySubscriptions from "../MySubscriptions";
import MyPendingSubscriptions from "../MyPendingSubscriptions";
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
  pendingOrder: any[];
}

const ProfileTab = (props: IProfileTab) => {
  const { profile, channel, balance, subscriptions, pendingOrder } = props;

  const [activeTab, setActiveTab] = useState("subscriptions");

  const SubscriptionsTab = () => (
    <div className={styles.subscriptions__tab}>
      <button
        type="button"
        onClick={() => setActiveTab("subscriptions")}
        className={activeTab === "subscriptions" ? styles.active__btn : ""}
      >
        Subscriptions
      </button>
      <button
        type="button"
        onClick={() => setActiveTab("pending_subs")}
        className={activeTab === "pending_subs" ? styles.active__btn : ""}
      >
        Pending Subscriptions
      </button>
    </div>
  );

  return (
    <div className={styles.profile__tab}>
      <div className={styles.profile__tab__user}>
        {profile && <UserProfileCard profile={profile} />}
        <LogoutBtn />
      </div>
      {channel && <AccountChannelInfo channel={channel} />}
      <MyWallet balance={balance} />
      <SubscriptionsTab />
      {activeTab === "subscriptions" ? (
        <MySubscriptions subscriptions={subscriptions} />
      ) : (
        <MyPendingSubscriptions pendingSubscriptions={pendingOrder} />
      )}
    </div>
  );
};

export default ProfileTab;
