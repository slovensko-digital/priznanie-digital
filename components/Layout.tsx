import React from "react";

import styles from "./layout.module.css";
import Head from "next/head";

export default ({ children }) => (
  <div className={styles.container}>
    <Head>
      <title>priznanie.digital</title>
    </Head>
    <h1 className={styles.title}>priznanie.digital</h1>
    {children}
  </div>
);
