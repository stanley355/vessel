import React from "react";
import Link from "next/link";
import { FaWallet } from "react-icons/fa";
import styles from "./MyWallet.module.scss";

interface IMyWallet {
  balance: any;
}

const MyWallet = (props: IMyWallet) => {
  const { balance } = props;

  return (
    <div className={styles.my__wallet}>
      <div className={styles.balance}>
        <FaWallet />
        <span>
          <div>My Wallet</div>
          <div>
            Rp{" "}
            {balance && balance.length > 0
              ? balance[0].amount
              : "Terjadi kesalahan saat pengambilan data"}
          </div>
        </span>
      </div>

      <Link href="/account/wallet">
        <a title="My Wallet">See More</a>
      </Link>
    </div>
  );
};

export default MyWallet;
