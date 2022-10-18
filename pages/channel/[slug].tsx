import React from "react";
import getConfig from "next/config";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import ChannelStatus from "../../components/pages/Account/ChannelStatus";
import findChannel from "../../lib/channelHandler/findChannel";
import styles from './ChannelSlug.module.scss';

const { BASE_URL } = getConfig().publicRuntimeConfig;

interface IChannelSlug {
  slug: string;
  channel: any;
}

const ChannelSlug = (props: IChannelSlug) => {
  const { slug, channel } = props;

  return (
    <div className="container">
      <div className={styles.channel__slug}>
        {channel && <ChannelStatus channel={channel} />}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const slug: any = context?.params?.slug;
  const channel = await findChannel(slug);

  return {
    props: {
      slug: slug ?? "",
      channel: channel ?? null,
    },
  };
};

export default ChannelSlug;
