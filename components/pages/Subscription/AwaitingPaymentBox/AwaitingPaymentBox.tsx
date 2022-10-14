import React from 'react';
import Link from 'next/link';

interface IAwaitingPayment {
  lastSubscription: any;
  lastInvoice: any;
}

const AwaitingPaymentBox = (props: IAwaitingPayment) => {
  const { lastSubscription, lastInvoice } = props;

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
              <a title={lastInvoice.invoice_url}>
                Klik Disini
              </a>
            </Link>
          </span>
        </div>
      </div>

      <div>
        <div>* Notifikasi pembayaran sudah dikirimkan ke email : {lastInvoice.payer_email}</div>
        <div>** Jika pembayaran selesai harap klik tombol di bawah ini untuk konfirmasi</div>
      </div>

      <div>
        <button type='button'>Saya sudah bayar</button>
        {lastInvoice.status === 'EXPIRED' && <button type='button'>Perbaharui Langganan</button> }
      </div>
    </div>
  )
}

export default AwaitingPaymentBox;