import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import findAllOngoingWithdrawal from '../../../lib/withdrawalHandler/findAllOngoingWithdrawal';
import AdminLoginForm from '../../../components/pages/Admin/AdminLoginForm';

const WithdrawalPage = (props: any) => {
  const { ongoingWithdrawals } = props;

  return (
    <div className='container'>
      <AdminLoginForm />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const ongoingWithdrawals = await findAllOngoingWithdrawal() ?? [];


  return {
    props: {
      ongoingWithdrawals: ongoingWithdrawals ?? []
    }
  }
}

export default WithdrawalPage;