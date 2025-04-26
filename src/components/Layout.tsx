import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { TaxFormUserInput } from "../types/TaxFormUserInput";
import { PostponeUserInput } from "../types/PostponeUserInput";
import { useRouter } from "next/router";
import { homeRoute } from "../lib/routes";

interface Props {
  headline: string;
  children: React.ReactNode;
  taxFormUserInput: TaxFormUserInput;
  postponeUserInput: PostponeUserInput;
}

const Layout: React.FC<Props> = ({
  headline,
  children,
  taxFormUserInput,
  postponeUserInput,
}: Props) => {
  const { route } = useRouter();
  const isHomePage = route === homeRoute || route === "/";
  const wrapperClassName = isHomePage ? "" : "govuk-grid-column-two-thirds";

  return (
    <div aria-live="polite" className="main">
      <noscript>
        <p className="noscript">
          Táto aplikácia vyžaduje povolený Javascript.{" "}
          <a href="https://www.enable-javascript.com/sk/">
            Tu sú inštrukcie, ako povoliť JavaScript v prehliadači.
          </a>
        </p>
      </noscript>

      <div className="main-content">
        <Header />

        <div className="sdn-headline">
          <div className="govuk-width-container">
            <div className="sdn-headline__container">
              <div className="sdn-headline__part">
                <span className="sdn-headline__headline">{headline}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="govuk-width-container">
          <main className="govuk-main-wrapper" style={{ paddingTop: 0 }}>
            <div className="govuk-grid-row">
              <div className={wrapperClassName}>{children}</div>
            </div>
          </main>
        </div>
      </div>

      <Footer
        taxFormUserInput={taxFormUserInput}
        postponeUserInput={postponeUserInput}
      />

      {/* Disabled now, since we don't use user cookies. We will keep the code in case we need to enable it again */}
      {/* <CookieBar /> */}
    </div>
  );
};

export default Layout;
