import React, { useState } from "react";
import Router from "next/router";
import jsCookie from "js-cookie";
import jwtDecode from "jwt-decode";
import { FaCheckCircle } from "react-icons/fa";
import { WARNING_MSG } from "../../../../lib/warning-messages";
import { DISBURSEMENT_PARTNERS } from "../../../../lib/constants/disbursementPartners";
import createWithdrawal from "../../../../lib/withdrawalHandler/createWithdrawal";
import styles from "./WithdrawPopup.module.scss";

interface IWithdrawPopup {
  walletAmount: number;
  onCloseClick: () => void;
}

const WithdrawPopup = (props: IWithdrawPopup) => {
  const { walletAmount, onCloseClick } = props;

  const [hasSubmit, setHasSubmit] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setHasSubmit(true);

    const { bankName, bankAccount, accountHolderName, amount } = e.target;

    if (
      !bankName.value ||
      !bankAccount.value ||
      !accountHolderName.value ||
      !amount.value
    ) {
      setHasSubmit(false);
      alert("Semua data harus terisi!");
      return "";
    }
    if (amount.value < 11000) {
      setHasSubmit(false);
      alert("Jumlah Penarikan Minimal Rp 11.000 !");
      return "";
    }

    if (walletAmount < amount.value) {
      setHasSubmit(false);
      alert("Jumlah Balance untuk penarikan tidak mencukupi");
      return "";
    }

    const token: any = jsCookie.get("token");
    const profile: any = jwtDecode(token);

    const withdrawPayload = {
      userID: profile.id,
      bankName: bankName.value,
      accountNumber: bankAccount.value,
      accountOwnerName: accountHolderName.value,
      amount: amount.value,
    };

    const withdrawRes = await createWithdrawal(withdrawPayload);

    if (withdrawRes) {
      if (withdrawRes.identifiers.length) {
        setTimeout(() => Router.reload(), 2000);
        setHasSubmit(false);
        setWithdrawSuccess(true);
      }

      if (withdrawRes.error && withdrawRes.message) {
        setHasSubmit(false);
        alert(withdrawRes.message);
        return ""
      }
    } else {
      setHasSubmit(false);
      alert(WARNING_MSG.TRY_AGAIN);
      return "";
    }
  };

  const WithdrawForm = () => (
    <form onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="bankName">Nama Bank / eWallet</label>
        <select name="bankName" id="bankName" defaultValue="OVO">
          {DISBURSEMENT_PARTNERS.map((partners: any) => (
            <option value={partners.value} key={partners.value}>
              {partners.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="bankAccount">Nomor Akun Bank / eWallet</label>
        <input
          type="text"
          name="bankAccount"
          id="bankAccount"
          placeholder="00000000"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="accountHolderName">
          <div>Nama pemilik akun</div>
          <div>*Pastikan sesuai dengan nama pada kartu bank / eWallet</div>
        </label>
        <input
          type="text"
          name="accountHolderName"
          id="accountHolderName"
          placeholder="John Doe"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="amount">Jumlah Penarikan</label>
        <input type="number" name="amount" id="amount" placeholder="Rp 11.000" />
      </div>

      <button type="submit" className={styles.cta} disabled={hasSubmit}>
        {hasSubmit ? "Memproses..." : "Tarik"}
      </button>
    </form>
  );

  const WithdrawSuccess = () => (
    <div className={styles.withdraw__success}>
      <FaCheckCircle />
    </div>
  );

  return (
    <div className={styles.withdraw__popup}>
      <div className={styles.withdraw__box}>
        <button
          type="button"
          className={styles.close__btn}
          onClick={() => {
            setWithdrawSuccess(false);
            onCloseClick();
          }}
        >
          x
        </button>

        <h3 className={styles.title}>
          {withdrawSuccess ? "Pengajuan penarikan berhasil dibuat, silakan melihat status di tab Withdrawal" : " Penarikan Income"}
        </h3>
        {withdrawSuccess ? <WithdrawSuccess /> : <WithdrawForm />}
      </div>
    </div>
  );
};

export default WithdrawPopup;
