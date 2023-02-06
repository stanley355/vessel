import React, { useState } from "react";
import { GetServerSideProps } from "next";
import jwtDecode from "jwt-decode";
import HomeMetaHead from "../../../components/pages/Home/HomeMetaHead";
import findUserPendingOrder from "../../../lib/orderHandler/findUserPendingOrder";
import findSubscribedChannel from "../../../lib/channelHandler/findSubscribedChannel";
import viewSubscriptions from "../../../lib/subscriptionHandler/viewSubscriptions";
import MySubscriptions from "../../../components/pages/Account/MySubscriptions";
import MyPendingSubscriptions from "../../../components/pages/Account/MyPendingSubscriptions";
import styles from "./subscriptioins.module.scss";

const Subscription = (props: any) => {
  const { profile, subscriptions, pendingOrder } = props;

  const [activeTab, setActiveTab] = useState("subscriptions");

  const SubscriptionsTab = () => (
    <div className={styles.subscriptions__tab}>
      <button
        type="button"
        onClick={() => setActiveTab("subscriptions")}
        className={activeTab === "subscriptions" ? styles.active__btn : ""}
      >
        Subscriptions
      </button>
      <button
        type="button"
        onClick={() => setActiveTab("pending_subs")}
        className={activeTab === "pending_subs" ? styles.active__btn : ""}
      >
        Pending Subscriptions
      </button>
    </div>
  );

  return (
    <div className="container">
      <HomeMetaHead />
      <div className={styles.subscriptions}>
        <h3>Subscription Saya</h3>
        <SubscriptionsTab />
        {activeTab === "subscriptions" ? (
          <MySubscriptions subscriptions={subscriptions} />
        ) : (
          <MyPendingSubscriptions pendingSubscriptions={pendingOrder} />
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies["token"];
  const profile: any = token ? jwtDecode(token) : "";
  let subscriptions: any = [];
  let pendingOrder: any = [];

  if (!token) {
    return {
      redirect: {
        destination: "/account/login/",
        permanent: false,
      },
    };
  }

  if (profile && profile.id) {
    pendingOrder = await findUserPendingOrder(profile.id);
    const subscriptionsID = await viewSubscriptions(profile.id);

    if (subscriptionsID && subscriptionsID.length > 0) {
      subscriptions = (await findSubscribedChannel(subscriptionsID)) ?? [];
    }
  }

  return {
    props: {
      profile: profile ?? null,
      subscriptions,
      pendingOrder,
    },
  };
};

export default Subscription;
