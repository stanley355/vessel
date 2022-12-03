import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import jwtDecode from 'jwt-decode';

const ChannelSetting = () => {
  return (
    <div className="container">

      <div>
        <form action=""></form>
      </div>

    </div>
  )
}


export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
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

  if (!token_channel) {
    return {
      redirect: {
        destination: "/account/",
        permanent: false,
      },
    };
  }

  const profile: any = token ? jwtDecode(token) : "";

  if (profile && profile.id) {

  }

  // const channel = (await findChannel(slug)) ?? null;


  return {
    props: {
      profile,
      // channel,
    },
  };
};


export default ChannelSetting;