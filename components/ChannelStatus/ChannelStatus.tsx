import React from "react";
import { FaUpload } from "react-icons/fa";
import useResponsive from "../../lib/hooks/useResponsive";
import styles from "./ChannelStatus.module.scss";

interface IChannelStatus {
  isPublic: boolean;
  onUploadClick?: () => void;
  channel: {
    profile_img_url: string;
    channel_name: string;
    posts_number: number;
    subscribers: number;
    slug: string;
  };
}

const ChannelStatus = (props: IChannelStatus) => {
  const { isPublic, onUploadClick, channel } = props;

  const { isDesktop } = useResponsive();

  return (
    <div className={styles.channel__status}>
      <div className={styles.img__wrap}>
        <img
          src={channel.profile_img_url}
          alt={channel.channel_name}
          width={300}
          height={300}
        />
      </div>

      <div className={styles.desc}>
        <div className={styles.title}>{channel.channel_name}</div>
        <div className={styles.subtitle}>
          <span> {channel.posts_number} posts</span>
          <span>|</span>
          <span>{channel.subscribers} subscribers</span>
        </div>
      </div>

      {!isPublic && (
        <button className={styles.upload} onClick={onUploadClick}>
          <FaUpload /> {isDesktop ? "Upload" : ""}
        </button>
      )}
    </div>
  );
};

export default ChannelStatus;
