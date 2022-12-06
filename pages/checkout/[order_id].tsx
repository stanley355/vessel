import React, { useState } from "react";
import dynamic from "next/dynamic";
import getConfig from "next/config";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { FaTrash } from "react-icons/fa";
import jwtDecode from "jwt-decode";
import DropdownVA from "../../components/pages/Checkout/DropdownVA";
import fetcher from "../../lib/fetcher";
import generateDokuVA from "../../lib/doku/generateDokuVA";
import HomeMetaHead from "../../components/pages/Home/HomeMetaHead";
import styles from "./checkout.module.scss";

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const CheckoutPage = (props: any) => {
  const { profile, channel, order } = props;

  const [showCancel, setShowCancel] = useState(false);
  const [bankName, setBankName] = useState("");

  const handleVAcreation = async () => {
    const payload = {
      bankName,
      profile,
      channel,
      order,
    };
    const dokuVA = await generateDokuVA(payload);
    // TODO: Show VA
  };

  const CancelConfirmation = dynamic(
    () => import("../../components/pages/Checkout/CancelConfirmation"),
    { ssr: false }
  );

  return (
    <div className="container">
      <HomeMetaHead posts={[]} />
      <div className={styles.checkout}>
        <div className={styles.logo__wrap}>
          <img src="/images/kontenku-logo-short.png" alt="kontenku" />
        </div>
        <div className={styles.info}>
          <h3>Subscription channel: {channel}</h3>
          <div>Order ID: {order.id}</div>
          <div>Nama pelanggan : {profile.fullname} </div>
          <div>Email : {profile.email} </div>
          <div>Durasi Langganan: {order.subscription_duration} Bulan</div>
          <div>Total Harga: {order.amount}</div>
        </div>

        {!order.merchant && !order.merchant_order_id && (
          <DropdownVA
            onSelectChange={(option: any) => setBankName(option.value)}
          />
        )}
        <div className={styles.cta__btn}>
          <button onClick={() => setShowCancel(true)}>
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
      {showCancel && (
        <CancelConfirmation
          orderID={order.id}
          channel={channel}
          onNoClick={() => setShowCancel(false)}
        />
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const token = context.req.cookies["token"];
  const profile: any = token ? jwtDecode(token) : "";
  const orderID = context.query.order_id ?? "";

  const order =
    (await fetcher(
      `${KONTENKU_URL}/api/payment/order/id?orderID=${orderID}`,
      {}
    )) ?? null;

  return {
    props: {
      profile,
      channel: context.query.channel ?? "",
      order,
    },
  };
};

export default CheckoutPage;
