import React from "react";
import styles from "./WalletPaymentsTable.module.scss";

interface IChannelPayments {
  payments: any[];
}

const WalletPaymentsTable = (props: IChannelPayments) => {
  const { payments } = props;

  const displayDate = (date: string) => {
    return (
      new Date(date).toLocaleDateString() +
      " " +
      new Date(date).toLocaleTimeString()
    );
  };

  const PaymentTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>No. </th>
            <th>Tanggal</th>
            <th>Jumlah</th>
            <th>Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment: any, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{displayDate(payment.created_at)}</td>
              <td className={styles.total_amount}>{payment.total_amount}</td>
              <td>NEW SUBSCRIBERS</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className={styles.wallet__payments}>
      <h3>Wallet Income</h3>
      {payments.length > 0 ? (
        <PaymentTable />
      ) : (
        <div>Belum ada pembayaran Subscriber ke Channel Anda</div>
      )}
    </div>
  );
};

export default WalletPaymentsTable;
