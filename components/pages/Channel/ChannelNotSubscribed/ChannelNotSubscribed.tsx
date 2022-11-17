import React from "react";
import { FaRegFrownOpen } from "react-icons/fa";
import styles from "./ChannelNotSubscribed.module.scss";

interface IChannelNotSubscribed {
  onSubscribeClick: () => void;
}

const ChannelNotSubscribed = (props: IChannelNotSubscribed) => {
  const { onSubscribeClick } = props;

  return (
    <div className={styles.not__subscribed}>
      <FaRegFrownOpen />
      <div className={styles.title}>Anda belum subscribe Channel ini</div>
      <div>Subscribe untuk melihat lebih banyak</div>
      <button type="button" className={styles.cta} onClick={onSubscribeClick}>
        Subscribe
      </button>
    </div>
  );
};

export default ChannelNotSubscribed;
