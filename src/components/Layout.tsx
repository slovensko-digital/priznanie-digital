import React from 'react';

import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { Debug } from './Debug';
import { TaxFormUserInput } from '../types/TaxFormUserInput';
import { PostponeUserInput } from '../types/PostponeUserInput';

interface Props {
  // headline: string;
  children: React.ReactNode;
  taxFormUserInput: TaxFormUserInput;
  postponeUserInput: PostponeUserInput;
}

const Layout: React.FC<Props> = ({
  // headline,
  children,
  taxFormUserInput,
  postponeUserInput,
}: Props) => (
  <div className="container">
    <Head>
      <title>priznanie.digital</title>
    </Head>
    <Header />
    {/* <div className="sdn-headline">
      <div className="sdn-headline__container govuk-width-container">
        <div className="sdn-headline__part">
          <span className="sdn-headline__headline">{headline}</span>
        </div>
      </div>
    </div> */}

    <div className="govuk-width-container content-container">
      {/* <div className="govuk-phase-banner">
        <p className="govuk-phase-banner__content">
          <strong className="govuk-tag govuk-phase-banner__content__tag">
            Alpha
          </strong>
          <span className="govuk-phase-banner__text">
            Táto služba je vo vývoji.
          </span>
        </p>
      </div> */}
      <main className="govuk-main-wrapper">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">{children}</div>
        </div>
      </main>
    </div>
    <Debug
      taxFormUserInput={taxFormUserInput}
      postponeUserInput={postponeUserInput}
    />
    <Footer
      taxFormUserInput={taxFormUserInput}
      postponeUserInput={postponeUserInput}
    />
    <style jsx>{`
      .container {
        display: flex;
        flex-direction: column;
        height: 100vh;
      }
      .content-container {
        flex-grow: 1;
        width: 100%;
      }
    `}</style>
  </div>
);

export default Layout;
