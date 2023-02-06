import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaHome, FaPlayCircle, FaSearch, FaUser, FaCog } from "react-icons/fa";
import styles from "./NavigationFooter.module.scss";

const NavigationFooter = () => {
  const router = useRouter();
  const isChannel = router.asPath === "/account/channel";

  const ChannelLink = () => (
    <Link href="/account/channel/">
      <span>
        <FaPlayCircle />
      </span>
    </Link>
  );

  const ChannelSettingLink = () => (
    <Link href="/channel/setting/">
      <span>
        <FaCog />
      </span>
    </Link>
  )

  const AccountLink = () => (
    <Link href="/account/">
      <span>
        <FaUser />
      </span>
    </Link>
  )

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
      {isChannel ? <AccountLink /> : <ChannelLink /> }
      {isChannel ? <ChannelSettingLink /> : <AccountLink /> }
    </div>
  );
};

export default NavigationFooter;
