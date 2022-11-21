import React from "react";
import MetaHead from "../../../MetaHead";

interface IHomeMetaHead {
  posts: any[];
}

const HomeMetaHead = (props: IHomeMetaHead) => {
  const { posts } = props;

  const HOME_META = {
    title: "Kontenku - Platform Konten Berbayar untuk Content Creator",
    description:
      "Kontenku - Dapatkan Pembayaran untuk Kreasimu. Di kontenku, content createor akan mendapatkan pembayaran untuk setiap subscribers yang didapat.",
    publishedTime: "",
    modifiedTime: posts && posts.length ? posts[0].created_at : "",
    channelName: "Kontenku",
  };

  return <MetaHead meta={HOME_META} />;
};

export default HomeMetaHead;
