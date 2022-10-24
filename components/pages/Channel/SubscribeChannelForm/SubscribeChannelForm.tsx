import Router from 'next/router';
import React, { useState } from 'react';
import createInvoice from '../../../../lib/paymentHandler/createInvoice';
import createSubscription from '../../../../lib/subscriptionHandler/createSubscription';
import { WARNING_MSG } from '../../../../lib/warning-messages';
import styles from './SubscribeChannelForm.module.scss';

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
  }
}

const SubscribeChannelForm = (props: ISubscribeChannel) => {
  const { profile, channel } = props;

  const [hasSubmit, setHasSubmit] = useState(false);
  const [activePlan, setActivePlan] = useState({
    month: 1,
    price: channel.subscription_price
  });

  const PLANS = [
    {
      month: 1,
      price: channel.subscription_price
    },
    {
      month: 2,
      price: 2 * channel.subscription_price
    },
    {
      month: 3,
      price: 3 * channel.subscription_price
    },
    {
      month: 5,
      price: 5 * channel.subscription_price
    },
  ];

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setHasSubmit(true);

    const invoicePayload = {
      externalID: `${profile.id}-${new Date().toLocaleString()}`,
      payerEmail: profile.email,
      description: `Pembayaran langganan channel ${channel.channel_name}`,
      amount: activePlan.month,
    }

    const invoice = await createInvoice(invoicePayload);

    if (invoice && invoice.id) {
      setHasSubmit(false);

      const subscriptionPayload = {
        userID: profile.id,
        channelID: channel.id,
        channelSlug: channel.slug,
        duration: activePlan.month,
        invoiceID: invoice.id,
        channelName: channel.channel_name
      }

      const subscription = await createSubscription(subscriptionPayload);

      if (subscription && subscription.id) {
        Router.reload();
      } else {
        setHasSubmit(false);
        alert(WARNING_MSG.TRY_AGAIN);
      }
    } else {
      setHasSubmit(false);
      alert(WARNING_MSG.TRY_AGAIN);
    }
  }

  return (
    <div className={styles.subscribe__channel}>
      <h2 className={styles.title}>Subscription</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.subtitle}>Silakan pilih paket untuk berlangganan channel <b>{channel.channel_name}</b>  </div>

        <div className={styles.user} >Nama pelanggan : {profile.fullname} </div>
        <div className={styles.user} >Email : {profile.email} </div>

        <div className={styles.plan__wrap}>
          {PLANS.map((plan): any =>
            <button type='button' key={plan.month}
              className={activePlan.month === plan.month ? styles.btn__active : ""}
              onClick={() => setActivePlan(plan)}
            >
              <div>{plan.month} Bulan</div>
              <div>Rp{plan.price}</div>
            </button>
          )}
        </div>

        <button type='submit' className={styles.cta} disabled={hasSubmit}>
          {hasSubmit ? 'Processing...' : 'Lanjutkan'}
        </button>
      </form>
    </div>
  )
}

export default SubscribeChannelForm;