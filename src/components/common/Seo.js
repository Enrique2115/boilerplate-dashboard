import React from "react";
import Head from "next/head";

export default function Seo(props) {
  const { title, description } = props;
  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
      <link rel="manifest" href="/manifest.json" />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Head>
  );
}

Seo.defaultProps = {
  title: "Dashboard - Template",
  description: "Template generico para cualquier tipo de dashboard",
};
