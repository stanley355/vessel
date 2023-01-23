import { GetServerSideProps } from "next";
import React from "react";
import getConfig from "next/config";
import fetcher from "../../../lib/fetcher";
import GoogleSignInBtn from "../../../components/GoogleSignInBtn";
import HomeMetaHead from "../../../components/pages/Home/HomeMetaHead";
import styles from "./login.module.scss";

const { BASE_URL } = getConfig().publicRuntimeConfig;

const AccountLogin = (props: any) => {
  const { clientID } = props;

  return (
    <div>
      <HomeMetaHead posts={[]} />
      <div className={styles.account__login}>
        <div className="container">
          <div className={styles.copywriting}>
            <div className={styles.logo__wrap}>
              <img src="/images/kontenku-logo-short.png" alt="Kontenku" width={360} height={150} />
            </div>
            <div className={styles.subtitle}>Exclusive for the Fans</div>
          </div>
          <div className={styles.text}>Masuk / Daftar</div>
          <div className={styles.gsignin__wrap}>
            <GoogleSignInBtn clientID={clientID} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies["token"];
  const config = await fetcher(`${BASE_URL}/api/google-client-id/`, {});

  if (token) {
    return {
      redirect: {
        destination: "/account/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      clientID: config?.clientID ?? "",
    },
  };
};

export default AccountLogin;
