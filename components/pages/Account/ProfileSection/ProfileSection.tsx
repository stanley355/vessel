import React from "react";
import styles from "./ProfileSection.module.scss";

interface IProfileSection {
  profile: any;
}

const ProfileSection = (props: IProfileSection) => {
  const { profile } = props;

  return (
    <div className={styles.profile__section}>
      <h3>My Profile</h3>
      <div>Fullname: {profile.fullname} </div>
      <div>Email: {profile.email} </div>
    </div>
  );
};

export default ProfileSection;
