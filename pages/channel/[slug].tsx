import React from "react";
import getConfig from "next/config";
import jwtDecode from "jwt-decode";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import ChannelStatus from "../../components/pages/Account/ChannelStatus";
import ChannelNoPosts from "../../components/pages/Channel/ChannelNoPosts";
import ChannelNotSubscribed from "../../components/pages/Channel/ChannelNotSubscribed";
import SubscribeChannelForm from "../../components/pages/Channel/SubscribeChannelForm";
import findChannel from "../../lib/channelHandler/findChannel";
import fetcher from "../../lib/fetcher";
import styles from './ChannelSlug.module.scss';

const { BASE_URL } = getConfig().publicRuntimeConfig;

interface IChannelSlug {
  slug: string;
  profile: any;
  channel: any;
}

const ChannelSlug = (props: IChannelSlug) => {
  const { slug, profile, channel } = props;

  const MainSection = () => {
    return (
      <div className={styles.main}>
        <div className={styles.main__head}>
          <h2>Posts</h2>
          <button type="button" className={styles.subscribe__btn}>Subscribe</button>
        </div>
        <div className={styles.posts__wrap}>
          {/* <ChannelNoPosts /> */}
          {/* <ChannelNotSubscribed onSubscribeClick={() =>{}} /> */}
          <SubscribeChannelForm profile={profile} channel={channel} />
        </div>
      </div>
    )
  }

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
  const slug: any = context?.params?.slug;
  const token = context.req.cookies["token"];
  const profile: any = token ? jwtDecode(token) : "";
  const channel = await findChannel(slug);
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
      slug: slug ?? "",
      profile: profile ?? null,
      channel: channel ?? null,
    },
  };
};

export default ChannelSlug;
