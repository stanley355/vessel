import React, { useEffect, useState } from 'react';
import getConfig from 'next/config';
import jwt_decode from 'jwt-decode';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import fetcher from '../../../lib/fetcher';
import styles from './login.module.scss';

const { BASE_URL } = getConfig().publicRuntimeConfig;

const AccountLogin = () => {
  const [clientID, setClientID] = useState('');

  useEffect(() => {
    getClientID();
  }, [clientID])

  const getClientID = async () => {
    const config = await fetcher(`${BASE_URL}/api/google-client-id/`, {});
    if (config.data) {
      setClientID(config.data.clientID);
    } else {
      console.error('Client ID not loaded')
    }
  }

  const handleGSignIn = (googleRes: any) => {
    const data = jwt_decode(googleRes.credential);
    console.log(data);
  }

  return (
    <GoogleOAuthProvider clientId={clientID}>
      <div className='container'>
        <div className={styles.account__login}>
          <h1 className={styles.title}>Login / Daftar</h1>
          <GoogleLogin
            onSuccess={handleGSignIn}
            onError={() => alert('Internal Server Error')}
            logo_alignment='left'
            theme='filled_blue'
            shape='rectangular'
            width='360'
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}

export default AccountLogin;