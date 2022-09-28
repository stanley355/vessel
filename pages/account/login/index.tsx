import React, { useState } from 'react';
import Head from 'next/head';
import getConfig from 'next/config';
import fetcher from '../../../lib/fetcher';
import styles from './login.module.scss';

const { BASE_URL } = getConfig().publicRuntimeConfig;

const AccountLogin = () => {
  const [clientID, setClientID] = useState('');

  const getClientID = async () => {
    const config = await fetcher(`${BASE_URL}/api/google-client-id/`, {});
    if (config.data) {
      setClientID(config.data.clientID);
    } else {
      console.error('Client ID not loaded')
    }
  }

  const loadGSignInScript = () => {
    getClientID();
    if (typeof window !== 'undefined' && clientID) {
      return (
        <Head>
          <script src="https://apis.google.com/js/platform.js" async />
          <meta name="google-signin-client_id" content={clientID} />
        </Head>
      )
    }
  }

  return (
    <div className='container'>
      {loadGSignInScript()}
      <div className={styles.account__login}>
        <h1 className={styles.title}>User Login</h1>
        <div
          className="g-signin2"
          data-width="360"
          data-longtitle={true}
          data-theme="dark"
          data-onsuccess="onSignIn"
        />
      </div>
    </div>
  )
}

export default AccountLogin;