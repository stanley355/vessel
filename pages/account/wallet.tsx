import React from "react";
import { GetServerSideProps } from "next";
import jwtDecode from "jwt-decode";
import viewBalance from "../../lib/paymentHandler/viewBalance";
import WalletHead from "../../components/pages/Account/WalletHead";

const Wallet = (props: any) => {
  const { balance } = props;

  return (
    <div className="container">
      <WalletHead balance={balance} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies["token"];
  const profile: any = token ? jwtDecode(token) : "";
  let balance: any;

  if (!token) {
    return {
      redirect: {
        destination: "/account/login/",
        permanent: false,
      },
    };
  }

  if (profile && profile.id) {
    balance = await viewBalance(profile.id);
  }

  return {
    props: {
      profile: profile ?? null,
      balance: balance ?? null,
    },
  };
};

export default Wallet;
