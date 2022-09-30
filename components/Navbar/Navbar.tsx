import React from 'react';
import Link from 'next/link';
import jsCookie from 'js-cookie';
import styles from './Navbar.module.scss';
import useAuthenticated from '../../lib/hooks/useAuthenticated';

const Navbar = () => {
  const token = useAuthenticated();

  const LoginBtn = () => {
    return (
      <Link href="/account/login">
        <a title='Login'>
          Login / Daftar
        </a>
      </Link>
    )
  }

  const AccountBtn = () => {
    return (
      <Link href="/account/">
        <a title='Account'>
          Account
        </a>
      </Link>
    )
  }

  return (
    <div className={styles.navbar}>
      <h2>Kontenku</h2>

      {!token ? <LoginBtn /> : <AccountBtn />}
    </div>
  )
}

export default Navbar;