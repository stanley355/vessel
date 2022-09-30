import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Router from 'next/router';
import jwtDecode from 'jwt-decode';
import logoutUser from '../../lib/loginHandler/logoutUser';
import CreateChannelForm from '../../components/pages/Account/CreateChannelForm';
import ProfileSection from '../../components/pages/Account/ProfileSection';
import styles from './account.module.scss';


const Account = (props: any) => {
  const { token } = props;

  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!token) Router.push('/account/login/');
    if (!profile) {
      const decode = jwtDecode(token);
      setProfile(decode);
    }
  }, [token, profile])

  return (
    <div className="container">
      <div className={styles.account}>
        <CreateChannelForm ownerID={profile?.owner_id ?? ''} />
        {profile && <ProfileSection profile={profile} /> }

        <button className={styles.account__logout} onClick={logoutUser}>Logout</button>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies['token'];

  return {
    props: {
      token: token ?? null
    }
  }
}

export default Account;