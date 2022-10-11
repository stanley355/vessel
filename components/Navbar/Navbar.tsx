import React from "react";
import Link from "next/link";
import jsCookie from "js-cookie";
import styles from "./Navbar.module.scss";
import useAuthenticated from "../../lib/hooks/useAuthenticated";

const Navbar = () => {
  const isAuthenticated = useAuthenticated();

  const LoginBtn = () => {
    return (
      <Link href="/account/login">
        <a title="Login">Login / Daftar</a>
      </Link>
    );
  };

  const AccountBtn = () => {
    return (
      <Link href="/account/">
        <a title="Account">Account</a>
      </Link>
    );
  };

  return (
    <div className={styles.navbar}>
      <h2>Kontenku</h2>

      {isAuthenticated ? <AccountBtn /> : <LoginBtn />}
    </div>
  );
};

export default Navbar;
