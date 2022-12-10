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
    <div className="container">
      <HomeMetaHead posts={[]} />
      <div className={styles.account__login}>
        <h2 className={styles.title}>Langsung Daftar dan Masuk Yuk! ^_^</h2>
        <GoogleSignInBtn clientID={clientID} />
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
