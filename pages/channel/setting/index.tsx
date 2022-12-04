import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import jwtDecode from 'jwt-decode';

const ChannelSetting = (props: any) => {
  const { profile, channel } = props;
  console.log(222, channel);

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
  const channel: any = token_channel ? jwtDecode(token_channel) : "";



  return {
    props: {
      profile,
      channel,
    },
  };
};


export default ChannelSetting;