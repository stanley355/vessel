import React, { useState } from "react";
import Link from "next/link";
import styles from "./AwaitingPaymentForm.module.scss";

interface IAwaitingPayment {
  profile: {
    id: string;
    fullname: string;
    email: string;
  };
  channel: {
    id: number;
    channel_name: string;
  };
  pendingOrder: any;
  onRenewClick: () => void;
}

const AwaitingPaymentForm = (props: IAwaitingPayment) => {
  const { profile, channel, pendingOrder, onRenewClick } =
    props;

  const orderExpiryDate = () => {
    if (pendingOrder.merchant) {
      return new Date(pendingOrder.expired_at).toLocaleString();
    } else {
      const startDate = new Date(pendingOrder.created_at);

      // seconds * minutes * hours * milliseconds = 1 day 
      const day = 60 * 60 * 24 * 1000;

      const endDate = new Date(startDate.getTime() + day);
      return endDate.toLocaleString();
    }
  }

  const isOrderExpired = () => {
    if (pendingOrder.merchant) {
      const expDate = new Date(pendingOrder.expired_at);
      const currentDate = new Date();

      return currentDate.getTime() > expDate.getTime();
    }

    return false;

  }

  const RenewPaymentBtn = () => (
    <div className={styles.renew}>
      <div className={styles.renew__info}>
        Tagihan Anda sudah tidak berlaku, klik di bawah untuk memperbaharui
        tagihan
      </div>
      <button type="button" onClick={onRenewClick}>
        Perbarui Langganan
      </button>
    </div>
  );

  return (
    <div className={styles.await__payment}>
      <div className={styles.title}>Awaiting Payment</div>
      <div className={styles.subtitle}>
        Menunggu pembayaran untuk langganan Channel {channel.channel_name}
      </div>

      <div className={styles.info}>Nama pelanggan : {profile.fullname} </div>
      <div className={styles.info}>Email : {profile.email} </div>
      <div className={styles.info}>
        Durasi Langganan: {pendingOrder.subscription_duration} Bulan
      </div>
      <div className={styles.info}>Total Harga: {pendingOrder.amount}</div>
      <div className={styles.info}>Batas Pembayaran: {orderExpiryDate()}</div>

      {isOrderExpired() ? (
        <RenewPaymentBtn />
      ) : (
        <Link href={`/checkout/${pendingOrder.id}`}>
          <a title="Link Pembayaran" className={styles.payment__link}>
            Link Pembayaran
          </a>
        </Link>
      )}
    </div>
  );
};

export default AwaitingPaymentForm;
