import React from "react";

import styles from "./layout.module.css";
import Head from "next/head";
import Link from "next/link";

export default ({ children }) => (
  <div className={styles.container}>
    <Head>
      <title>priznanie.digital</title>
    </Head>
    <Link href="/">
      <h1 className={styles.title}>priznanie.digital</h1>
    </Link>
    {children}
  </div>
);
