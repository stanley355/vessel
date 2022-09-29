import React, { useState, useEffect } from 'react';
import getConfig from 'next/config';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import gmailSignInHandler from '../../lib/loginHandler/gmailLoginHandler';
import fetcher from '../../lib/fetcher';
import { WARNING_MSG } from '../../lib/warning-messages';

const { BASE_URL } = getConfig().publicRuntimeConfig;

const GoogleSignInBtn = () => {
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

  return (
    <GoogleOAuthProvider clientId={clientID}>
      <GoogleLogin
        onSuccess={gmailSignInHandler}
        onError={() => alert(WARNING_MSG.TRY_AGAIN)}
        logo_alignment='left'
        theme='filled_blue'
        shape='rectangular'
        width='360'
      />
    </GoogleOAuthProvider>
  )
}

export default GoogleSignInBtn;