import React from "react";
import type { NextPage } from "next";
import jwtDecode from "jwt-decode";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import viewHomePosts from "../lib/postHandler/viewHomePosts";
import viewSubscriptions from "../lib/subscriptionHandler/viewSubscriptions";
import HomePostCard from "../components/pages/Home/HomePostCard";
import SearchBar from "../components/pages/Home/SearchBar";
import HomeMetaHead from "../components/pages/Home/HomeMetaHead";
import findSubscribedChannel from "../lib/channelHandler/findSubscribedChannel";
import styles from "../styles/pages/home.module.scss";

const Home: NextPage = (props: any) => {
  const { token, posts } = props;

  return (
    <div className="container">
      <HomeMetaHead posts={posts} />
      <div className={styles.home}>
        <div className={styles.home__hero}>
          <img src="/images/home_hero.webp" alt="hero" width={490} height={390} />
          <div>Kontenku - Konten Service #1 Indonesia</div>
          <div>
            Kontenku adalah tempat bagi Content Creator untuk menawarkan konten eksklusif yang dapat dibayar oleh subscriber dengan harga premium.
            Nikmati video dan musik yang Anda sukai, unggah konten original, dan bagikan semuanya untuk para fans, teman, keluarga, dan dunia di Kontenku.
          </div>
        </div>

        <div className={styles.home__posts}>
          <SearchBar />
          {(posts &&
            posts.length > 0) &&
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

  if (!token) {
    return {
      redirect: {
        destination: "/account/login/",
        permanent: false,
      },
    };
  }

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
