import React from "react";
import logoutUser from "../../../../lib/loginHandler/logoutUser";
import styles from "./LogoutBtn.module.scss";

const LogoutBtn = () => (
  <button className={styles.logout__btn} onClick={logoutUser} type="button">
    Logout
  </button>
);

export default LogoutBtn;
