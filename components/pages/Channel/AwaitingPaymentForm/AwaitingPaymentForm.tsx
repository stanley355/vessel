import React, { useState } from "react";
import Link from "next/link";
import styles from "./AwaitingPaymentForm.module.scss";

interface IAwaitingPayment {
  profile: {
    fullname: string;
    email: string;
  };
  channelName: string;
  subscriptionDuration: number;
  totalPrice: number;
  invoiceStatus: string;
  invoiceLink: string;
  onRenewClick: () => void;
}

const AwaitingPaymentForm = (props: IAwaitingPayment) => {
  const {
    profile,
    channelName,
    subscriptionDuration,
    totalPrice,
    invoiceStatus,
    invoiceLink,
    onRenewClick,
  } = props;

  const [hasSubmit, setHasSubmit] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setHasSubmit(true);
  }

  const ConfirmPaymentBtn = () => (
    <div className={styles.confirm}>
      {invoiceStatus === 'PAID' ?
        <button
          type="submit"
          disabled={hasSubmit}>
          {hasSubmit ? 'Memproses...' : 'Saya sudah bayar'}
        </button> :
        <Link href={invoiceLink}>
          <a title="Invoice Link">Link Pembayaran</a>
        </Link>}
    </div>
  );

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
        Menunggu pembayaran untuk langganan Channel {channelName}
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.info}>Nama pelanggan : {profile.fullname} </div>
        <div className={styles.info}>Email : {profile.email} </div>
        <div className={styles.info}>
          Durasi Langganan: {subscriptionDuration}
        </div>
        <div className={styles.info}>Total Harga: {totalPrice}</div>
        <div className={styles.info}>Status: {invoiceStatus}</div>
        {invoiceStatus === 'PAID' ? "*Klik tombol di bawah untuk konfirmasi pembayaran" : "*Harap refresh halaman ini setelah melakukan pembayaran"}
        {invoiceStatus !== "EXPIRED" ? (
          <ConfirmPaymentBtn />
        ) : (
          <RenewPaymentBtn />
        )}
      </form>
    </div>
  );
};

export default AwaitingPaymentForm;
