import React from "react";
import Link from "next/link";
import jwtDecode from "jwt-decode";
import getConfig from "next/config";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import fetcher from "../../lib/fetcher";

const { BASE_URL } = getConfig().publicRuntimeConfig;

const ChannelSlug = (props: any) => {
  
  return (
    <div className="container">
      <h2>hi</h2>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const slug = context?.params?.slug;


  return {
    props: {
      slug: slug ?? "",

    },
  };
};

export default ChannelSlug;
