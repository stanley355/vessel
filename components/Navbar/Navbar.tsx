import React from "react";
import Link from "next/link";
import { FaHome, FaSearch, FaWallet, FaUser } from "react-icons/fa";
import styles from "./Navbar.module.scss";

interface INavbar {
  token: string;
  isDesktop: boolean;
}

const Navbar = (props: INavbar) => {
  const { token, isDesktop } = props;

  const DefaultNavbar = () => (
    <div className={styles.navbar}>
      <Link href="/">
        <h2>Kontenku</h2>
      </Link>
      <Link href="/account/login/">
        <a title="Login">Login</a>
      </Link>
    </div>
  );

  const LoginNavbar = () => {
    return (
      <div className={styles.navbar__login}>
        <Link href={token ? "/" : "/account/login"}>
          <h2>Kontenku</h2>
        </Link>

        <div className={styles.menu}>
          <Link href="/">
            <a title="home">
              <FaHome /> Home
            </a>
          </Link>
          <Link href="/search/">
            <a title="search">
              <FaSearch /> Search
            </a>
          </Link>
          <Link href="/account/wallet/">
            <a title="wallet">
              <FaWallet /> Wallet
            </a>
          </Link>
          <Link href="/account/">
            <a title="account">
              <FaUser /> Account
            </a>
          </Link>
        </div>
      </div>
    );
  };

  return token && isDesktop ? <LoginNavbar /> : <DefaultNavbar />;
};

export default Navbar;
