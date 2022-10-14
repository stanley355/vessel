import React from "react";
import getConfig from "next/config";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import jwtDecode from "jwt-decode";
import fetcher from "../../lib/fetcher";
import viewSubscription from "../../lib/subscriptionHandler/viewSubscription";
import viewInvoice from "../../lib/paymentHandler/viewInvoice";
import SubscriptionConfirmationForm from "../../components/pages/Subscription/SubscriptionConfirmationForm";
import AwaitingPaymentBox from "../../components/pages/Subscription/AwaitingPaymentBox";
import styles from "./SubscriptionSlug.module.scss";

const { BASE_URL } = getConfig().publicRuntimeConfig;

const SubscriptionSlug = (props: any) => {
  const { profile, channelStats, lastSubscription, lastInvoice } = props;

  return (
    <div className="container">
      <div className={styles.subscription__slug}>
        {lastInvoice ? (
          <AwaitingPaymentBox
            lastSubscription={lastSubscription}
            lastInvoice={lastInvoice}
          />
        ) : (
          <SubscriptionConfirmationForm
            profile={profile}
            channelStats={channelStats}
          />
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const slug = context?.params?.slug;

  const token: any = context.req.cookies["token"];
  let profile: any;
  let channelStats;
  let subscriptions;
  let lastSubscription;
  let lastInvoice;

  if (!token) {
    return {
      redirect: {
        destination: "/account/login/",
        permanent: false,
      },
    };
  }

  if (token) profile = jwtDecode(token);
  if (slug)
    channelStats = await fetcher(
      `${BASE_URL}/api/channel/status/?slug=${slug}`,
      {}
    );

  if (profile && channelStats && channelStats.data) {
    subscriptions = await viewSubscription({
      userID: profile.id,
      channelID: channelStats.data.id,
    });

    if (subscriptions && subscriptions.length > 0) {
      lastSubscription = subscriptions[subscriptions.length - 1];
      lastInvoice = await viewInvoice(lastSubscription.invoice_id);
    }
  }

  return {
    props: {
      profile: profile ?? null,
      channelStats: channelStats?.data ?? null,
      lastSubscription: lastSubscription ?? null,
      lastInvoice: lastInvoice ?? null,
    },
  };
};

export default SubscriptionSlug;
