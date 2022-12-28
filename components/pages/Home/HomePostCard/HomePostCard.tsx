import React from "react";
import Link from "next/link";
import Image from "next/image";
import parse from "html-react-parser";
import styles from "./HomePostCard.module.scss";

interface IPostCard {
  token: string;
  post: any;
}

const PostCard = (props: IPostCard) => {
  const { token, post } = props;

  const getPostDate = () => {
    const date = new Date(post.created_at).toDateString();
    return date;
  };

  return (
    <div className={styles.post__card}>
      <div className={styles.post__card__head}>
        <Link
          href={token ? `/channel/${post.channels_slug}/` : "/account/login/"}
        >
          <div className={styles.post__card__head__info}>
            <span className={styles.channel__img}>
              <Image
                src={post.profile_img_url}
                alt={post.channel_name}
                width={50}
                height={50}
              />
            </span>
            <span className={styles.post__info}>
              <div className={styles.title}>{post.channel_name}</div>
              <div>{getPostDate()}</div>
            </span>
          </div>
        </Link>

        <Link
          href={token ? `/channel/${post.channels_slug}/` : "/account/login/"}
        >
          <a title={post.channels_slug}>Subscribe</a>
        </Link>
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
