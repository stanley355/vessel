import React from 'react';

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
    <div>
      <h3>Subscription</h3>

      <form onSubmit={() =>{}}>
        <div>Silakan pilih jangka berlangganan untuk <b>{channel.channel_name}</b>  </div>

        <div>Nama Pelanggan: {profile.fullname} </div>
        <div>Email: {profile.email} </div>

        {PLANS.map((plan): any =>
          <button type='button'>
            <div>{plan.month} Bulan</div>
            <div>Rp{plan.price}</div>
          </button>
        )}

        <button type='submit'>Lanjutkan</button>
      </form>
    </div>
  )
}

export default SubscribeChannelForm;