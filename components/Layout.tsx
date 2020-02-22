import React from "react";

import styles from "./Layout.module.css";
import Head from "next/head";
import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";

export default ({ children }) => (
  <>
    <Head>
      <title>priznanie.digital</title>
    </Head>
    <Header />
    <div className="sdn-headline">
      <div className="sdn-headline__container govuk-width-container">
        <div className="sdn-headline__part">
          <Link href="/">
            <a className="sdn-headline__headline">
              Daňové priznanie pre živostníkov s paušálnymi výdavkami (DPFO typ
              B)
            </a>
          </Link>
        </div>
      </div>
    </div>
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper">{children}</main>
    </div>
    <Footer />
  </>
);
