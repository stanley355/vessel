import React from 'react';
import getConfig from 'next/config';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import jwtDecode from 'jwt-decode';
import Select from 'react-select'
import fetcher from '../../lib/fetcher';
import styles from './checkout.module.scss';


const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const CheckoutPage = (props: any) => {
  const { profile, channel, order } = props;

  //   {
  //   id: 'a22d23ab-8002-4f87-baeb-c56cdb899c3b',
  //   created_at: '2022-12-06T01:26:11.000Z',
  //   updated_at: '2022-12-06T01:26:11.000Z',
  //   expired_at: '2022-12-06T01:26:11.000Z',
  //   channel_id: 8,
  //   subscriber_id: '3586a3c5-a8c3-42f4-92f8-a9a940738802',
  //   subscription_duration: 1,
  //   amount: 15000,
  //   merchant: null,
  //   merchant_order_id: null,
  //   merchant_payment_link: null,
  //   status: 'PENDING',
  //   merchant_va_number: null
  // }

  return (
    <div className='container'>
      <div className={styles.checkout}>
        <div className={styles.logo__wrap}>
          <img src="/images/kontenku-logo-short.png" alt="kontenku" />
        </div>
        <div className={styles.info}>
          <h3>Subscription channel: {channel}</h3>
          <div>Order ID: {order.id}</div>
          <div >Nama pelanggan : {profile.fullname} </div>
          <div >Email : {profile.email} </div>
          <div >
            Durasi Langganan: {order.subscription_duration} Bulan
          </div>
          <div >Total Harga: {order.amount}</div>
        </div>

        <div>
          
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {

  const token = context.req.cookies["token"];
  const profile: any = token ? jwtDecode(token) : "";
  const orderID = context.query.order_id ?? "";

  const order = await fetcher(`${KONTENKU_URL}/api/payment/order/id?orderID=${orderID}`, {}) ?? null;

  return {
    props: {
      profile,
      channel: context.query.channel ?? "",
      order
    }
  }
}

export default CheckoutPage;