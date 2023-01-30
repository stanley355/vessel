import React from "react";
import Head from "next/head";

interface IMetaHead {
  meta: {
    title: string;
    description: string;
  };
}

const MetaHead = (props: IMetaHead) => {
  const { meta } = props;

  const URL =
    typeof window !== "undefined"
      ? window.location.origin + window.location.pathname
      : "";

  return (
    <Head>
      <title>{meta.title}</title>
      <link rel="canonical" key="canonical" href={URL} />
      <meta name="description" content={meta.description} />
      <meta property="og:locale" content="id_ID" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://metatags.io/" />
      <meta property="og:title" content="Kontenku - Exclusive for The Fans" />
      <meta
        property="og:description"
        content="Kontenku - Tempat Content Creator menawarkan konten eksklusif yang dapat dibayar dengan harga premium. Nikmati video dan musik yang Anda sukai, unggah konten original, dan bagikan semuanya untuk para fans."
      />
      <meta property="og:image" content="/images/kontenku-logo.png" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://metatags.io/" />
      <meta
        property="twitter:title"
        content="Kontenku -- Exclusive for The Fans"
      />
      <meta
        property="twitter:description"
        content="Kontenku - Tempat Content Creator menawarkan konten eksklusif yang dapat dibayar dengan harga premium. Nikmati video dan musik yang Anda sukai, unggah konten original, dan bagikan semuanya untuk para fans."
      />
    </Head>
  );
};

export default MetaHead;
