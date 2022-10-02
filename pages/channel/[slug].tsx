import React from 'react';
import jwtDecode from 'jwt-decode';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import HasNoPostCard from '../../components/pages/Channel/HasNoPostCard/';

const ChannelSlug = (props: any) => {
  const { slug, profile, channel } = props;
  const isMyChannel = channel && (channel.slug === slug);

  return (
    <div className='container'>
      <HasNoPostCard isMyChannel={isMyChannel} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const token = context.req.cookies['token'];
  const tokenChannel = context.req.cookies['token_channel'];
  let profile;
  let channel;

  if (!token) {
    return {
      redirect: {
        destination: '/account/login/',
        permanent: false,
      },
    }
  }

  if (token) profile = jwtDecode(token);
  if (tokenChannel) channel = jwtDecode(tokenChannel);

  return {
    props: {
      slug: context?.params?.slug,
      profile: profile ?? null,
      channel: channel ?? null,
    }
  }
}

export default ChannelSlug;