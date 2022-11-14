import React from "react";
import type { NextPage } from "next";
import jwtDecode from "jwt-decode";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import useResponsive from "../lib/hooks/useResponsive";
import viewHomePosts from "../lib/postHandler/viewHomePosts";
import viewSubscriptions from "../lib/subscriptionHandler/viewSubscriptions";
import filterSimilarSubscription from "../lib/filterSimilarSubscription";
import HomePostCard from "../components/pages/Home/HomePostCard";
import SearchBar from "../components/pages/Home/SearchBar";
import styles from "../styles/pages/home.module.scss";

const Home: NextPage = (props: any) => {
  const { token, posts } = props;

  const { isDesktop } = useResponsive();

  return (
    <div className="container">
      <div className={styles.home}>
        <div className={styles.home__hero}>
          <img src="/images/home_hero.gif" loading="lazy" />
          <div>Dapatkan Pembayaran untuk Kreasimu</div>
          <div>
            {isDesktop
              ? "Di kontenku, setiap Channel akan dihargai dan mendapatkan pembayaran untuk setiap Subscribers yand didapat"
              : "Upload - Subscribe - Get Paid"}
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
    const rawSubscriptions = await viewSubscriptions({ userID: profile.id });
    if (rawSubscriptions && rawSubscriptions.length > 0) {
      const subscriptions = filterSimilarSubscription(rawSubscriptions);
      const subscriptionsChannelID = subscriptions.map((subscription) =>
        Number(subscription.channels_id)
      );

      posts = await viewHomePosts(subscriptionsChannelID);
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
