import React, { useState } from "react";
import dynamic from "next/dynamic";
import Router from "next/router";
import Link from "next/link";
import getConfig from "next/config";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { FaTrash } from "react-icons/fa";
import jwtDecode from "jwt-decode";
import fetcher from "../../lib/fetcher";
import generateDokuVA from "../../lib/doku/generateDokuVA";
import updateOrderMerchant from "../../lib/orderHandler/updateOrderMerchant";
import setOrderExpiryDate from "../../lib/orderHandler/setOrderExpiryDate";
import isOrderExpired from "../../lib/orderHandler/isOrderExpired";
import HomeMetaHead from "../../components/pages/Home/HomeMetaHead";
import DropdownVA from "../../components/pages/Checkout/DropdownVA";
import WaitingConfirmation from "../../components/pages/Checkout/WaitingConfirmation";
import { WARNING_MSG } from "../../lib/warning-messages";
import copyToClipboard from "../../lib/copyToClipboard";
import styles from "./checkout.module.scss";

const { KONTENKU_URL } = getConfig().publicRuntimeConfig;

const CheckoutPage = (props: any) => {
  const { profile, channel, order } = props;

  const [showCancel, setShowCancel] = useState(false);
  const [bankName, setBankName] = useState("");
  const [submitVA, setSubmitVA] = useState(false);
  const [confirmPaid, setConfirmPaid] = useState(false);

  const handlePaidConfirmation = async () => {
    setConfirmPaid(true);

    const dokuRes = await fetcher(
      `${KONTENKU_URL}/api/doku/status`,
      {
        method: "POST",
        data: {
          order_id: order.id,
          doku_va_path: `/orders/v1/status/${order.id}`
        }
      }
    );

    if (dokuRes && dokuRes.transaction) {
      if (dokuRes.transaction.status === "SUCCESS") {
        const url = `${KONTENKU_URL}/api/doku/notification/`;
        const orderRes = await fetcher(url, {
          method: "POST",
          data: dokuRes,
        });

        if (orderRes && orderRes.id) {
          Router.push(`/channel/${channel.slug}`);
        } else {
          alert(WARNING_MSG.TRY_AGAIN);
          return "";
        }

      } else {
        alert("Pembayaran Belum Diterima");
        setConfirmPaid(false);
        return "";
      }
    } else {
      alert(WARNING_MSG.TRY_AGAIN);
      setConfirmPaid(false);
      return "";
    }
  };

  const handleVAcreation = async () => {
    setSubmitVA(true);
    const payload = {
      bankName,
      profile,
      channel: channel.channel_name,
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
        expiredAt: new Date(
          dokuVA.virtual_account_info.expired_date_utc
        ).toISOString(),
      };

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
        <button onClick={() => setShowCancel(true)} type="button">
          <FaTrash />
        </button>
        <button
          type="button"
          onClick={handleVAcreation}
          disabled={!bankName || submitVA}
          className={
            !bankName || submitVA ? styles.disabled__cta : styles.enabled__cta
          }
        >
          {submitVA ? "Loading..." : "Lanjut"}
        </button>
      </div>
    );
  };

  const VAdataSection = () => {
    return (
      <div className={styles.va__section}>
        <div className={styles.title}>Nomor Virtual Account:</div>
        <div className={styles.va__number}>
          <span id="copyClipboard">{order.merchant_va_number}</span>
          <button
            type="button"
            onClick={() => copyToClipboard(order.merchant_va_number)}
          >
            Copy
          </button>
        </div>
        <div className={styles.confirm__btn}>
          <button onClick={() => setShowCancel(true)} type="button">
            <FaTrash />
          </button>
          <button
            onClick={handlePaidConfirmation}
            className={confirmPaid ? styles.disabled__cta : styles.enabled__cta}
            disabled={confirmPaid}
          >
            {confirmPaid ? 'Loading...' : 'Saya Sudah Bayar'}
          </button>
        </div>
        <div className={styles.payment__link}>
          <span>Cara Pembayaran :</span>
          <Link href={order.merchant_payment_link}>
            <a title="payment_link">Link</a>
          </Link>
        </div>
      </div>
    );
  };

  const OrderExpiredSection = () => {
    return (
      <div className={styles.order__expired}>
        <div>Waktu Pembayaran telah berakhir</div>
        <Link href={`/channel/${channel.slug}/`}>
          <a title={channel.channel_name}>Berlangganan Ulang</a>
        </Link>
      </div>
    );
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
          <h3>Subscription channel: {channel.channel_name}</h3>
          <div>Order ID: {order.id}</div>
          <div>Nama pelanggan : {profile.fullname} </div>
          <div>Email : {profile.email} </div>
          <div>Durasi Langganan: {order.subscription_duration} Bulan</div>
          <div>Total Harga: {order.amount}</div>
          <div>Batas Pembayaran: {setOrderExpiryDate(order)}</div>
        </div>

        {isOrderExpired(order) ? (
          <OrderExpiredSection />
        ) : order.status === "CONFIRMING" ? (
          <WaitingConfirmation />
        ) : order.merchant_va_number ? (
          <VAdataSection />
        ) : (
          <>
            <DropdownVA
              onSelectChange={(option: any) => setBankName(option.value)}
            />
            <VAcreationBtn />
          </>
        )}
      </div>
      {showCancel && (
        <CancelConfirmation
          orderID={order.id}
          channel={channel.channel_name}
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

  if (!token) {
    return {
      redirect: {
        destination: "/account/login/",
        permanent: false,
      },
    };
  }

  const orderID = context.query.order_id ?? "";
  let channel: any;

  const orderURL = `${KONTENKU_URL}/api/payment/order/id?orderID=${orderID}`;
  const order = (await fetcher(orderURL, {})) ?? null;

  if (order && order.id) {
    const url = `${KONTENKU_URL}/api/channel/${order.channel_id}`;
    const channelRes = (await fetcher(url, {})) ?? null;
    if (channelRes && channelRes.token) {
      channel = jwtDecode(channelRes.token);

      if (order.status === "CANCELLED") {
        return {
          redirect: {
            destination: `/channel/${channel.slug}`,
            permanent: false,
          },
        };
      }
    }
  }

  return {
    props: {
      profile,
      channel,
      order,
    },
  };
};

export default CheckoutPage;
