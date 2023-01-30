import React from "react";
import { FaRegCopyright } from "react-icons/fa";
import classNames from "classnames";
import styles from "./Footer.module.scss";

const Footer = ({ token }: any) => {
  return (
    <div
      className={classNames(styles.footer, token ? styles.footer__login : "")}
    >
      <div>
        Copyright <FaRegCopyright /> {new Date().getFullYear()} Kontenku
      </div>
    </div>
  );
};

export default Footer;
