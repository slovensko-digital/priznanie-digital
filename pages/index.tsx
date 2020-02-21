import React from "react";
import Link from "next/link";
import { Field, ErrorMessage } from "formik";
import styles from "./index.module.css";

export default () => (
  <main>
    <h2>Landig page</h2>
    <p>Vitajte bla bla bla</p>

    <Link href="/prijmy-a-vydavky" prefetch>
      <button>Next</button>
    </Link>
  </main>
);
