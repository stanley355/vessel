import Router from 'next/router';
import React, { useEffect } from 'react';
import GoogleSignInBtn from '../../../components/GoogleSignInBtn';
import useAuthenticated from '../../../lib/hooks/useAuthenticated';
import styles from './login.module.scss';

const AccountLogin = () => {
  const isAuthenticated = useAuthenticated();

  useEffect(()=> {
    if (isAuthenticated) Router.push('/account/');
  }, [])

  return (
    <div className='container'>
      <div className={styles.account__login}>
        <h1 className={styles.title}>Login / Daftar</h1>
        <GoogleSignInBtn />
      </div>
    </div>
  )
}

export default AccountLogin;