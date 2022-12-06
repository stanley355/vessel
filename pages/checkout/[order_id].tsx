import React, { useState } from 'react';
import getConfig from 'next/config';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { FaTrash } from 'react-icons/fa';
import jwtDecode from 'jwt-decode';
import Select from 'react-select';
import { VIRTUAL_ACCOUNT_PARTNERS } from '../../lib/constants/vaPartners';
import fetcher from '../../lib/fetcher';
import generateDokuVA from '../../lib/doku/generateDokuVA';
import HomeMetaHead from '../../components/pages/Home/HomeMetaHead';
import styles from './checkout.module.scss';

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const CheckoutPage = (props: any) => {
  const { profile, channel, order } = props;

  const [bankName, setBankName] = useState("");

  const createVAoptions = () => {
    return VIRTUAL_ACCOUNT_PARTNERS.map((va: any) => {
      return {
        label: <div className={styles.va__options} key={va.value}>
          <span><img src={`/images/partners/${va.value.toLowerCase()}.png`} alt={va.value} /></span>
          <span>{va.label}</span>
        </div>,
        value: va.value
      }
    })
  }

  const handleVAcreation = async () => {
    const payload = {
      bankName,
      profile,
      channel,
      order
    }
    const vaResponse = await generateDokuVA(payload);
    console.log(vaResponse);
  }


  return (
    <div className='container'>
      <HomeMetaHead posts={[]} />
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

        {!order.merchant && !order.merchant_order_id && <div className={styles.payment__method}>
          <div className={styles.title}>Pilih Bank Pembayaran (Virtual Account): </div>
          <Select
            id='bankName'
            instanceId="bankName"
            options={createVAoptions()}
            onChange={(e: any) => { setBankName(e.value) }}
          />
        </div>}
        <div className={styles.cta__btn}>
          <button>
            <FaTrash />
          </button>
          <button
            onClick={handleVAcreation}
            disabled={!bankName}
            className={!bankName ? styles.disabled__cta : styles.enabled__cta}
          >
            Lanjut
          </button>
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