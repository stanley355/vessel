import React from "react";
import { FaRegFrownOpen } from "react-icons/fa";
import styles from "./NoChannelCard.module.scss";

interface INoChannel {
  onCreateChannelClick: () => void;
}

const NoChannelCard = (props: INoChannel) => {
  const { onCreateChannelClick } = props;

  return (
    <div className={styles.no__channel}>
      <FaRegFrownOpen />
      <div className={styles.title}>Anda belum mempunyai Channel</div>
      <button
        type="button"
        className={styles.cta}
        onClick={onCreateChannelClick}
      >
        Buat Channel
      </button>
    </div>
  );
};

export default NoChannelCard;
