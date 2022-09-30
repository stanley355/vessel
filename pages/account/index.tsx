import React, { useEffect } from 'react';
import Router from 'next/router';
import jsCookie from 'js-cookie';
import logoutUser from '../../lib/loginHandler/logoutUser';
import useAuthenticated from '../../lib/hooks/useAuthenticated';
import styles from './account.module.scss';

const Account = () => {
  const token = jsCookie.get('token');
  
  if (typeof window !== 'undefined') {
    if (!token) Router.push('/account/login/');
  }

  return (
    <div className="container">
      <div className={styles.account}>
        <button className={styles.account__logout} onClick={logoutUser}>Logout</button>
      </div>
    </div>
  )
}

export default Account;