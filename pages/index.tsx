import React from 'react';
import type { NextPage } from "next";
import jwtDecode from 'jwt-decode';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import viewHomePosts from '../lib/postHandler/viewHomePosts';
import viewSubscriptions from '../lib/subscriptionHandler/viewSubscriptions';
import filterSimilarSubscription from '../lib/filterSimilarSubscription';

const Home: NextPage = (props: any) => {
  const { posts } = props;
  return <div className="container">hi</div>;
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {

  const token = context.req.cookies["token"];
  const profile: any = token ? jwtDecode(token) : "";
  let posts: any[] = [];

  if (!token) {
    return {
      redirect: {
        destination: "/account/login/",
        permanent: false,
      },
    };
  }

  if (profile && profile.id) {
    const rawSubscriptions = await viewSubscriptions({ userID: profile.id });
    if (rawSubscriptions && rawSubscriptions.length > 0) {
      const subscriptions = filterSimilarSubscription(rawSubscriptions);
      const subscriptionsChannelID = subscriptions.map((subscription) => Number(subscription.channels_id));
      posts = await viewHomePosts(subscriptionsChannelID);
    } else {
      posts = await viewHomePosts([]);
    }
  } else {
    posts = await viewHomePosts([]);
  }
  
  return {
    props: {
      posts
    }
  }
}

export default Home;
