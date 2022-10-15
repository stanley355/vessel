import React, { useState } from "react";
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
  const {
    profile,
    channelStats,
    lastSubscription,
    lastInvoice,
    subscriptions_freq,
  } = props;

  const [renewSubs, setRenewSubs] = useState(false);

  const SubscriptionConfirmation = () => {
    if (!renewSubs && lastSubscription && lastInvoice) {
      if (lastInvoice.status === "PAID" && lastSubscription.expiredAt) {
        const expiredAt = new Date(lastSubscription.expired_at).getTime();
        const currentTime = new Date().getTime();
        if (currentTime > expiredAt) {
          return (
            <SubscriptionConfirmationForm
              subscriptions_freq={subscriptions_freq}
              profile={profile}
              channelStats={channelStats}
            />
          );
        }
        return (
          <AwaitingPaymentBox
            lastSubscription={lastSubscription}
            lastInvoice={lastInvoice}
            onRenewClick={() => setRenewSubs(true)}
          />
        );
      }
      return (
        <AwaitingPaymentBox
          lastSubscription={lastSubscription}
          lastInvoice={lastInvoice}
          onRenewClick={() => setRenewSubs(true)}
        />
      );
    }

    return (
      <SubscriptionConfirmationForm
        subscriptions_freq={subscriptions_freq}
        profile={profile}
        channelStats={channelStats}
      />
    );
  };

  return (
    <div className="container">
      <div className={styles.subscription__slug}>
        <SubscriptionConfirmation />
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

  if (profile && channelStats && channelStats) {
    subscriptions = await viewSubscription({
      userID: profile.id,
      channelID: channelStats.id,
    });

    if (subscriptions && subscriptions.length > 0) {
      lastSubscription = subscriptions[subscriptions.length - 1];
      lastInvoice = await viewInvoice(lastSubscription.invoice_id);
    }
  }

  if (lastSubscription && lastSubscription.paid) {
    const expiredAt = new Date(lastSubscription.expired_at).getTime();
    const currentTime = new Date().getTime();
    if (currentTime < expiredAt) {
      return {
        redirect: {
          destination: `/channel/${slug}`,
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      profile: profile ?? null,
      channelStats: channelStats ?? null,
      subcriptions_freq: subscriptions?.length ?? 0,
      lastSubscription: lastSubscription ?? null,
      lastInvoice: lastInvoice ?? null,
    },
  };
};

export default SubscriptionSlug;
