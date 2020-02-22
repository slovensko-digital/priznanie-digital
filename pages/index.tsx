import React from "react";
import Link from "next/link";
import styles from "./index.module.css";

export default () => (
  <>
    <h2>Landig page</h2>
    <p>Vitajte bla bla bla</p>

    <Link href="/prijmy-a-vydavky">
      <button className="govuk-button">>Next</button>
    </Link>
  </>
);
