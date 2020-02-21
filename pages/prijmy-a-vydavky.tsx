import React from "react";
import Link from "next/link";
import { Field, ErrorMessage } from "formik";

export default () => (
  <main>
    <h2>Prijmy vydavky</h2>
    <Field name="t1r10_prijmy" type="number" />
    <label htmlFor="priloha3_r11_socialne">Socialne poistenie</label>
    <Field name="priloha3_r11_socialne" type="number" />
    <label htmlFor="priloha3_r13_zdravotne">Zdravotne poistenie</label>
    <Field name="priloha3_r13_zdravotne" type="number" />
    <Link href="/">
      <button>Back</button>
    </Link>
    <Link href="/partner">
      <button>Next</button>
    </Link>
  </main>
);
