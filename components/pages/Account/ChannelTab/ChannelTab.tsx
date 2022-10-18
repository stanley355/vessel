import React, { useState } from "react";
import CreateChannelForm from "../CreateChannelForm";
import ChannelStatus from "../ChannelStatus";
import NoChannelCard from "../NoChannelCard";
import NoPostsCard from "../NoPostsCard";
import PostCard from "../PostCard";
import UploadPostForm from "../UploadPostForm";
import styles from "./ChannelTab.module.scss";

interface IChannelTab {
  channel: any;
  posts: any[];
}

const ChannelTab = (props: IChannelTab) => {
  const { channel, posts } = props;

  const [showCreateChannelForm, setShowCreateChannelForm] = useState(false);
  const [showUploadPostForm, setShowUploadPostForm] = useState(false);

  const PostSection = () => {
    if (posts && posts.length > 0) {
      return (
        <div className={styles.posts__wrap}>
          {posts.map((post: any) => <div key={post.id}> <PostCard channel={channel} post={post} /> </div>)}
        </div>
      )
    }
    return <NoPostsCard onUploadClick={() => setShowUploadPostForm(true)} />
  }

  const MainChannelTab = () => {
    return showUploadPostForm ? (
      <UploadPostForm onBackBtnClick={() => setShowUploadPostForm(false)} />
    ) : <PostSection />;
  };

  const NoChannelComponent = () => {
    return showCreateChannelForm ? (
      <CreateChannelForm />
    ) : (
      <NoChannelCard
        onCreateChannelClick={() => setShowCreateChannelForm(true)}
      />
    );
  };

  const HasChannelComponent = () => {
    return (
      <div className={styles.channel__tab}>
        <ChannelStatus channel={channel} />
        <div className={styles.main}>
          <div className={styles.main__head}>
            <h2>My Posts</h2>
            {!showUploadPostForm && <button type="button" className={styles.upload__btn} onClick={() => setShowUploadPostForm(true)}>Upload</button>}
          </div>
          <MainChannelTab />
        </div>
      </div>
    );
  };

  return (
    <div>{channel ? <HasChannelComponent /> : <NoChannelComponent />}</div>
  );
};

export default ChannelTab;
