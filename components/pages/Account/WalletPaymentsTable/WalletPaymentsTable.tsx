import React, { useEffect, useState } from "react";
import useResponsive from "../../../../lib/hooks/useResponsive";
import styles from "./WalletPaymentsTable.module.scss";

interface IChannelPayments {
  payments: any[];
}

const WalletPaymentsTable = (props: IChannelPayments) => {
  const { payments } = props;

  const { isDesktop } = useResponsive();

  const [channelPayments, setChannelPayments] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setChannelPayments(payments);
    }
  }, [payments]);

  const displayDate = (date: string) => {
    return new Date(date).toDateString();
  };

  const PaymentTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>No. </th>
            <th>Tanggal</th>
            {isDesktop && <th>Jumlah Awal</th>}
            {isDesktop && <th>Biaya Platform</th>}
            <th>Jumlah bersih</th>
            {isDesktop && <th>Keterangan</th>}
          </tr>
        </thead>
        <tbody>
          {channelPayments.map((payment: any, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{displayDate(payment.created_at)}</td>
              {isDesktop && <td>{payment.total_amount}</td>}
              {isDesktop && <td>{payment.platform_fee}</td>}
              <td className={styles.net_income}>
                {payment.channel_net_income}
              </td>
              {isDesktop && <td>NEW SUBSCRIBERS</td>}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className={styles.wallet__payments}>
      <h3>Wallet Transactions</h3>
      {!isDesktop && "*Gunakan laptop/komputer untuk melihat lebih banyak"}
      {channelPayments.length > 0 ? (
        <PaymentTable />
      ) : (
        <div>Belum ada pembayaran Subscriber ke Channel Anda</div>
      )}
    </div>
  );
};

export default WalletPaymentsTable;
