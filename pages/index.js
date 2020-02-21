import Head from "next/head";
import React from "react";
import styles from "./index.module.css";
import MainForm from "../components/MainForm";

const Home = () => (
  <div className={styles.container}>
    <Head>
      <title>priznanie.digital</title>
      <link rel="icon" href="/favicon.ico" />

      <link rel="stylesheet" href="/stylesheets/libs.css"></link>
      <link
        rel="stylesheet"
        href="/stylesheets/navody-digital-0.1.8.min.css"
      ></link>
    </Head>

    <main>
      <h1 className={styles.title}>priznanie.digital</h1>
      <MainForm />
    </main>

    <footer></footer>

    <script src="javascript/libs.js"></script>
    <script src="javascript/navody-digital-0.1.8.min.js"></script>
    <script>window.GOVUKFrontend.initAll()</script>
  </div>
);

export default Home;
