import React, { useState } from "react";
import Link from "next/link";
import updatePaidSubscription from "../../../../lib/subscriptionHandler/updatePaidSubscription";
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
  invoice: {
    id: string;
    status: string;
    invoice_url: string;
    amount: number;
  }
  subscriptionDuration: number;
  onRenewClick: () => void;
}

const AwaitingPaymentForm = (props: IAwaitingPayment) => {
  const {
    profile,
    channel,
    invoice,
    subscriptionDuration,
    onRenewClick,
  } = props;

  const [hasSubmit, setHasSubmit] = useState(false);
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setHasSubmit(true);

    const subscriptionPayload = {
      userID: profile.id,
      channelID: channel.id,
      invoiceID: invoice.id
    }
    // const paidSubscription = await updatePaidSubscription(subscriptionPayload);

  }

  const ConfirmPaymentBtn = () => (
    <div className={styles.confirm}>
      {invoice.status === 'PAID' ?
        <button
          type="submit"
          disabled={hasSubmit}>
          {hasSubmit ? 'Memproses...' : 'Saya sudah bayar'}
        </button> :
        <Link href={invoice.invoice_url}>
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
        Menunggu pembayaran untuk langganan Channel {channel.channel_name}
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.info}>Nama pelanggan : {profile.fullname} </div>
        <div className={styles.info}>Email : {profile.email} </div>
        <div className={styles.info}>
          Durasi Langganan: {subscriptionDuration} Bulan
        </div>
        <div className={styles.info}>Total Harga: {invoice.amount}</div>
        <div className={styles.info}>Status: {invoice.status}</div>
        {invoice.status === 'PAID' ? "*Klik tombol di bawah untuk konfirmasi pembayaran" : "*Harap refresh halaman ini setelah melakukan pembayaran"}
        {invoice.status === "EXPIRED" ? (
          <RenewPaymentBtn />
        ) : (
          <ConfirmPaymentBtn />
        )}
      </form>
    </div>
  );
};

export default AwaitingPaymentForm;
