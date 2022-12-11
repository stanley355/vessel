import React from "react";
import getConfig from "next/config";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import fetcher from "../../../lib/fetcher";
import findAllOngoingWithdrawal from "../../../lib/withdrawalHandler/findAllOngoingWithdrawal";
import AdminLoginForm from "../../../components/pages/Admin/AdminLoginForm";
import OngoingWithdrawalTable from "../../../components/pages/Admin/OngoingWithdrawalTable";
import styles from "./orderPage.module.scss";

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const orderPage = (props: any) => {
  const { token_admin, confirmingOrder } = props;

  console.log(confirmingOrder);
  return (
    <div className={styles.withdrawal__page}>
      {/* {token_admin ? (
        <OngoingWithdrawalTable ongoingWithdrawals={ongoingWithdrawals} />
      ) : (
        <AdminLoginForm />
      )} */}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const token = context.req.cookies["token"];
  const token_admin = context.req.cookies["token_admin"] ?? null;

  if (!token) {
    return {
      redirect: {
        destination: "/account/login/",
        permanent: false,
      },
    };
  }

  const URL = `${KONTENKU_URL}/api/payment/order/confirmation/`
  const confirmingOrder = await fetcher(URL, {}) ?? [];

  return {
    props: {
      token_admin,
      confirmingOrder,
    },
  };
};

export default orderPage;
