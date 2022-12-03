import React, { useEffect, useState } from "react";
import useResponsive from "../../../../lib/hooks/useResponsive";
import styles from "./WalletWithdrawalTable.module.scss";

interface IWithdrawalTable {
  withdrawal: any[];
}

const WalletWithdrawalTable = (props: IWithdrawalTable) => {
  const { withdrawal } = props;

  const { isDesktop } = useResponsive();

  //   {
  //     "id": "08cccd17-e93c-44c3-a2a4-d6e53ea2f2b0",
  //     "created_at": "2022-12-02T09:24:13.000Z",
  //     "updated_at": "2022-12-03T08:35:24.346Z",
  //     "user_id": "73034da5-d327-45fb-b9b3-d3577ed6ef7e",
  //     "bank_name": "BCA",
  //     "account_number": "38",
  //     "account_owner_name": "stan",
  //     "amount": 2000,
  //     "status": "REJECTED",
  //     "message": "Akun bank tidak ditemukan"
  // }

  const displayDate = (date: string) => {
    return new Date(date).toDateString();
  };

  const WithdrawalList = () => {
    return (
      <div className={styles.list}>
        {withdrawal.map((withdraw: any, index: number) => (
          <div className={styles.row}>
            <span>
              <div>Tgl: {displayDate(withdraw.created_at)}</div>
              <div>Via: {withdraw.bank_name} / {withdraw.account_number}</div>
              <div>Jumlah: {withdraw.amount}</div>
            </span>
            <span className={styles.row__status}>
              {withdraw.status}
            </span>
          </div>
        ))}
      </div>
    )
  }

  const WithdrawalTable = () => {
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
          {withdrawal.map((withdraw: any, index) => (
            <tr key={withdraw.id}>

              <td>{index + 1}</td>
              <td>{displayDate(withdraw.created_at)}</td>
            </tr>
          ))}
          {/* {channelPayments.map((payment: any, index: number) => (
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
          ))} */}
        </tbody>
      </table>
    );
  };

  return (
    <div className={styles.wallet__withdrawal}>
      <h3>Wallet Withdrawal</h3>
      {!isDesktop && "*Gunakan laptop/komputer untuk melihat lebih banyak"}
      <WithdrawalList />
      {/* {channelPayments.length > 0 ? (
        <PaymentTable />
      ) : (
        <div>Belum ada pembayaran Subscriber ke Channel Anda</div>
      )} */}
    </div>
  );
};

export default WalletWithdrawalTable;
