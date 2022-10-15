import React from 'react';
import getNameInitials from '../../../../lib/getNameInitials';
import styles from './UserProfileCard.module.scss';

interface IUserProfile {
  profile: any
}

const UserProfileCard = (props: IUserProfile) => {
  const { profile } = props;
  
  return (
    <div className={styles.profile__card}>
      <div>{getNameInitials(profile.fullname)}</div>
    </div>
  )
}

export default UserProfileCard;