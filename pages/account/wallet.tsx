import React, { useState } from "react";
import { GetServerSideProps } from "next";
import jwtDecode from "jwt-decode";
import WalletHead from "../../components/pages/Account/WalletHead";
import WalletPaymentsTable from "../../components/pages/Account/WalletPaymentsTable";
import HomeMetaHead from "../../components/pages/Home/HomeMetaHead";
import viewBalance from "../../lib/paymentHandler/viewBalance";
import viewPaymentsByChannel from "../../lib/paymentHandler/viewPaymentsByChannel";
import styles from '../../styles/pages/wallet.module.scss';

const Wallet = (props: any) => {
  const { balance, payments } = props;

  const [activeTab, setActiveTab] = useState("payment");

  const WalletTab = () => {
    return (
      <div className={styles.wallet__tabs}>
        <button
          onClick={() => setActiveTab("payment")}
          className={activeTab === "payment" ? styles.btn__active : ""}
        >Income</button>
        <button
          onClick={() => setActiveTab("withdrawal")}
          className={activeTab === "withdrawal" ? styles.btn__active : ""}
        >Withdrawal</button>
      </div>
    )
  }

  const WalletBody = () => {
    switch (activeTab) {
      case "payment":
        return <WalletPaymentsTable payments={payments} />;
      case "withdrawal":
        return <h1>Withdrawal Tab</h1>
      default:
        return <WalletPaymentsTable payments={payments} />
    }
  }

  return (
    <div className="container">
      <HomeMetaHead posts={[]} />
      <div className={styles.wallet}>
        <WalletHead balance={balance} />
        <WalletTab />
        <WalletBody />
      </div>
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
