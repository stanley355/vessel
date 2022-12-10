import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./AccountChannelInfo.module.scss";

interface IAccountChannelInfo {
  channel: any;
}

const AccountChannelInfo = (props: IAccountChannelInfo) => {
  const { channel } = props;

  return (
    <div className={styles.account__channel}>
      <div className={styles.info}>
        <div className={styles.img__wrap}>
          <Image src={channel.profile_img_url} alt={channel.channel_name} width={50} height={50} />
        </div>
        <div className={styles.texts}>
          <span>{channel.channel_name}</span>
          <span>Subscription price: {channel.subscription_price}</span>
        </div>
      </div>
      <Link href="/channel/setting/">
        <a title="setting">Setting</a>
      </Link>
    </div>
  );
};

export default AccountChannelInfo;
