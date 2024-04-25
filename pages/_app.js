import { NextSeo } from "next-seo";

import "../styles/globals.css";
import Header from "../components/layout/header";

function MyApp({ Component, pageProps }) {
  const seoOption = {
    title: "User Blogs",
    description: "User Blogs - A user controlled blogs creation",
  };

  return (
    <>
      <NextSeo {...seoOption} />
      <Header />
      <div className="container">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
