import React from 'react';
import GoogleSignInBtn from '../../../components/GoogleSignInBtn';
import styles from './login.module.scss';

const AccountLogin = () => {
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