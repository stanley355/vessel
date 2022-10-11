import React from "react";
import parse from "html-react-parser";
import styles from "./PostCard.module.scss";

interface IPostCard {
  posts: any[];
}

const PostCard = (props: IPostCard) => {
  const { posts } = props;

  const VideoPost = ({ props }: any) => (
    <video controls>
      <source src={props.img_url} type="video/mp4" />
      <source src={props.img_url} type="video/ogg" />
    </video>
  );

  const ImgPost = ({ props }: any) => (
    <div className={styles.img__wrap}>
      <img
        src={props.img_url}
        alt={`/${props.channel_slug}/${props.id}`}
        width={360}
        height={200}
      />
    </div>
  );

  return (
    <div className={styles.post__card}>
      {posts.length > 0 &&
        posts.map((post) => (
          <div key={post.id} className={styles.card}>
            {post.post_type === "Video" ? (
              <VideoPost props={post} />
            ) : (
              <ImgPost props={post} />
            )}
            <div className={styles.description}>{parse(post.description)}</div>
          </div>
        ))}
    </div>
  );
};

export default PostCard;
