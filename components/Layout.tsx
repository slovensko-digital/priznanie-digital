import React from "react";

import styles from "./Layout.module.css";
import Head from "next/head";
import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";

export default ({ children }) => (
  <>
    <Header />
    <div className={styles.container}>
      <Head>
        <title>priznanie.digital</title>
      </Head>

      <Link href="/">
        <h1 className={styles.title}>priznanie.digital</h1>
      </Link>
      {children}
    </div>
    <Footer />
  </>
);
