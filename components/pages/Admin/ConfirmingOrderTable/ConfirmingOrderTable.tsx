import React, { useState } from "react";
import getConfig from "next/config";
import styles from "./ConfirmingOrderTable.module.scss";

interface IConfirmingOrder {
  confirmingOrders: any[];
}

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const ConfirmingOrderTable= (props: IConfirmingOrder) => {
  const { confirmingOrders } = props;

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
                  <button onClick={() => {}} type="button">
                    Accept
                  </button>
                  <button onClick={() => {}} type="button">
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
