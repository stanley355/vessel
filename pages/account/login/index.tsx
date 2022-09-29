import React, { useEffect, useState } from 'react';
import getConfig from 'next/config';
import jwt_decode from 'jwt-decode';
import jsCookie from 'js-cookie';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import fetcher from '../../../lib/fetcher';
import { WARNING_MSG } from '../../../lib/warning-messages';
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

  const handleGSignIn = async (googleRes: any) => {
    const credential: any = jwt_decode(googleRes.credential);
    const data = {
      fullname: credential.name,
      email: credential.email
    }

    const loginRes = await fetcher(`${BASE_URL}/api/account/gmail-login`, { method: 'POST', data });
    if (loginRes.data && loginRes.data.token) {
      jsCookie.set('token', loginRes.data.token);
      window.location.reload();
    } else {
      alert(WARNING_MSG.TRY_AGAIN)
    }
  }

  return (
    <GoogleOAuthProvider clientId={clientID}>
      <div className='container'>
        <div className={styles.account__login}>
          <h1 className={styles.title}>Login / Daftar</h1>
          <GoogleLogin
            onSuccess={handleGSignIn}
            onError={() => alert(WARNING_MSG.TRY_AGAIN)}
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