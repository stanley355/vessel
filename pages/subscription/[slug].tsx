import React from "react";
import getConfig from "next/config";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import jwtDecode from "jwt-decode";
import fetcher from "../../lib/fetcher";
import viewSubscription from "../../lib/subscriptionHandler/viewSubscription";
import SubscriptionConfirmationForm from "../../components/pages/Subscription/SubscriptionConfirmationForm";
import styles from "./SubscriptionSlug.module.scss";

const { BASE_URL } = getConfig().publicRuntimeConfig;

const SubscriptionSlug = (props: any) => {
  const { profile, channelStats, subscriptions } = props;

  const lastSubscription = subscriptions && subscriptions.length > 0 ? subscriptions[subscriptions.length - 1] : {};
  console.log(lastSubscription);

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
  let profile: any;
  let subscriptions;

  if (!token) {
    return {
      redirect: {
        destination: "/account/login/",
        permanent: false,
      },
    };
  }

  if (token) profile = jwtDecode(token);
  const channelStats:any = await fetcher(
    `${BASE_URL}/api/channel/status/?slug=${slug}`,
    {}
  );

  if (token && profile && channelStats && channelStats.data) {
    const data = {
      userID: profile.id,
      channelID: channelStats.data.id,
    }
    subscriptions = await viewSubscription(data)
  }

  return {
    props: {
      profile: profile ?? null,
      channelStats: channelStats?.data ?? null,
      subscriptions: subscriptions ?? null,
    },
  };
};

export default SubscriptionSlug;
