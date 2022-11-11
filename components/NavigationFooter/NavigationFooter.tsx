import React from 'react';
import Link from 'next/link';
import { FaHome, FaUser, FaWallet } from 'react-icons/fa';
import styles from './NavigationFooter.module.scss';

const NavigationFooter = () => {
  return (
    <div className={styles.navigation__footer}>
      <Link href="/">
        <FaHome />
      </Link>
      <Link href="/account/wallet/">
        <FaWallet />
      </Link>
      <Link href="/account/">
        <FaUser />
      </Link>
    </div>
  )
}

export default NavigationFooter;