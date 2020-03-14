import React from 'react';
import Link from 'next/link';
import { NextPage } from 'next';
import { getPostponeRoutes } from '../../lib/routes';

const { previousRoute } = getPostponeRoutes('/odklad/navod');

const Stiahnut: NextPage<{}> = () => {
  return (
    <>
      <Link href={previousRoute}>
        <a className="govuk-back-link" data-test="back">
          Naspat
        </a>
      </Link>
      <h1>Návod na podanie žiadosti na portáli finančnej správy</h1>
      <div>
        <ol className="govuk-list govuk-list--number">
          <li>
            Prihláste sa na portál Finančnej správy - buď pomocou Identifikátora
            a hesla, Kvalifikovaného elektronického podpisu (KEP) alebo
            Občianskym preukazom s elektronickým čipom (eID)
            <br />
            <img alt="Krok 1" src="/assets/images/1xml.png" />
            <br />
            <img alt="Krok 2" src="/assets/images/2xml.png" />
          </li>

          <li>
            Kliknite na Katálog formulárov.
            <br />
            <img alt="Krok 3" src="/assets/images/3xml.png" />
          </li>

          <li>...</li>
        </ol>
        <style jsx>{`
          li {
            margin-top: 8px;
          }
          img {
            margin-top: 8px;
            width: 100%;
          }
        `}</style>
      </div>
    </>
  );
};

export default Stiahnut;
