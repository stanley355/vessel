import Router from "next/router";
import React, { useState } from "react";
import createMidtransPaymentLink from "../../../../lib/midtrans/createMidtransPaymentLink";
import createPayment from "../../../../lib/paymentHandler/createPayment";
import { WARNING_MSG } from "../../../../lib/warning-messages";
import styles from "./SubscribeChannelForm.module.scss";

interface ISubscribeChannel {
  profile: {
    id: string;
    fullname: string;
    email: string;
  };
  channel: {
    id: number;
    slug: string;
    channel_name: string;
    subscription_price: number;
  };
}

const SubscribeChannelForm = (props: ISubscribeChannel) => {
  const { profile, channel } = props;

  const [hasSubmit, setHasSubmit] = useState(false);
  const [activePlan, setActivePlan] = useState({
    month: 1,
    price: channel.subscription_price,
  });

  const PLANS = [
    {
      month: 1,
      price: channel.subscription_price,
    },
    {
      month: 2,
      price: 2 * channel.subscription_price,
    },
    {
      month: 3,
      price: 3 * channel.subscription_price,
    },
    {
      month: 5,
      price: 5 * channel.subscription_price,
    },
  ];

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setHasSubmit(true);

    const orderID = `kontenku-${channel.id}-${new Date().toISOString()}`.replace(/[^\w\s\']|_/g, "");

    const midtrans = await createMidtransPaymentLink({
      orderID: orderID,
      user: profile,
      channel: channel,
      amount: activePlan.price
    });


    if (midtrans && midtrans.order_id) {
      const paymentData = {
        channelID: channel.id,
        subscriberID: profile.id,
        subscriptionDuration: activePlan.month,
        totalAmount: activePlan.price,
        merchant: 'MIDTRANS',
        merchantOrderID: midtrans.order_id,
        merchantPaymentLink: midtrans.payment_url
      }
      const paymentRes = await createPayment(paymentData);

      if (paymentRes && paymentRes.identifiers.length) {
        Router.push(midtrans.payment_url);
      } else {
        setHasSubmit(false)
        alert(WARNING_MSG.TRY_AGAIN);
      }
    } else {
      setHasSubmit(false);
      alert(WARNING_MSG.TRY_AGAIN);
    }
  };

  return (
    <div className={styles.subscribe__channel}>
      <h2 className={styles.title}>Subscription</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.subtitle}>
          Silakan pilih paket untuk berlangganan channel{" "}
          <b>{channel.channel_name}</b>{" "}
        </div>

        <div className={styles.user}>Nama pelanggan : {profile.fullname} </div>
        <div className={styles.user}>Email : {profile.email} </div>

        <div className={styles.plan__wrap}>
          {PLANS.map((plan): any => (
            <button
              type="button"
              key={plan.month}
              className={
                activePlan.month === plan.month ? styles.btn__active : ""
              }
              onClick={() => setActivePlan(plan)}
            >
              <div>{plan.month} Bulan</div>
              <div>Rp{plan.price}</div>
            </button>
          ))}
        </div>

        <button type="submit" className={styles.cta} disabled={hasSubmit}>
          {hasSubmit ? "Processing..." : "Lanjutkan"}
        </button>
      </form>
    </div>
  );
};

export default SubscribeChannelForm;
