import React from 'react';
import styles from './RejectedWithdrawalForm.module.scss';

interface IRejectedWithdrawal {
  withdrawal: any;
  onCloseClick: () => void;
}

const RejectedWithdrawalForm = (props: IRejectedWithdrawal) => {
  const { withdrawal, onCloseClick } = props;

  return (
    <div className={styles.reject__form}>
      <div className={styles.box}>
        <button onClick={onCloseClick} className={styles.close__btn}>X</button>
        <h3>Withdrawal Rejection</h3>
        <form action="">
          <div>ID: {withdrawal.id}</div>
          <div>User ID: {withdrawal.user_id}</div>
          <div>Bank: {withdrawal.bank_name}</div>
          <div>Acc No: {withdrawal.account_number}</div>
          <div>Acc Owner: {withdrawal.account_owner_name}</div>
          <div>Amount: {withdrawal.amount}</div>
          <div>Status: {withdrawal.status}</div>

          <input type="text" placeholder='Alasan Penolakan...' />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default RejectedWithdrawalForm;