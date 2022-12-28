import React, { useState } from "react";
import getConfig from "next/config";
import Router from "next/router";
import fetcher from "../../../../lib/fetcher";
import styles from "./ConfirmingOrderTable.module.scss";
import { WARNING_MSG } from "../../../../lib/warning-messages";

interface IConfirmingOrder {
  confirmingOrders: any[];
}

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const ConfirmingOrderTable = (props: IConfirmingOrder) => {
  const { confirmingOrders } = props;

  const handleRejectedOrder = async (orderID: string) => {
    const url = `${KONTENKU_URL}/api/payment/order/pending?orderID=${orderID}`;
    const orderRes = await fetcher(url, { method: "PUT" });

    if (orderRes && orderRes.id) {
      alert("Success");
      Router.reload();
    } else {
      alert(WARNING_MSG.TRY_AGAIN);
      return "";
    }
  };

  const handlePaidOrder = async (orderID: string) => {
    const url = `${KONTENKU_URL}/api/doku/notification/`;
    const orderRes = await fetcher(url, {
      method: "POST",
      data: {
        order: {
          invoice_number: orderID,
        },
      },
    });

    if (orderRes && orderRes.id) {
      alert("Success");
      Router.reload();
    } else {
      alert(WARNING_MSG.TRY_AGAIN);
      return "";
    }
  };

  return (
    <div className={styles.order__table}>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>User ID</td>
            <td>Created At</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {confirmingOrders.length > 0 &&
            confirmingOrders.map((order: any) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.subscriber_id}</td>
                <td>{new Date(order.created_at).toDateString()}</td>
                <td>{order.status}</td>
                <td className={styles.action__column}>
                  <button
                    onClick={() => handlePaidOrder(order.id)}
                    type="button"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRejectedOrder(order.id)}
                    type="button"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConfirmingOrderTable;
