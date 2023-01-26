import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import jwtDecode from 'jwt-decode';
import jsCookie from 'js-cookie';
import channelLoginHandler from '../../../lib/loginHandler/channelLoginHandler';
import viewPost from '../../../lib/postHandler/viewPost';
import PostCard from '../../../components/pages/Account/PostCard';
import NoPostsCard from '../../../components/pages/Account/NoPostsCard';
import UploadPostForm from '../../../components/pages/Account/UploadPostForm';
import CreateChannelForm from '../../../components/pages/Account/CreateChannelForm';
import NoChannelCard from '../../../components/pages/Account/NoChannelCard';
import ChannelStatus from '../../../components/pages/Account/ChannelStatus';
import "node_modules/video-react/dist/video-react.css";
import styles from './AccountChannel.module.scss';

interface IChannelTab {
  channel: any;
  posts: any[];
}

const AccountChannel = (props: IChannelTab) => {
  const { channel, posts } = props;

  const [showCreateChannelForm, setShowCreateChannelForm] = useState(false);
  const [showUploadPostForm, setShowUploadPostForm] = useState(false);

  const PostSection = () => {
    if (posts && posts.length > 0) {
      return (
        <div className={styles.posts__wrap}>
          {posts.map((post: any) => (
            <div key={post.id}>
              {" "}
              <PostCard channel={channel} post={post} />{" "}
            </div>
          ))}
        </div>
      );
    }
    return <NoPostsCard onUploadClick={() => setShowUploadPostForm(true)} />;
  };

  const MainChannelTab = () => {
    return showUploadPostForm ? (
      <UploadPostForm onBackBtnClick={() => setShowUploadPostForm(false)} />
    ) : (
      <PostSection />
    );
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
            {!showUploadPostForm && (
              <button
                type="button"
                className={styles.upload__btn}
                onClick={() => setShowUploadPostForm(true)}
              >
                Upload
              </button>
            )}
          </div>
          <MainChannelTab />
        </div>
      </div>
    );
  };

  return (
    <div className='container'>{channel ? <HasChannelComponent /> : <NoChannelComponent />}</div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies["token"];
  const profile: any = token ? jwtDecode(token) : "";
  let channel: any;
  let posts: any[] = [];

  if (!token) {
    return {
      redirect: {
        destination: "/account/login/",
        permanent: false,
      },
    };
  }

  // Refetch channel data if there's necessary changes e.g (subscribers/post)
  if (profile && profile.has_channel) {
    const channelLogin = await channelLoginHandler(token);

    if (channelLogin && channelLogin.token) {
      channel = jwtDecode(channelLogin.token);
      jsCookie.set("token_channel", channelLogin.token, { expires: 15 });
    }
  }

  if (channel && channel.posts_number > 0) {
    posts = await viewPost(channel.slug);
  }

  return {
    props: {
      profile: profile ?? null,
      channel: channel ?? null,
      posts,
    },
  };

  return {
    props: {},
  };
};


export default AccountChannel;