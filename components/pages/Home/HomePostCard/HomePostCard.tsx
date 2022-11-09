import React from "react";
import parse from "html-react-parser";
import styles from "./HomePostCard.module.scss";

interface IPostCard {
  post: any;
}

const PostCard = (props: IPostCard) => {
  const { post } = props;

  const getPostDate = () => {
    const date = new Date(post.created_at).toDateString();
    return date;
  };

  return (
    <div className={styles.post__card}>
      <div className={styles.post__card__head}>
        {/* <span className={styles.channel__img}>
          <img src={channel.profile_img_url} alt={channel.channel_name} />
        </span> */}
        <span>
          <div className={styles.title}>{post.channel_slug}</div>
          <div>{getPostDate()}</div>
        </span>
      </div>

      {post.post_type === "Video" ? (
        <div className={styles.video__wrap}>
          <video width={300} height={250} controls>
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
