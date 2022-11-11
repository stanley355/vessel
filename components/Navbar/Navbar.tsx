import React from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";

interface INavbar {
  token: string
}

const Navbar = (props: INavbar) => {
  const { token } = props;

  return (
    <div className={styles.navbar}>
      <Link href="/account/login">
        <h2>Kontenku</h2>
      </Link>
    </div>
  );
};

export default Navbar;
