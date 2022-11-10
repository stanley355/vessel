import React from 'react';
import Link from 'next/link';
import { FaHome, FaTabletAlt,  FaUser, FaWallet } from 'react-icons/fa';
import styles from './NavigationFooter.module.scss';

const NavigationFooter = () => {
  return (
    <div className={styles.navigation__footer}>
      <Link href="/">
        <FaHome />
      </Link>
      <Link href="/account/">
        <FaTabletAlt />
      </Link>
      <Link href="/account/wallet/">
        <FaWallet />
      </Link>
      <Link href="/account/?tab=user">
        <FaUser />
      </Link>
    </div>
  )
}

export default NavigationFooter;