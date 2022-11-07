import React from 'react';
import styles from './WithdrawPopup.module.scss';

interface IWithdrawPopup {
  walletAmount: number;
  onCloseClick: () => void;
}

const WithdrawPopup = (props: IWithdrawPopup) => {
  const { walletAmount, onCloseClick } = props;

  return (
    <div className={styles.withdraw__popup}>
      <div className={styles.withdraw__box}>

        <button type='button' className={styles.close__btn} onClick={onCloseClick}>x</button>

        <h3 className={styles.title}>Penarikan Dana</h3>

        <form action="">
          <div className={styles.field}>
            <label htmlFor="bankName">Nama Bank / eWallet</label>
            <select name="bankName" id="bankName">
              <option value="BCA">BCA</option>

              <option value="BRI">BRI</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="bankAccount">Nomor Akun Bank / eWallet</label>
            <input type="text" name="bankAccount" id='bankAccount' placeholder='00000000' />
          </div>

          <div className={styles.field}>
            <label htmlFor="accountHolderName">
              <div>Nama pemilik akun</div>
              <div>*Pastikan sesuai dengan nama pada kartu bank / eWallet</div>
            </label>
            <input type="text" name="bankAccount" id='bankAccount' placeholder='John Doe' />
          </div>

          <div className={styles.field}>
            <label htmlFor="amount">Jumlah Penarikan</label>
            <input type="number" name="amount" id="amount" placeholder='Rp ...' />
          </div>

          <button type="submit">Tarik</button>

        </form>
      </div>
    </div>
  )
}

export default WithdrawPopup;