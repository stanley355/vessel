import React from "react";
import Link from "next/link";
import { FaHome, FaPlayCircle, FaSearch, FaUser } from "react-icons/fa";
import styles from "./NavigationFooter.module.scss";

const NavigationFooter = () => {
  return (
    <div className={styles.navigation__footer}>
      <Link href="/">
        <span>
          <FaHome />
        </span>
      </Link>
      <Link href="/search/">
        <span>
          <FaSearch />
        </span>
      </Link>
      <Link href="/account/channel/">
        <span>
          <FaPlayCircle />
        </span>
      </Link>
      <Link href="/account/">
        <span>
          <FaUser />
        </span>
      </Link>
    </div>
  );
};

export default NavigationFooter;
