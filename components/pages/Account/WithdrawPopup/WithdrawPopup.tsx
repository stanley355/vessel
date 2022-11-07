import React from 'react';

const WithdrawPopup = () => {
  return (
    <div>
      <button type='button'>x</button>

      <div>Penarikan Dana</div>

      <form action="">
        <div>
          <label htmlFor="bankName">Nama Bank / eWallet</label>
          <select name="bankName" id="bankName">
            <option value="BCA">BCA</option>

            <option value="BRI">BRI</option>
          </select>
        </div>

        <div>
          <label htmlFor="bankAccount">Nomor Akun Bank / eWallet</label>
          <input type="text" name="bankAccount" id='bankAccount' />
        </div>

        <div>
          <label htmlFor="accountHolderName">
            <div>Nama pemilik akun</div>
            <div>*Pastikan sesuai dengan nama pada kartu bank / eWallet</div>
          </label>
          <input type="text" name="bankAccount" id='bankAccount' />
        </div>

        <div>
          <label htmlFor="amount">Jumlah Penarikan</label>
          <input type="number" name="amount" id="amount" />
        </div>

        <button type="submit">Tarik</button>

      </form>
    </div>
  )
}

export default WithdrawPopup;