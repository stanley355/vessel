import React from 'react';
import getConfig from 'next/config';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import fetcher from '../../lib/fetcher';

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const CheckoutPage = (props: any) => {
  const { order } = props;

  return (
    <div className='container'>
      <h1>hi</h1>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {

  const orderID = context.query.order_id ?? "";

  const order = await fetcher(`${KONTENKU_URL}/api/payment/order/id?orderID=${orderID}`, {}) ?? null;

  return {
    props: {
      order
    }
  }
}

export default CheckoutPage;