import React from 'react';
import Link from 'next/link';
import styles from './AwaitingPaymentForm.module.scss';

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
  const { profile, channelName, subscriptionDuration, totalPrice, invoiceStatus, invoiceLink, onRenewClick } = props;

  const ConfirmPaymentBtn = () => (
    <div>
      <Link href={invoiceLink}>
        <a title="Invoice Link">
          Link Pembayaran
        </a>
      </Link>
      <button type="submit">
        Saya sudah bayar
      </button>
    </div>
  );

  const RenewPaymentBtn = () => (
    <div>
      <div>Tagihan Anda sudah tidak berlaku, klik di bawah untuk memperbaharui tagihan</div>
      <button onClick={onRenewClick}></button>
    </div>
  )

  return (
    <div>
      <div>Awaiting Payment</div>
      <div>Menunggu pembayaran untuk langganan Channel {channelName}</div>

      <form onSubmit={() => { }}>
        <div className={styles.user}>Nama pelanggan : {profile.fullname} </div>
        <div className={styles.user}>Email : {profile.email} </div>
        <div>Durasi Langganan: {subscriptionDuration}</div>
        <div>Total Harga: {totalPrice}</div>

        {invoiceStatus !== "EXPIRED" ? <ConfirmPaymentBtn /> : <RenewPaymentBtn />}
      </form>
    </div>
  )
}

export default AwaitingPaymentForm;