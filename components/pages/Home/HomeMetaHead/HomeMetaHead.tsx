import React from "react";
import MetaHead from "../../../MetaHead";

interface IHomeMetaHead {
  posts: any[];
}

const HomeMetaHead = (props: IHomeMetaHead) => {
  const { posts } = props;

  const HOME_META = {
    title: "Kontenku - video dan musik kesukaanmu",
    description:
      "Nikmati video dan musik yang Anda sukai, unggah konten original, dan bagikan semuanya dengan teman, keluarga, dan dunia di Kontenku.",
    publishedTime: "",
    modifiedTime: posts && posts.length ? posts[0].created_at : "",
    channelName: "Kontenku",
  };

  return <MetaHead meta={HOME_META} />;
};

export default HomeMetaHead;
