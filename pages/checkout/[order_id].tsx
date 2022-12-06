import React from 'react';
import getConfig from 'next/config';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import jwtDecode from 'jwt-decode';
import fetcher from '../../lib/fetcher';
import styles from './checkout.module.scss';


const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const CheckoutPage = (props: any) => {
  const { profile, channel, order } = props;

  console.log(order);
  return (
    <div className='container'>
      <div className='box'>
        {/* <div>
          <img src="/images/kontenku-logo-short.png" alt="kontenku" />
        </div> */}
        <div>
          <h3>Pembayaran langganan channel: {channel}</h3>
          <div>Order ID: {order.id}</div>
          <div className={styles.info}>Nama pelanggan : {profile.fullname} </div>
          <div className={styles.info}>Email : {profile.email} </div>
          <div className={styles.info}>
            Durasi Langganan: {order.subscription_duration} Bulan
          </div>
          <div className={styles.info}>Total Harga: {order.amount}</div>
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