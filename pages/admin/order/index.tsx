import React from "react";
import getConfig from "next/config";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import fetcher from "../../../lib/fetcher";
import AdminLoginForm from "../../../components/pages/Admin/AdminLoginForm";
import ConfirmingOrderTable from "../../../components/pages/Admin/ConfirmingOrderTable";
import styles from "./orderPage.module.scss";

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const orderPage = (props: any) => {
  const { token_admin, confirmingOrders } = props;

  return (
    <div className={styles.order__page}>
      {token_admin ? (
        <ConfirmingOrderTable confirmingOrders={confirmingOrders} />
      ) : (
        <AdminLoginForm />
      )}
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
  const confirmingOrders = await fetcher(URL, {}) ?? [];

  return {
    props: {
      token_admin,
      confirmingOrders,
    },
  };
};

export default orderPage;
