import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

const CheckoutPage = () => {
  return(
    <div className='container'>
      <h1>hi</h1>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {

  const orderID = context.query.order_id ?? "";
  
  console.log(orderID);
  return {
    props: {}
  }
}

export default CheckoutPage;