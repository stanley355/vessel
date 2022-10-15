import React from "react";
import getNameInitials from "../../../../lib/getNameInitials";
import styles from "./UserProfileCard.module.scss";

interface IUserProfile {
  profile: {
    fullname: string;
    email: string;
  };
}

const UserProfileCard = (props: IUserProfile) => {
  const { profile } = props;

  return (
    <div className={styles.profile__card}>
      <div className={styles.profile__image}>
        {getNameInitials(profile.fullname)}
      </div>
      <div>
        <div className={styles.name}>{profile.fullname}</div>
        <div>{profile.email}</div>
      </div>
    </div>
  );
};

export default UserProfileCard;
