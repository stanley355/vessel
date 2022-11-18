import React from 'react';
import { FaRegCopyright, FaPaperPlane } from 'react-icons/fa';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <div className='container'>
      <div className={styles.footer}>
        <div>
          Copyright <FaRegCopyright /> {new Date().getFullYear()} Kontenku
        </div>
        <div>
          Support <FaPaperPlane /> winatastanley355@gmail.com / 089637789023
        </div>
      </div>
    </div>
  )
}

export default Footer;