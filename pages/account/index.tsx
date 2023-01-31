import React from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import jsCookie from "js-cookie";
import jwtDecode from "jwt-decode";
import channelLoginHandler from "../../lib/loginHandler/channelLoginHandler";
import viewBalance from "../../lib/paymentHandler/viewBalance";
import HomeMetaHead from "../../components/pages/Home/HomeMetaHead";
import UserProfileCard from "../../components/pages/Account/UserProfileCard";
import useResponsive from "../../lib/hooks/useResponsive";
import {
  FaBell,
  FaPlayCircle,
  FaWallet,
  FaChevronCircleRight,
} from "react-icons/fa";
import styles from "./account.module.scss";

const Account = (props: any) => {
  const { profile, balance } = props;

  const { isDesktop } = useResponsive();

  const ACCOUNT_LINKS = [
    {
      url: "/account/channel/",
      icon: <FaPlayCircle />,
      title: "Channel Saya",
      subtitle: "Belum Ada Channel",
    },
    {
      url: "/account/wallet/",
      icon: <FaWallet />,
      title: "Penghasilan Saya",
      subtitle: balance
        ? balance.amount > 0
          ? `Rp ${balance.amount}`
          : "Rp 0"
        : "Error",
    },
    {
      url: "/account/subscription/",
      icon: <FaBell />,
      title: "Subscription Saya",
      subtitle: "Ongoing/Pending Subscription",
    },
  ];

  const AccountHero = () => (
    <div className={styles.hero}>
      <div>
        <img
          src="/images/cartoon/explore.png"
          alt="explore"
          width={360}
          height={300}
        />
      </div>
      <h3>Ayo, Jelajahi Kontenku Sekarang!</h3>
    </div>
  );

  return (
    <div className="container">
      <HomeMetaHead />
      <div className={styles.account}>
        {!isDesktop && <AccountHero />}
        <div className={styles.account__menu}>
          <UserProfileCard profile={profile} />
          {ACCOUNT_LINKS.map((link: any) => (
            <Link href={link.url} key={link.url}>
              <div className={styles.link}>
                <div className={styles.main}>
                  {link.icon}
                  <div>
                    <div className={styles.title}>{link.title}</div>
                    <div className={styles.subtitle}>{link.subtitle}</div>
                  </div>
                </div>
                <FaChevronCircleRight />
              </div>
            </Link>
          ))}
        </div>
        {isDesktop && <AccountHero />}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies["token"];
  const profile: any = token ? jwtDecode(token) : "";
  let balance: any;
  let channel: any;

  if (!token) {
    return {
      redirect: {
        destination: "/account/login/",
        permanent: false,
      },
    };
  }

  if (profile && profile.id) {
    balance = await viewBalance(profile.id);
  }

  // Refetch channel data if there's necessary changes e.g (subscribers/post)
  if (profile && profile.has_channel) {
    const channelLogin = await channelLoginHandler(token);

    if (channelLogin && channelLogin.token) {
      channel = jwtDecode(channelLogin.token);
      jsCookie.set("token_channel", channelLogin.token, { expires: 15 });
    }
  }

  return {
    props: {
      profile: profile ?? null,
      balance: balance ?? null,
      channel: channel ?? null,
    },
  };
};

export default Account;
