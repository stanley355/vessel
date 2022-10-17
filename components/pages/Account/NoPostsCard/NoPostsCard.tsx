import React from "react";
import { FaRegFrownOpen } from "react-icons/fa";
import styles from "./NoPostsCard.module.scss";

interface INoPosts {
  onUploadClick: () => void;
}

const NoPostsCard = (props: INoPosts) => {
  const { onUploadClick } = props;

  return (
    <div className={styles.no__posts}>
      <FaRegFrownOpen />
      <div className={styles.title}>Anda belum mempunyai Post</div>
      <button type="button" className={styles.cta} onClick={onUploadClick}>
        Upload
      </button>
    </div>
  );
};

export default NoPostsCard;
