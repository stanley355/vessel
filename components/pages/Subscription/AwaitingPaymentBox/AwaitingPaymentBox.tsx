import React from "react";
import Link from "next/link";
import updatePaidSubscription from "../../../../lib/subscriptionHandler/updatePaidSubscription";

interface IAwaitingPayment {
  onRenewClick: () => void;
  lastSubscription: any;
  lastInvoice: any;
}

const AwaitingPaymentBox = (props: IAwaitingPayment) => {
  const { onRenewClick, lastSubscription, lastInvoice } = props;

  const handlePaymentConfirmation = async () => {
    if (lastInvoice && lastInvoice.status === "PAID") {
      const payload = {
        userID: lastSubscription.user_id,
        channelID: lastSubscription.channels_id,
        invoiceID: lastInvoice.id
      }

      const subscriptionStatus = await updatePaidSubscription(payload);
      if (subscriptionStatus && subscriptionStatus.paid) {
        alert('Berhasil')
      } else {
        alert('Pembayaran belum dapat diproses, harap tunggu beberapa saat lagi')
      }
    }
    else {
      alert('Pembayaran belum diterima');
    }
  }

  return (
    <div>
      <h2>Payment Checkout</h2>

      <div>
        <div>Keterangan : {lastInvoice.description}</div>
        <div>Durasi Langganan : {lastSubscription.duration}</div>
        <div>Total Harga : {lastInvoice.amount}</div>
        <div>Status Pembayaran : {lastInvoice.status}</div>
        <div>
          <span>Link Pembayaran : </span>
          <span>
            <Link href={lastInvoice.invoice_url}>
              <a title={lastInvoice.invoice_url}>Klik Disini</a>
            </Link>
          </span>
        </div>
      </div>

      <div>
        <div>
          * Notifikasi pembayaran sudah dikirimkan ke email :{" "}
          {lastInvoice.payer_email}
        </div>
        <div>
          ** Jika pembayaran selesai harap klik tombol di bawah ini untuk
          konfirmasi
        </div>
      </div>

      <div>
        <button type="button" onClick={handlePaymentConfirmation}>Saya sudah bayar</button>
        {lastInvoice.status === "EXPIRED" && (
          <button type="button" onClick={onRenewClick}>Perbaharui Langganan</button>
        )}
      </div>
    </div>
  );
};

export default AwaitingPaymentBox;
