import React from "react";
import jsCookie from "js-cookie";
import Head from "next/head";
import useAuthenticated from "../../lib/hooks/useAuthenticated";
import Navbar from "../Navbar";
import StickyMenu from "../StickyMenu";

const Layout = ({ children }: any) => {
  const authenticated = useAuthenticated();

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
      <Navbar />
      <div className="body">{children}</div>
    </div>
  );
};

export default Layout;
