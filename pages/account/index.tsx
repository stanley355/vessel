import React from 'react';
import { GetServerSideProps } from 'next';
import jwtDecode from 'jwt-decode';
import logoutUser from '../../lib/loginHandler/logoutUser';
import ChannelSection from '../../components/pages/Account/ChannelSection';
import CreateChannelForm from '../../components/pages/Account/CreateChannelForm';
import ProfileSection from '../../components/pages/Account/ProfileSection';
import styles from './account.module.scss';

const Account = (props: any) => {
  const { profile, channel } = props;

  return (
    <div className="container">
      <div className={styles.account}>
        {channel ? <ChannelSection channel={channel} /> : <CreateChannelForm />}
        {profile && <ProfileSection profile={profile} />}
        <button className={styles.account__logout} onClick={logoutUser}>Logout</button>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies['token'];
  const tokenChannel = context.req.cookies['token_channel'];
  let profile;
  let channel;

  if (!token) {
    return {
      redirect: {
        destination: '/account/login/',
        permanent: false,
      },
    }
  }

  if (token) profile = jwtDecode(token);
  if (tokenChannel) {
    
    channel = jwtDecode(tokenChannel)
  };

  return {
    props: {
      profile: profile ?? null,
      channel: channel ?? null,
    }
  }
}

export default Account;