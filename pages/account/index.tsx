import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import jwtDecode from 'jwt-decode';
import logoutUser from '../../lib/loginHandler/logoutUser';
import styles from './account.module.scss';
import { GetServerSideProps } from 'next';

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
        <div>
          <h3>My Profile</h3>
          <div>Fullname: {profile && profile.fullname} </div>
          <div>Email: {profile && profile.email} </div>
        </div>

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