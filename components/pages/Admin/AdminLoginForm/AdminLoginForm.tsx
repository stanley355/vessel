import React, { useState } from 'react';
import getConfig from 'next/config';
import Router from 'next/router';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import fetcher from '../../../../lib/fetcher';
import styles from './AdminLoginForm.module.scss';

const { KONTENKU_URL, ADMIN_CRYPTO_SECRET } = getConfig().publicRuntimeConfig;

const AdminLoginForm = () => {
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { email, password } = e.target;

    const URL = `${KONTENKU_URL}/api/payment/withdrawal/admin/`;
    const admin = await fetcher(URL, {});

    const bytes = CryptoJS.AES.decrypt(admin, ADMIN_CRYPTO_SECRET);
    const decrypt = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    if ((email.value === decrypt.email) && (password.value === decrypt.password)) {
      const fifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
      Cookies.set("token_admin", admin, { expires: fifteenMinutes });
      Router.reload();
    } else {
      setErrorMsg("Not Admin");
      return ""
    }
  }

  return (
    <div className={styles.login__form}>
      <h3>R u Admin ?</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Admin Email' name='email' />
        <input type="password" placeholder='password' name='password' />
        <button type="submit">Submit?</button>
      </form>
      {errorMsg && <span>{errorMsg}</span>}
    </div>
  )
}

export default AdminLoginForm;