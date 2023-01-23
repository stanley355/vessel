import React from 'react';
import GoogleSignInBtn from '../../../GoogleSignInBtn';
import styles from './AcountLoginHero.module.scss';

const AccountLoginHero = ({ clientID }:any) => {
  return (
    <div className={styles.login__hero}>
      <div className="container">
        <div className={styles.logo__wrap}>
          <img src="/images/kontenku-logo-short.png" alt="Kontenku" width={360} height={150} />
        </div>
        <div className={styles.subtitle}>Exclusive for the Fans</div>
      </div>
      <div className={styles.login__text}>Masuk / Daftar</div>
      <div className={styles.gsignin__wrap}>
        <GoogleSignInBtn clientID={clientID} />
      </div>
    </div>
  )
}

export default AccountLoginHero;