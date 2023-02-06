import React from "react";
import type { NextPage } from "next";
import jwtDecode from "jwt-decode";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import viewHomePosts from "../lib/postHandler/viewHomePosts";
import SearchBar from "../components/pages/Home/SearchBar";
import HomeMetaHead from "../components/pages/Home/HomeMetaHead";
import PostCard from "../components/PostCard";
import "node_modules/video-react/dist/video-react.css";
import styles from "../styles/pages/home.module.scss";

const Home: NextPage = (props: any) => {
  const { posts } = props;

  return (
    <div className="container">
      <HomeMetaHead />
      <div className={styles.home}>
          <SearchBar />
        <div className={styles.post__container}>
          {posts.map((post: any) => (
              <div key={post.id}>
                <PostCard isHome post={post} channel="" />
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
  let posts: any[] = await viewHomePosts([]); //TODO: Check subscription on post

  return {
    props: {
      token,
      posts,
    },
  };
};

export default Home;
