import React from "react";
import { FaRegCopyright, FaPaperPlane } from "react-icons/fa";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div>
        Copyright <FaRegCopyright /> {new Date().getFullYear()} Kontenku
      </div>
    </div>
  );
};

export default Footer;
