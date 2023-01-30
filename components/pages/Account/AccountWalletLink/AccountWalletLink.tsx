import React from "react";
import Link from "next/link";
import { FaWallet, FaChevronCircleRight } from "react-icons/fa";
import styles from "./AccountWalletLink.module.scss";

interface IAccountWalletLink {
  balance: any;
}

const AccountWalletLink = (props: IAccountWalletLink) => {
  const { balance } = props;

  const handleBalanceDisplay = () => {
    if (balance) {
      return balance.amount > 0 ? `Rp ${balance.amount}` : "Rp 0";
    }
    return "Terjadi kesalahan saat pengambilan data";
  };

  return (
    <Link href="/account/wallet/">
      <div className={styles.my__wallet}>
        <div className={styles.balance}>
          <FaWallet />
          <span>
            <div>Penghasilan Saya</div>
            <div>{handleBalanceDisplay()}</div>
          </span>
        </div>

        <a title="My Wallet">
          <FaChevronCircleRight />
        </a>
      </div>
    </Link>
  );
};

export default AccountWalletLink;
