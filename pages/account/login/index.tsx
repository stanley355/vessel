import { GetServerSideProps, GetStaticProps } from 'next';
import React from 'react';
import getConfig from 'next/config';
import fetcher from '../../../lib/fetcher';
import GoogleSignInBtn from '../../../components/GoogleSignInBtn';
import styles from './login.module.scss';

const { BASE_URL } = getConfig().publicRuntimeConfig;

const AccountLogin = (props: any) => {
  const { clientID } = props;

  return (
    <div className='container'>
      <div className={styles.account__login}>
        <h1 className={styles.title}>Login / Daftar</h1>
        <GoogleSignInBtn clientID={clientID} />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies['token'];
  const config = await fetcher(`${BASE_URL}/api/google-client-id/`, {});

  if (token) {
    return {
      redirect: {
        destination: '/account/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      clientID: config?.data?.clientID ?? ''
    }
  };
}


export default AccountLogin;