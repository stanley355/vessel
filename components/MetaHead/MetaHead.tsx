import React from "react";
import Head from "next/head";

interface IMetaHead {
  meta: {
    title: string;
    description: string;
    publishedTime: string;
    modifiedTime: string;
    channelName: string;
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
      <meta property="og:type" content="title" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={URL} />
      <meta property="og:site_name" content="https://kontenku.net" />
      {/* <meta property='og:image' content={meta.image} /> */}
      <meta property="article:publisher" content="kontenku" />
      <meta property="article:published_time" content={meta.publishedTime} />
      <meta property="article:modified_time" content={meta.modifiedTime} />
      {/* <meta name='twitter:card' content={meta.twitter.card} /> */}
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      {/* <meta name='twitter:image' content={meta.image} /> */}
      <meta name="twitter:creator" content="@kontenku" />
      <meta name="twitter:site" content="@lifepal" />
      <meta name="twitter:label1" content="Written by" />
      <meta name="twitter:data1" content={meta.channelName} />
    </Head>
  );
};

export default MetaHead;
