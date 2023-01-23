import React, { useEffect } from "react";
import { GetStaticProps } from "next";
import getConfig from "next/config";
import Router from "next/router";
import Cookies from "js-cookie";
import fetcher from "../../../lib/fetcher";
import AccountLoginHero from "../../../components/pages/Account/AccountLoginHero/AccountLoginHero";
import HomeMetaHead from "../../../components/pages/Home/HomeMetaHead";
import styles from "./login.module.scss";

const { BASE_URL } = getConfig().publicRuntimeConfig;

const AccountLogin = (props: any) => {
  const { clientID } = props;

  useEffect(()=> {
    const token = Cookies.get('token');
    if (token) {
      Router.push('/account/');
    }
  }, [clientID]);

  return (
    <div className={styles.account__login}>
      <HomeMetaHead posts={[]} />
      <AccountLoginHero clientID={clientID} />
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/42HB6oHm-X4?autoplay=1&mute=1"
        title="Kontenku"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
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
