import React from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import Head from "next/head";
import Cookies from "js-cookie";
import getConfig from "next/config";
import useResponsive from "../../lib/hooks/useResponsive";
import initFirebaseAnalytic from "../../lib/analytics/initFirebaseAnalytic";
import styles from "./Layout.module.scss";

const { APP_ENV } = getConfig().publicRuntimeConfig;

const Layout = ({ children }: any) => {
  const token: any = Cookies.get("token");
  const { isDesktop } = useResponsive();

  if (typeof window !== "undefined" && APP_ENV !== "develop") {
    initFirebaseAnalytic();
  }

  const Navbar = dynamic(() => import("../Navbar"), { ssr: false });
  const Footer = dynamic(() => import("../Footer"), { ssr: false });
  const NavigationFooter = dynamic(() => import("../NavigationFooter"), {
    ssr: false,
  });

  const isCheckoutPage = () => {
    if (typeof window !== "undefined") {
      return Router.asPath.includes("/checkout");
    }
    return false;
  };

  return (
    <div className="layout">
      <Head>
        <link rel="icon" type="image/png" href="/images/kontenku-icon.png" />
        <meta charSet="utf-8" />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" charSet="UTF-8" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: #cbdaff)"
          content="#cbdaff"
        ></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <meta
          name="google-site-verification"
          content="1B5-W9OtAQdiu4XQXrRDfAdNJiVSM9k2GVxupDVJ4fU"
        />
      </Head>
      <Navbar token={token} isDesktop={isDesktop} />
      <div className={styles.body}>{children}</div>
      {!isCheckoutPage() && <Footer token={token} />}
      {!isCheckoutPage() && !isDesktop && token && <NavigationFooter />}
    </div>
  );
};

export default Layout;
