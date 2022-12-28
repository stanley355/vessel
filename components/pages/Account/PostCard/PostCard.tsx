import React from "react";
import Image from "next/image";
import parse from "html-react-parser";
import styles from "./PostCard.module.scss";

interface IPostCard {
  channel: any;
  post: any;
}

const PostCard = (props: IPostCard) => {
  const { channel, post } = props;

  const getPostDate = () => {
    const date = new Date(post.created_at).toDateString();
    return date;
  };

  return (
    <div className={styles.post__card}>
      <div className={styles.post__card__head}>
        <span className={styles.channel__img}>
          <Image
            src={channel.profile_img_url}
            alt={post.channel_name}
            width={75}
            height={75}
          />
        </span>
        <span className={styles.post_info}>
          <div className={styles.title}>{channel.channel_name}</div>
          <div>{getPostDate()}</div>
        </span>
      </div>

      {post.post_type === "Video" ? (
        <div className={styles.video__wrap}>
          <video
            width={300}
            height={250}
            controls
            preload="auto"
            poster="/images/video-placeholder.jpg"
          >
            <source src={post.img_url} type="video/mp4" />
            <source src={post.img_url} type="video/ogg" />
          </video>
        </div>
      ) : (
        <div className={styles.img__wrap}>
          <img width={300} height={300} src={post.img_url} alt={post.id} />
        </div>
      )}
      <div>{parse(post.description)}</div>
    </div>
  );
};

export default PostCard;
