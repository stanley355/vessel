import React from "react";
import {
  FaUserCircle,
  FaSearch,
  FaPlayCircle,
  FaMoneyBillWave,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import styles from "./UserFlow.module.scss";

const UserFlow = () => {
  return (
    <div className={styles.user__flow}>
      <h3>Dukung Content Creator dengan Mudah</h3>
      <div className={styles.steps}>
        <span>
          <FaUserCircle />
          <div>1. Login</div>
        </span>
        <span>
          <FaSearch />
          <div>2. Cari Kontenmu</div>
        </span>
        <span>
          <FaPlayCircle />
          <div>3. Klik Subscribe</div>
        </span>
        <span>
          <FaMoneyCheckAlt />
          <div>4. Checkout Pembayaran</div>
        </span>
      </div>
    </div>
  );
};

export default UserFlow;
