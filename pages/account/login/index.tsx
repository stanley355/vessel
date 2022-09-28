import React from 'react';
import Head from 'next/head';

const AccountLogin = () => {

  const loadGSignInScript = () => {
    if (typeof window !== 'undefined') {
      return (
        <Head>
          <script src="https://apis.google.com/js/platform.js" async defer />
          <meta name="google-signin-client_id" content="823740612457-jprigf74qvsv7dnem6loqi13sfsdt02f.apps.googleusercontent.com" />
        </Head>
      )
    }
  }

  return (
    <div className='container'>
      {loadGSignInScript()}
      <h3>User Login</h3>
      <div className="g-signin2" data-onsuccess="onSignIn" />
    </div>
  )
}

export default AccountLogin;