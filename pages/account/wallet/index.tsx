import React, { useState } from "react";
import { GetServerSideProps } from "next";
import jwtDecode from "jwt-decode";
import WalletHead from "../../../components/pages/Account/WalletHead";
import WalletPaymentsTable from "../../../components/pages/Account/WalletPaymentsTable";
import WalletWithdrawalTable from "../../../components/pages/Account/WalletWithdrawalTable";
import HomeMetaHead from "../../../components/pages/Home/HomeMetaHead";
import viewBalance from "../../../lib/paymentHandler/viewBalance";
import viewPaymentsByChannel from "../../../lib/paymentHandler/viewPaymentsByChannel";
import findAllUserWithdrawal from "../../../lib/withdrawalHandler/findAllUserWithdrawal";
import styles from "./wallet.module.scss";

const Wallet = (props: any) => {
  const { balance, payments, withdrawal } = props;

  const [activeTab, setActiveTab] = useState("payment");

  const WalletTab = () => {
    return (
      <div className={styles.wallet__tabs}>
        <button
          type="button"
          onClick={() => setActiveTab("payment")}
          className={activeTab === "payment" ? styles.btn__active : ""}
        >
          Income
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("withdrawal")}
          className={activeTab === "withdrawal" ? styles.btn__active : ""}
        >
          Withdrawal
        </button>
      </div>
    );
  };

  const WalletBody = () => {
    switch (activeTab) {
      case "payment":
        return <WalletPaymentsTable payments={payments} />;
      case "withdrawal":
        return <WalletWithdrawalTable withdrawal={withdrawal} />;
      default:
        return <WalletPaymentsTable payments={payments} />;
    }
  };

  return (
    <div className="container">
      <HomeMetaHead />
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
  let payments = []; //Payments from subscribers to creator
  let withdrawal = [];

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
    withdrawal = await findAllUserWithdrawal(profile.id);
  }

  if (token_channel) {
    const channel: any = jwtDecode(token_channel);
    payments = await viewPaymentsByChannel(channel.id);
  }

  return {
    props: {
      balance: balance ?? null,
      payments: payments ?? [],
      withdrawal: withdrawal ?? [],
    },
  };
};

export default Wallet;
