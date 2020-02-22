import React from "react";

// import styles from "./Layout.module.css";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

const DEBUG_ON = true;
export default ({ children, debug }) => (
  <>
    <Head>
      <title>priznanie.digital</title>
    </Head>
    <Header />
    <div className="sdn-headline">
      <div className="sdn-headline__container govuk-width-container">
        <div className="sdn-headline__part">
          <span className="sdn-headline__headline">
            Daňové priznanie pre živostníkov s paušálnymi výdavkami (DPFO typ B)
          </span>
        </div>
      </div>
    </div>
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">
        <div className="govuk-grid-column-two-thirds">{children}</div>
        {DEBUG_ON && <div className="govuk-grid-column-one-third">{debug}</div>}
      </main>
    </div>
    <Footer />
  </>
);
