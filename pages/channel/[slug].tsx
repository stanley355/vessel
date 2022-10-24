import React, { useState } from "react";
import getConfig from "next/config";
import jwtDecode from "jwt-decode";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import ChannelStatus from "../../components/pages/Account/ChannelStatus";
import ChannelNoPosts from "../../components/pages/Channel/ChannelNoPosts";
import ChannelNotSubscribed from "../../components/pages/Channel/ChannelNotSubscribed";
import SubscribeChannelForm from "../../components/pages/Channel/SubscribeChannelForm";
import findChannel from "../../lib/channelHandler/findChannel";
import viewSubscriptions from "../../lib/subscriptionHandler/viewSubscriptions";
import checkSubscriptionStatus from "../../lib/subscriptionHandler/checkSubscriptionStatus";
import fetcher from "../../lib/fetcher";
import styles from "./ChannelSlug.module.scss";

const { BASE_URL } = getConfig().publicRuntimeConfig;

interface IChannelSlug {
  profile: any;
  channel: any;
  subscribing: any;
}

const ChannelSlug = (props: IChannelSlug) => {
  const { profile, channel, subscribing } = props;

  const [showSubscribeForm, setShowSubscribeForm] = useState(false);

  const ChannelBody = () => {
    if (channel && channel.posts_number > 0) {
      if (subscribing) {
        return <div>hi</div>;
      } else {
        return showSubscribeForm ? (
          <SubscribeChannelForm profile={profile} channel={channel} />
        ) : (
          <ChannelNotSubscribed
            onSubscribeClick={() => setShowSubscribeForm(true)}
          />
        );
      }
    } else {
      return <ChannelNoPosts />;
    }
  };

  const MainSection = () => {
    return (
      <div className={styles.main}>
        <div className={styles.main__head}>
          <h2>Posts</h2>
          <button type="button" className={styles.subscribe__btn}>
            Subscribe
          </button>
        </div>
        <div className={styles.posts__wrap}>
          {/* <ChannelBody /> */}
          <SubscribeChannelForm profile={profile} channel={channel} />
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className={styles.channel__slug}>
        {channel && <ChannelStatus channel={channel} />}
        <MainSection />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const slug: any = context?.params?.slug ?? "";
  const token = context.req.cookies["token"];
  const profile: any = token ? jwtDecode(token) : "";
  const channel = (await findChannel(slug)) ?? null;
  let subscribing: string = "";

  if (profile && channel && channel.id) {
    const payload = {
      userID: profile.id,
      channelID: channel.id,
    };
    const subscription = await viewSubscriptions(payload);
    subscribing =
      subscription.length > 0
        ? checkSubscriptionStatus(subscription[subscription.length - 1])
        : "";
  }
  // const posts = await fetcher(`${BASE_URL}/api/channel/post/view?slug=${slug}`, {});

  if (!token) {
    return {
      redirect: {
        destination: "/account/login/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      profile,
      channel,
      subscribing,
    },
  };
};

export default ChannelSlug;
