import React from 'react';
import parse from "html-react-parser";

interface IPostCard {
  post: any;
}

const PostCard = (props: IPostCard) => {
  const { post } = props;

  return (
    <div>
      <div>
        <img src={post.img_url} alt={post.id} />
      </div>
      <div>
        {parse(post.description)}
      </div>
    </div>
  )
}

export default PostCard;