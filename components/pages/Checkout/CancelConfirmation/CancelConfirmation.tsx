import React, { useState } from "react";
import getConfig from "next/config";
import Router from "next/router";
import fetcher from "../../../../lib/fetcher";
import { WARNING_MSG } from "../../../../lib/warning-messages";
import styles from "./CancelConfirmation.module.scss";

interface ICancelConfirmation {
  orderID: string;
  channel: string;
  onNoClick: () => void;
}

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const CancelConfirmation = (props: ICancelConfirmation) => {
  const { orderID, onNoClick, channel } = props;

  const [confirm, setConfirm] = useState(false);

  const handleCancel = async () => {
    setConfirm(true);
    const url = `${KONTENKU_URL}/api/payment/order/cancel?orderID=${orderID}`;
    const orderCancelRes = await fetcher(url, { method: "PUT" });

    if (orderCancelRes && orderCancelRes.status === "CANCELLED") {
      Router.push(`/channel/${channel}/`);
    } else {
      alert(WARNING_MSG.TRY_AGAIN);
      onNoClick();
    }
  };

  return (
    <div className={styles.cancel__confirmation}>
      <div className={styles.box}>
        <h3>Apakah Anda yakin membatalkan langganan ini?</h3>
        <div>Order ID: {orderID}</div>
        <div>Channel: {channel}</div>

        {confirm ? (
          <div className={styles.cta__wrap}>
            <button disabled type="button">
              Loading...
            </button>
          </div>
        ) : (
          <div className={styles.cta__wrap}>
            <button type="button" onClick={handleCancel}>
              Ya
            </button>
            <button type="button" onClick={onNoClick}>
              Tidak
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CancelConfirmation;
