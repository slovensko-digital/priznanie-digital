import React from "react";
import { Field, ErrorMessage } from "formik";
import Link from "next/link";

import styles from "./index.module.css";

export default () => (
  <main>
    <h2>Údaje o daňovníkovi</h2>
    <label htmlFor="r001_dic">DIČ</label>
    <Field name="r001_dic" type="text" />

    <label htmlFor="r002_datum_narodenia">Dátum narodenia</label>
    <Field name="r002_datum_narodenia" type="text" />

    <label htmlFor="r005_meno">Meno</label>
    <Field name="r005_meno" type="text" />
    <ErrorMessage name="r005_meno" />

    <label htmlFor="r004_priezvisko">Priezvisko</label>
    <Field name="r004_priezvisko" type="text" />
    <ErrorMessage name="r004_priezvisko" />

    <h3>Adresa trvalého pobytu</h3>
    <label htmlFor="r007_ulica">Ulica</label>
    <Field name="r007_ulica" type="text" />
    <label htmlFor="r008_cislo">Súpisné/orientačné číslo</label>
    <Field name="r008_cislo" type="text" />
    <label htmlFor="r009_psc">PSČ</label>
    <Field name="r009_psc" type="text" />
    <label htmlFor="r010_mesto">Mesto</label>
    <Field name="r010_mesto" type="text" />
    <label htmlFor="r011_stat">Štát</label>
    <Field name="r011_stat" type="text" />
    <label htmlFor="t1r10_prijmy">Prijem</label>
    <Link href="/partner">
      <button>Back</button>
    </Link>
    <Link href="/vysledky">
      <button>Next</button>
    </Link>
  </main>
);
