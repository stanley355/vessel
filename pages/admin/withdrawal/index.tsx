import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import findAllOngoingWithdrawal from "../../../lib/withdrawalHandler/findAllOngoingWithdrawal";
import AdminLoginForm from "../../../components/pages/Admin/AdminLoginForm";
import OngoingWithdrawalTable from "../../../components/pages/Admin/OngoingWithdrawalTable";
import styles from "./withdrawalPage.module.scss";

const WithdrawalPage = (props: any) => {
  const { token_admin, ongoingWithdrawals } = props;

  return (
    <div className={styles.withdrawal__page}>
      {token_admin ? (
        <OngoingWithdrawalTable ongoingWithdrawals={ongoingWithdrawals} />
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

  const ongoingWithdrawals = await findAllOngoingWithdrawal();

  return {
    props: {
      token_admin,
      ongoingWithdrawals,
    },
  };
};

export default WithdrawalPage;
