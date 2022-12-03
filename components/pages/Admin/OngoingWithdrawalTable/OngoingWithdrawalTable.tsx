import React from 'react';
import Router from 'next/router';
import getConfig from 'next/config';
import fetcher from '../../../../lib/fetcher';
import handleAcceptedWithdrawal from '../../../../lib/withdrawalHandler/handleAcceptedWithdrawal';
import styles from './OngoingWithdrawalTable.module.scss';

interface IWithdrawalTable {
  ongoingWithdrawals: any[]
}

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const OngoingWithdrawalTable = (props: IWithdrawalTable) => {
  const { ongoingWithdrawals } = props;


  return (
    <div className={styles.withdrawal__table}>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>User ID</td>
            <td>Created At</td>
            <td>Bank</td>
            <td>Acc No.</td>
            <td>Acc Owner Name</td>
            <td>Amount</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {ongoingWithdrawals.length > 0 &&
            ongoingWithdrawals.map((withdrawal: any) =>
              <tr key={withdrawal.id}>
                <td>{withdrawal.id}</td>
                <td>{withdrawal.user_id}</td>
                <td>{new Date(withdrawal.created_at).toDateString()}</td>
                <td>{withdrawal.bank_name}</td>
                <td>{withdrawal.account_number}</td>
                <td>{withdrawal.account_owner_name}</td>
                <td>{withdrawal.amount}</td>
                <td>{withdrawal.status}</td>
                <td className={styles.action__column}>
                  <button onClick={()=> handleAcceptedWithdrawal(withdrawal)  }>Accept</button>
                  <button>Reject</button>
                </td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  )
}

export default OngoingWithdrawalTable;