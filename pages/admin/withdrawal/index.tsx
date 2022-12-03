import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import findAllOngoingWithdrawal from '../../../lib/withdrawalHandler/findAllOngoingWithdrawal';
import AdminLoginForm from '../../../components/pages/Admin/AdminLoginForm';

const WithdrawalPage = (props: any) => {
  const { token_admin, ongoingWithdrawals } = props;

  return (
    <div className='container'>
      {token_admin ? <h1>hi</h1> : <AdminLoginForm />}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const token = context.req.cookies["token"];
  const token_admin = context.req.cookies["token_admin"] ?? null;

  if (!token) {
    return {
      redirect: {
        destination: "/account/login/",
        permanent: false,
      },
    };
  } 

  const ongoingWithdrawals = await findAllOngoingWithdrawal();

  return {
    props: {
      token_admin,
      ongoingWithdrawals,
    }
  }
}

export default WithdrawalPage;