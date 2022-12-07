import React from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import getConfig from "next/config";
import useResponsive from "../../lib/hooks/useResponsive";
import initFirebaseAnalytic from "../../lib/analytics/initFirebaseAnalytic";
import styles from "./Layout.module.scss";

const { APP_ENV } = getConfig().publicRuntimeConfig;

const Layout = ({ children }: any) => {
  Cookies.set('token', 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InN0YW5sZXkud2luYXRhQGxpZmVwYWwuY28uaWQiLCJmdWxsbmFtZSI6IlN0YW5sZXkgV2luYXRhIiwiaGFzX2NoYW5uZWwiOnRydWUsImlkIjoiZWYwOGZlNTgtYjJlYy00ZWFhLWJjYjAtZGYwNjBjNTVjYzYxIiwicGhvbmVfbnVtYmVyIjpudWxsfQ.6L3x77CXDncS3b9R8-gfde-8Pa2ZE1TnNzYWYODX6NQ');
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
      <Navbar token={token} isDesktop={isDesktop} />
      <div className={styles.body}>{children}</div>
      {!isCheckoutPage() && <Footer />}
      {!isCheckoutPage() && !isDesktop && token && <NavigationFooter />}
    </div>
  );
};

export default Layout;
