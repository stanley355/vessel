import React, { useState } from "react";
import dynamic from "next/dynamic";
import Router from "next/router";
import Link from "next/link";
import getConfig from "next/config";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { FaTrash } from "react-icons/fa";
import jwtDecode from "jwt-decode";
import DropdownVA from "../../components/pages/Checkout/DropdownVA";
import fetcher from "../../lib/fetcher";
import generateDokuVA from "../../lib/doku/generateDokuVA";
import updateOrderMerchant from "../../lib/orderHandler/updateOrderMerchant";
import HomeMetaHead from "../../components/pages/Home/HomeMetaHead";
import { WARNING_MSG } from "../../lib/warning-messages";
import copyToClipboard from "../../lib/copyToClipboard";
import styles from "./checkout.module.scss";


const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const CheckoutPage = (props: any) => {
  const { profile, channel, order } = props;

  const [showCancel, setShowCancel] = useState(false);
  const [bankName, setBankName] = useState("");
  const [submitVA, setSubmitVA] = useState(false);

  const handleVAcreation = async () => {
    setSubmitVA(true);
    const payload = {
      bankName,
      profile,
      channel,
      order,
    };
    const dokuVA = await generateDokuVA(payload);

    if (dokuVA && dokuVA.order) {
      const updatePayload = {
        orderID: order.id,
        merchant: "DOKU",
        merchantOrderID: dokuVA.order.invoice_number,
        merchantVAnumber: dokuVA.virtual_account_info.virtual_account_number,
        merchantPaymentLink: dokuVA.virtual_account_info.how_to_pay_page,
        expiredAt: new Date(dokuVA.virtual_account_info.expired_date_utc).toISOString()
      }

      const updateRes = await updateOrderMerchant(updatePayload);

      if (updateRes && updateRes.id) {
        Router.reload();
      } else {
        alert(WARNING_MSG.TRY_AGAIN);
        setSubmitVA(false);
        return "";
      }
    } else {
      alert(WARNING_MSG.TRY_AGAIN);
      setSubmitVA(false);
      return "";
    }
  };

  const VAcreationBtn = () => {
    return (
      <div className={styles.cta__btn}>
        <button onClick={() => setShowCancel(true)}>
          <FaTrash />
        </button>
        <button
          onClick={handleVAcreation}
          disabled={!bankName || submitVA}
          className={!bankName || submitVA ? styles.disabled__cta : styles.enabled__cta}
        >
          {submitVA ? "Loading..." : "Lanjut"}
        </button>
      </div>
    )
  }

  const VAdataSection = () => {
    return (
      <div className={styles.va__section}>
        <div className={styles.title}>Nomor Virtual Account:</div>
        <div className={styles.va__number}>
          <span id="copyClipboard">{order.merchant_va_number}</span>
          <button type="button" onClick={() => copyToClipboard(order.merchant_va_number)}>Copy</button>
        </div>
        <div className={styles.cta__btn}>
          <button onClick={()=> setShowCancel(true)}>
            <FaTrash />
          </button>
          <Link href={order.merchant_payment_link}>
            <a title="payment_link">Cara Pembayaran</a>
          </Link>
        </div>
      </div>
    )
  }

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

        {order.merchant && order.merchant_va_number ?
          <VAdataSection /> :
          <>
            <DropdownVA
              onSelectChange={(option: any) => setBankName(option.value)}
            />
            <VAcreationBtn />
          </>
        }
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
