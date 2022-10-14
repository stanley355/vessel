import React, { useState } from "react";
import Router from "next/router";
import createInvoice from "../../../../lib/paymentHandler/createInvoice";
import expireInvoice from "../../../../lib/paymentHandler/expireInvoice";
import createSubscription from "../../../../lib/subscriptionHandler/createSubscription";
import { WARNING_MSG } from "../../../../lib/warning-messages";
import styles from "./SubscriptionConfirmationForm.module.scss";

interface IConfirmationForm {
  subscriptions_freq: number;
  profile: any;
  channelStats: any;
}

const SubscriptionConfirmationForm = (props: IConfirmationForm) => {
  const { subscriptions_freq, profile, channelStats } = props;

  const [subsDuration, setSubsDuration] = useState(1);
  const [hasSubmit, setHasSubmit] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setHasSubmit(true);
    const duration = e.target.subscription_duration.value ?? 1;

    const invoicePayload = {
      externalID: `${profile.id}-${channelStats.id}-${subscriptions_freq}`,
      userFullname: profile.fullname,
      userEmail: profile.email,
      description: `Pembayaran Langganan Channel ${channelStats.channel_name}`,
      amount: duration * channelStats.subscription_price,
    };

    const invoice = await createInvoice(invoicePayload);

    if (invoice && invoice.id) {
      const payload = {
        userID: profile.id,
        channelID: channelStats.id,
        channelSlug: channelStats.slug,
        duration: duration,
        invoiceID: invoice.id,
      };

      const subscription = await createSubscription(payload);

      if (subscription && subscription.id) {
        Router.reload();
      } else {
        await expireInvoice(invoice.id);
        setHasSubmit(false);
        alert(WARNING_MSG.TRY_AGAIN);
      }
    } else {
      setHasSubmit(false);
      alert(WARNING_MSG.TRY_AGAIN);
    }
  };

  return (
    <div className={styles.confirmation__form}>
      <h2 className={styles.title}>Subscription Confirmation</h2>

      <h3>Pelanggan: </h3>
      <div>Nama Pelanggan: {profile.fullname}</div>
      <div>Email: {profile.email}</div>

      <h3>Channel Langganan: </h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>Nama channel: {channelStats.channel_name}</div>
        <div>Harga Langganan / Bulan : {channelStats.subscription_price}</div>
        <div className={styles.form__field}>
          <label htmlFor="subscription_duration">Durasi langganan : </label>
          <select
            name="subscription_duration"
            id="subscription_duration"
            onChange={(e: any) => setSubsDuration(e.target.value)}
            defaultValue="1"
          >
            <option value="1">1 Bulan</option>
            <option value="2">2 Bulan</option>
            <option value="3">3 Bulan</option>
            <option value="4">4 Bulan</option>
            <option value="5">5 Bulan</option>
            <option value="6">6 Bulan</option>
          </select>
        </div>

        <div>Total Harga: {subsDuration * channelStats.subscription_price}</div>

        <button type="submit" className={styles.form__cta} disabled={hasSubmit}>
          {hasSubmit ? "Processing..." : " Submit"}
        </button>
      </form>
    </div>
  );
};

export default SubscriptionConfirmationForm;
