import React from "react";
import getConfig from "next/config";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import ChannelStatus from "../../components/pages/Account/ChannelStatus";
import ChannelNoPosts from "../../components/pages/Channel/ChannelNoPosts";
import findChannel from "../../lib/channelHandler/findChannel";
import fetcher from "../../lib/fetcher";
import styles from './ChannelSlug.module.scss';

const { BASE_URL } = getConfig().publicRuntimeConfig;

interface IChannelSlug {
  slug: string;
  channel: any;
}

const ChannelSlug = (props: IChannelSlug) => {
  const { slug, channel } = props;

  const MainSection = () => {
    return (
      <div className={styles.main}>
        <div className={styles.main__head}>
          <h2>Posts</h2>
          <button type="button" className={styles.subscribe__btn}>Subscribe</button>
        </div>
        <div className={styles.posts__wrap}>
          <ChannelNoPosts />
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
  const channel = await findChannel(slug);
  // const posts = await fetcher(`${BASE_URL}/api/channel/post/view?slug=${slug}`, {});

  return {
    props: {
      slug: slug ?? "",
      channel: channel ?? null,
    },
  };
};

export default ChannelSlug;
