import React from "react";
import { FaWallet } from "react-icons/fa";
import styles from "./WalletHead.module.scss";

interface IWalletHead {
  balance: any;
}

const WalletHead = (props: IWalletHead) => {
  const { balance } = props;

  return (
    <div className={styles.wallet__head}>
      <span>
        <FaWallet />
        <div className={styles.info}>
          <div>My Wallet</div>
          <div>
            {balance ? (balance.amount > 0
              ? `Rp ${balance.amount}` : "Rp 0")
              : "Terjadi kesalahan saat pengambilan data"}
          </div>
        </div>
      </span>

      <button type="button">Withdraw</button>
    </div>
  );
};

export default WalletHead;