import React from "react";
import { FaRegFrownOpen } from "react-icons/fa";
import styles from "./ChannelNoPosts.module.scss";

const ChannelNoPosts = () => {

  return (
    <div className={styles.no__posts}>
      <FaRegFrownOpen />
      <div className={styles.title}>Channel belum mempunyai Post</div>
    </div>
  );
};

export default ChannelNoPosts;
