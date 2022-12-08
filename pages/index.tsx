import React from "react";
import type { NextPage } from "next";
import jwtDecode from "jwt-decode";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import viewHomePosts from "../lib/postHandler/viewHomePosts";
import viewSubscriptions from "../lib/subscriptionHandler/viewSubscriptions";
import HomePostCard from "../components/pages/Home/HomePostCard";
import SearchBar from "../components/pages/Home/SearchBar";
import UserFlow from "../components/pages/Home/UserFlow";
import HomeMetaHead from "../components/pages/Home/HomeMetaHead";
import findSubscribedChannel from "../lib/channelHandler/findSubscribedChannel";
import styles from "../styles/pages/home.module.scss";

const Home: NextPage = (props: any) => {
  const { token, posts } = props;

  return (
    <div className="container">
      <HomeMetaHead posts={posts} />
      <UserFlow />
      <div className={styles.home}>
        <div className={styles.home__hero}>
          <img src="/images/home_hero.gif" loading="lazy" />
          <div>Kontenku - Platform Membership Konten #1 Indonesia</div>
          <div>
            Kontenku adalah Platform Service tempat content creator dapat
            memposting content, lalu para subscriber content dapat mendukung
            content creator dengan cara mensubscribe channel content creator.
          </div>
        </div>

        <div className={styles.home__posts}>
          <SearchBar />
          {posts &&
            posts.length &&
            posts.map((post: any) => (
              <div key={post.id}>
                <HomePostCard post={post} token={token} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const token = context.req.cookies["token"] ?? null;
  const profile: any = token ? jwtDecode(token) : "";
  let posts: any[] = [];

  if (profile && profile.id) {
    const subscriptions = await viewSubscriptions(profile.id);
    if (subscriptions && subscriptions.length > 0) {
      const subscribedChannels = await findSubscribedChannel(subscriptions);

      if (subscribedChannels && subscribedChannels.length > 0) {
        const subscribedChannelsID = subscribedChannels.map((subs: any) => subs.id);
        posts = await viewHomePosts(subscribedChannelsID);
      }
    } else {
      posts = await viewHomePosts([]);
    }
  } else {
    posts = await viewHomePosts([]);
  }

  return {
    props: {
      token,
      posts,
    },
  };
};

export default Home;
