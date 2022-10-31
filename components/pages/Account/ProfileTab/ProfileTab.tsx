import React from "react";
import LogoutBtn from "../LogoutBtn";
import UserProfileCard from "../UserProfileCard";
import MySubscriptions from "../MySubscriptions";
import MyWallet from "../MyWallet";
import useResponsive from "../../../../lib/hooks/useResponsive";
import styles from "./ProfileTab.module.scss";

interface IProfileTab {
  profile: {
    fullname: string;
    email: string;
  };
  balance: any;
  subscriptions: any[];
}

const ProfileTab = (props: IProfileTab) => {
  const { profile, balance, subscriptions } = props;
  const { isDesktop } = useResponsive();

  return (
    <div className={styles.profile__tab}>
      <div className={styles.profile__tab__user}>
        {profile && <UserProfileCard profile={profile} />}
        {isDesktop && <LogoutBtn />}
      </div>
      <MyWallet balance={balance}/>
      <MySubscriptions subscriptions={subscriptions} />
      <br />
      {!isDesktop && <LogoutBtn />}
    </div>
  );
};

export default ProfileTab;
