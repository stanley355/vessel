import React from 'react';
import jwtDecode from 'jwt-decode';
import getConfig from 'next/config';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import HasNoPostCard from '../../components/pages/Channel/HasNoPostCard/';
import PostCard from '../../components/pages/Channel/PostCard';
import fetcher from '../../lib/fetcher';

const { BASE_URL } = getConfig().publicRuntimeConfig;

const ChannelSlug = (props: any) => {
  const { slug, profile, channel, posts } = props;
  const isMyChannel = channel && (channel.slug === slug);

  return (
    <div className='container'>
      {posts.length > 0 ? <PostCard posts={posts}/> : <HasNoPostCard isMyChannel={isMyChannel} />}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const slug = context?.params?.slug;
  
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

  const posts = await fetcher(`${BASE_URL}/api/channel/view-post?slug=${slug}`, {});

  return {
    props: {
      slug: slug ?? '',
      profile: profile ?? null,
      channel: channel ?? null,
      posts: posts?.data ?? []
    }
  }
}

export default ChannelSlug;