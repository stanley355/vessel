import React, { useEffect } from "react";
import { GetStaticProps } from "next";
import getConfig from "next/config";
import Router from "next/router";
import Cookies from "js-cookie";
import fetcher from "../../../lib/fetcher";
import AccountLoginHero from "../../../components/pages/Account/AccountLoginHero";
import HomeMetaHead from "../../../components/pages/Home/HomeMetaHead";
import GoogleSignInBtn from "../../../components/GoogleSignInBtn";
import styles from "./login.module.scss";

const { BASE_URL } = getConfig().publicRuntimeConfig;

const AccountLogin = (props: any) => {
  const { clientID } = props;

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      Router.push('/account/');
    }
  }, [clientID]);

  return (
    <div className={styles.account__login}>
      <HomeMetaHead posts={[]} />
      <AccountLoginHero clientID={clientID} />
      <div className={styles.info}>
        <div className={styles.head}>
          <h1 className={styles.title}>Apa itu Kontenku?</h1>
          <div>
            <img src="/images/home_hero.webp" alt="hero" />
          </div>
        </div>
        <div className={styles.subtitle}>
          Kontenku adalah platform konten berbasis subscription.
          Creator dapat membuat content dan memasang harga
          subscription untuk diakses oleh para fans. Setelah
          pembayaran subscription diterima, kami akan mengirimkan
          uang tersebut kepada creator dalam 1 hari kerja.
        </div>
      </div>
      <div className={styles.benefit__container}>
        <div className={styles.benefit}>
          <h3 className={styles.title}>Keuntungan memulai di Kontenku</h3>

          <ul>
            <li>Bebas Biaya</li>
            <li>Penarikan Uang Cepat</li>
            <li>Penerimaan Uang Otomatis</li>
            <li>Kustomisasi Konten</li>
            <li>Penghasilan Konten Tambahan</li>
            <li>Full Support untuk Creator</li>
            <li>dan masih banyak lagi</li>
          </ul>
        </div>
      </div>
      <div className={styles.invitation}>
        <h3>Ayo Tunggu Apa Lagi? Buruan Daftar di <strong> Kontenku</strong> </h3>
        <GoogleSignInBtn clientID={clientID} />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const config = await fetcher(`${BASE_URL}/api/google-client-id/`, {});

  return {
    props: {
      clientID: config?.clientID ?? "",
    },
  };
};

export default AccountLogin;
