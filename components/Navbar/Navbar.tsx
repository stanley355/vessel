import React from 'react';
import Link from 'next/link';
import jsCookie from 'js-cookie';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const token = jsCookie.get('token');

  const logoutUser = () => {
    jsCookie.remove('token');
    window.location.reload();
  }

  const LoginBtn = () => {
    return (
      <Link href="/account/login">
        <a title='Login'>
          Login / Daftar
        </a>
      </Link>
    )
  }

  return (
    <div className={styles.navbar}>
      <h2>Kontenku</h2>

      {!token ? <LoginBtn /> : <button onClick={logoutUser} >Logout</button>}
    </div>
  )
}

export default Navbar;