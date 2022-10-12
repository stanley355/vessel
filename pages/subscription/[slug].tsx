import React from "react";
import getConfig from "next/config";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import jwtDecode from "jwt-decode";
import fetcher from "../../lib/fetcher";
import SubscriptionConfirmationForm from "../../components/pages/Subscription/SubscriptionConfirmationForm";
import styles from "./SubscriptionSlug.module.scss";

const { BASE_URL } = getConfig().publicRuntimeConfig;

const SubscriptionSlug = (props: any) => {
  const { profile, channelStats } = props;

  return (
    <div className="container">
      <div className={styles.subscription__slug}>
        <SubscriptionConfirmationForm profile={profile} channelStats={channelStats} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const slug = context?.params?.slug;

  const token = context.req.cookies["token"];
  let profile;

  if (!token) {
    return {
      redirect: {
        destination: "/account/login/",
        permanent: false,
      },
    };
  }

  if (token) profile = jwtDecode(token);

  const channelStats = await fetcher(
    `${BASE_URL}/api/channel/status/?slug=${slug}`,
    {}
  );

  return {
    props: {
      profile: profile ?? null,
      channelStats: channelStats?.data ?? null,
    },
  };
};

export default SubscriptionSlug;
