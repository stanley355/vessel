import React, { useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import getConfig from "next/config";
import useResponsive from "../../lib/hooks/useResponsive";
import initFirebaseAnalytic from "../../lib/analytics/initFirebaseAnalytic";

const { APP_ENV } = getConfig().publicRuntimeConfig;

const Layout = ({ children }: any) => {
  const token: any = Cookies.get("token");
  const { isDesktop } = useResponsive();

  // if (typeof window !== 'undefined' && APP_ENV !== 'develop') {
  //   initFirebaseAnalytic();
  // }

  const Navbar = dynamic(() => import("../Navbar/Navbar"), { ssr: false });
  const NavigationFooter = dynamic(
    () => import("../NavigationFooter/NavigationFooter"),
    { ssr: false }
  );

  return (
    <div className="layout">
      <Head>
        <meta charSet="utf-8" />
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
        <meta name="robots" content="index, follow" />
        <meta
          name="google-site-verification"
          content="1B5-W9OtAQdiu4XQXrRDfAdNJiVSM9k2GVxupDVJ4fU"
        />
      </Head>
      <Navbar token={token} isDesktop={isDesktop} />
      <div className="body">{children}</div>
      {!isDesktop && token && <NavigationFooter />}
    </div>
  );
};

export default Layout;
