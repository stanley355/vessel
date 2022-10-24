import React from "react";
import LogoutBtn from "../LogoutBtn";
import UserProfileCard from "../UserProfileCard";
import MySubscriptions from "../MySubscriptions";
import useResponsive from "../../../../lib/hooks/useResponsive";

import styles from "./ProfileTab.module.scss";

interface IProfileTab {
  profile: {
    fullname: string;
    email: string;
  };
}

const ProfileTab = (props: IProfileTab) => {
  const { profile } = props;
  const { isDesktop } = useResponsive();

  return (
    <div className={styles.profile__tab}>
      <div className={styles.profile__tab__user}>
        {profile && <UserProfileCard profile={profile} />}
        {isDesktop && <LogoutBtn />}
      </div>
      <MySubscriptions subscriptions={[]}/>
      <br />
      {!isDesktop && <LogoutBtn />}
    </div>
  );
};

export default ProfileTab;
