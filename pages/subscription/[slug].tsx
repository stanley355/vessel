import React, { useState } from "react";
import getConfig from "next/config";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import jwtDecode from "jwt-decode";
import fetcher from "../../lib/fetcher";
import styles from "./SubscriptionSlug.module.scss";

const { BASE_URL } = getConfig().publicRuntimeConfig;

const SubscriptionSlug = (props: any) => {
  const { profile, channelStats } = props;

  const [subsDuration, setSubsDuration] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log(e.target.subscription_duration.value);
  };

  return (
    <div className="container">
      <div className={styles.subscription__slug}>
        <h2 className={styles.title}>Subscription Confirmation</h2>

        <h3>Pelanggan: </h3>
        <div>Nama Pelanggan: {profile.fullname}</div>
        <div>Email: {profile.email}</div>

        <h3>Channel Langganan: </h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>Nama channel: {channelStats.channel_name}</div>
          <div>Harga Langganan / Bulan : {channelStats.subscription_price}</div>
          <div className={styles.form__field}>
            <label htmlFor="subscription_duration">Durasi langganan : </label>
            <select
              name="subscription_duration"
              id="subscription_duration"
              onChange={(e: any) => setSubsDuration(e.target.value)}
              defaultValue="1"
            >
              <option value="1">1 Bulan</option>
              <option value="2">2 Bulan</option>
              <option value="3">3 Bulan</option>
              <option value="4">4 Bulan</option>
              <option value="5">5 Bulan</option>
              <option value="6">6 Bulan</option>
            </select>
          </div>

          <div>
            Total Harga: {subsDuration * channelStats.subscription_price}
          </div>

          <button type="submit" className={styles.form__cta}>
            Submit
          </button>
        </form>
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
