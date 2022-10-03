import React from 'react';
import styles from './PostCard.module.scss';

interface IPostCard {
  posts: any[]
}

const PostCard = (props: IPostCard) => {
  const { posts } = props;

  return (
    <div className={styles.post__card}>
      {posts.length > 0 && posts.map(post =>
        <div key={post.id} className={styles.card}>
          <div className={styles.img__wrap}>
            <img
              src={post.img_url}
              alt={`/${post.channel_slug}/${post.id}`}
              width={360}
              height={200}
            />
          </div>
          <div className={styles.description}>{post.description}</div>
        </div>
      )}
    </div>
  )
}

export default PostCard;