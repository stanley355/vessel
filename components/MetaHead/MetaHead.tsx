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
      <meta property="og:title" content="Kontenku - Langganan Konten Terbaik - Nikmati Konten Berkualitas Tinggi Setiap Hari" />
      <meta
        property="og:description"
        content="Nikmati konten berkualitas tinggi setiap hari dengan berlangganan konten kami. Terupdate, informatif, dan menyenangkan, langganan konten kami adalah pilihan terbaik bagi Anda."
      />
      <meta property="og:image" content="/images/kontenku-logo.png" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://metatags.io/" />
      <meta
        property="twitter:title"
        content="Kontenku - Langganan Konten Terbaik - Nikmati Konten Berkualitas Tinggi Setiap Hari"
      />
      <meta
        property="twitter:description"
        content="Nikmati konten berkualitas tinggi setiap hari dengan berlangganan konten kami. Terupdate, informatif, dan menyenangkan, langganan konten kami adalah pilihan terbaik bagi Anda."
      />
    </Head>
  );
};

export default MetaHead;
