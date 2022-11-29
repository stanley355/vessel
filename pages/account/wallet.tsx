import React from "react";
import { GetServerSideProps } from "next";
import jwtDecode from "jwt-decode";
import WalletHead from "../../components/pages/Account/WalletHead";
import WalletPaymentsTable from "../../components/pages/Account/WalletPaymentsTable";
import HomeMetaHead from "../../components/pages/Home/HomeMetaHead";
import viewBalance from "../../lib/paymentHandler/viewBalance";
import viewPaymentsByChannel from "../../lib/paymentHandler/viewPaymentsByChannel";

const Wallet = (props: any) => {
  const { balance, payments } = props;

  return (
    <div className="container">
      <HomeMetaHead posts={[]} />
      <WalletHead balance={balance} />
      <span>
        *Income Anda akan di transfer dalam 3 hari kerja setelah penarikan
      </span>
      <WalletPaymentsTable payments={payments} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies["token"];
  const profile: any = token ? jwtDecode(token) : "";
  const token_channel = context.req.cookies["token_channel"];
  let balance: any;
  let payments = [];

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

  if (token_channel) {
    const channel: any = jwtDecode(token_channel);
    payments = await viewPaymentsByChannel(channel.id);
  }

  return {
    props: {
      balance: balance ?? null,
      payments,
    },
  };
};

export default Wallet;
