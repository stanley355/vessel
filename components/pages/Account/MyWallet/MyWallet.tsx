import React from "react";
import Link from "next/link";
import { FaWallet, FaChevronCircleRight } from "react-icons/fa";
import styles from "./MyWallet.module.scss";

interface IMyWallet {
  balance: any;
}

const MyWallet = (props: IMyWallet) => {
  const { balance } = props;

  const handleBalanceDisplay = () => {
    if (balance) {
      return balance.amount > 0 ? `Rp ${balance.amount}` : "Rp 0";
    }
    return "Terjadi kesalahan saat pengambilan data";
  }

  return (
    <div className={styles.my__wallet}>
      <div className={styles.balance}>
        <FaWallet />
        <span>
          <div>Penghasilan Saya</div>
          <div>
            {handleBalanceDisplay()}
          </div>
        </span>
      </div>

      <Link href="/account/wallet">
        <a title="My Wallet"><FaChevronCircleRight /></a>
      </Link>
    </div>
  );
};

export default MyWallet;
