import React from "react";
import Link from "next/link";
import { FaWallet, FaMoneyBillAlt } from "react-icons/fa";
import styles from "./MyWallet.module.scss";

interface IMyWallet {
  balance: any;
}

const MyWallet = (props: IMyWallet) => {
  const { balance } = props;

  return (
    <div className={styles.my__wallet}>
      <div className={styles.balance}>
        <FaMoneyBillAlt />
        <span>
          <div>Penghasilan Saya</div>
          <div>
            {balance
              ? balance.amount > 0
                ? `Rp ${balance.amount}`
                : "Rp 0"
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
