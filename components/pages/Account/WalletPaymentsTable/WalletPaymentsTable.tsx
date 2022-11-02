import React, { useEffect, useState } from 'react';
import styles from './WalletPaymentsTable.module.scss';

interface IChannelPayments {
  payments: any[]
}

const WalletPaymentsTable = (props: IChannelPayments) => {
  const { payments } = props;

  const [channelPayments, setChannelPayments] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setChannelPayments(payments);
    }
  }, [payments]);

  const displayDate = (date: string) => {
    return new Date(date).toDateString();
  }

  const PaymentTable = () => {
    return (
      <table>
        <tr>
          <th>No. </th>
          <th>Tanggal</th>
          <th>Jumlah bersih</th>
        </tr>
        {channelPayments.map((payment: any, index: number) =>
          <tr>
            <td>{index + 1}</td>
            <td>{displayDate(payment.created_at)}</td>
            <td>{payment.channel_net_income}</td>
          </tr>
        )}
      </table>
    )
  }


  return (
    <div className={styles.wallet__payments}>
      <h3>Wallet Transactions</h3>

      {channelPayments.length > 0 ?
        <PaymentTable />
        :
        <div>Belum ada pembayaran Subscriber ke Channel Anda</div>
      }
    </div>
  )
}

export default WalletPaymentsTable;