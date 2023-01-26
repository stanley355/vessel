import React from 'react';
import { GetServerSideProps } from 'next';

const AccountChannel = () => {
  return (
    <div className='container'>
      hi
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies["token"];
  const token_channel = context.req.cookies["token_channel"];

  if (!token) {
    return {
      redirect: {
        destination: "/account/login/",
        permanent: false,
      },
    };
  }

  return {
    props: { },
  };
};


export default AccountChannel;