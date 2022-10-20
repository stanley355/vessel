import React, { useState } from 'react';
import styles from './SubscribeChannelForm.module.scss';

interface ISubscribeChannel {
  profile: {
    fullname: string;
    email: string;
  };
  channel: {
    channel_name: string;
    subscription_price: number;
  }
}

const SubscribeChannelForm = (props: ISubscribeChannel) => {
  const { profile, channel } = props;

  const [activePlan, setActivePlan] = useState(1);

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

  return (
    <div className={styles.subscribe__channel}>
      <h2 className={styles.title}>Subscription</h2>

      <form onSubmit={() => { }}>
        <div className={styles.subtitle}>Silakan pilih paket untuk berlangganan channel <b>{channel.channel_name}</b>  </div>

        <div className={styles.user} >Nama pelanggan : {profile.fullname} </div>
        <div className={styles.user} >Email : {profile.email} </div>

        <div className={styles.plan__wrap}>
          {PLANS.map((plan): any =>
            <button type='button' key={plan.month}
              className={activePlan === plan.month ? styles.btn__active : ""}
              onClick={() => setActivePlan(plan.month)}
            >
              <div>{plan.month} Bulan</div>
              <div>Rp{plan.price}</div>
            </button>
          )}
        </div>

        <button type='submit' className={styles.cta}>Lanjutkan</button>
      </form>
    </div>
  )
}

export default SubscribeChannelForm;