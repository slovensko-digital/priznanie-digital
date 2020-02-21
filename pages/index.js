import Head from "next/head";
import React from "react";
import styles from "./index.module.css";
import MainForm from "../components/MainForm";

const Home = () => (
  <div className={styles.container}>
    <Head>
      <title>priznanie.digital</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1 className={styles.title}>priznanie.digital</h1>
      <MainForm />
    </main>

    <footer />
  </div>
);

export default Home;
