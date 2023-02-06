
import React, { useState } from "react";
import Image from "next/image";
import {
  Player,
  BigPlayButton,
  ControlBar,
  ReplayControl,
  ForwardControl,
} from "video-react";
import useResponsive from "../../lib/hooks/useResponsive";
import styles from "./PostCard.module.scss";

interface IPostCard {
  channel: any;
  post: any;
}

const PostCard = (props: IPostCard) => {
  const { channel, post } = props;

  const [showModal, setShowModal] = useState(false);
  const { isDesktop } = useResponsive();

  const getPostDate = () => {
    const date = new Date(post.created_at).toDateString();
    return date;
  };

  const Modal = () => (
    <div className={styles.modal}>
      <div className={styles.box}>
        <button type="button" className={styles.close} onClick={() => setShowModal(false)}>x</button>
        <Content isPopup />
        <Caption />
      </div>
    </div>
  )

  const Content = ({ isPopup }: any) => (
    <>
      {post.post_type === "Video" ? (
        <div className={styles.video__wrap}>
          <Player playsInline fluid={isPopup || !isDesktop} width={255} height={200}>
            <BigPlayButton position="center" />
            <ControlBar autoHide={false}>
              <ReplayControl seconds={10} />
              <ForwardControl seconds={10} />
            </ControlBar>
            <source src={post.img_url} />
          </Player>
        </div>
      ) : (
        <div className={styles.img__wrap}>
          <img width={300} height={300} src={post.img_url} alt={post.id} />
        </div>
      )}
    </>
  );

  const Caption = () => (
    <div className={styles.caption}>
      <span className={styles.channel__img}>
        <Image
          src={channel.profile_img_url}
          alt={post.channel_name}
          width={50}
          height={50}
        />
      </span>
      <span className={styles.info}>
        <div>{post.title}</div>
        <div>{channel.channel_name} | {getPostDate()}</div>
      </span>
    </div>
  )

  return (
    <div className={styles.post__card} onClick={() => (isDesktop && !showModal) ? setShowModal(true) : {}}>
      <Content isPopup={false} />
      <Caption />
      {showModal && <Modal />}
    </div>
  );
};

export default PostCard;
