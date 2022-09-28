import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <h2>Kontenku</h2>

      <Link href="/account/login">
        <a title='Login'>
          Login / Daftar
        </a>
      </Link>
    </div>
  )
}

export default Navbar;