import React from "react";

export default function Footer() {
  return (
    <footer className="sdn-footer " role="contentinfo">
      <div className="govuk-width-container ">
        <div className="sdn-footer__container">
          <div className="sdn-footer__newsletter">
            <span className="sdn-footer__newsletter-heading">
              Novinky emailom{" "}
              <small className="sdn-footer__newsletter-heading-tooltip">
                (raz mesačne)
              </small>
            </span>
            <div id="newsletter-success" style={{ display: "none" }}>
              <p>
                <strong>Na Váš e-mail sme poslali potvrdzovaciu správu.</strong>
                <br />
                Ďakujeme za Váš záujem.
              </p>
            </div>
            <form
              id="newsletter-form"
              action=""
              data-action="https://my.sendinblue.com/users/subscribeembed/js_id/29wti/id/4"
              method="post"
            >
              <div className="govuk-form-group sdn-footer__newsletter-form-group">
                <input type="hidden" name="js_id" id="js_id" value="29wti" />
                <input type="hidden" name="listid" id="listid" value="4" />
                <input
                  type="hidden"
                  name="from_url"
                  id="from_url"
                  value="yes"
                />
                <input
                  type="hidden"
                  name="hdn_email_txt"
                  id="hdn_email_txt"
                  value=""
                />
                <input
                  id="email-input"
                  className="govuk-input sdn-footer__newsletter-input"
                  name="email"
                  placeholder="Zadajte emailovú adresu"
                />
                <button
                  type="submit"
                  className="govuk-button sdn-footer__newsletter-button"
                >
                  Prihlásiť
                </button>
              </div>
            </form>
            <span className="sdn-footer__newsletter-disclaimer">
              Prihlásením dávam dobrovoľný súhlas OZ Slovensko.Digital na
              zasielanie bezplatného newslettera na mnou zadaný e-mail. Tento
              súhlas môžem kedykoľvek odvolať na{" "}
              <a
                href="mailto:kontakt@slovensko.digital"
                className="sdn-footer__link"
              >
                kontakt@slovensko.digital
              </a>
              . Oboznámil(a) som sa s informáciami v sekcii{" "}
              <a href="#" className="sdn-footer__link">
                Ochrana osobných údajov
              </a>
              .
            </span>
          </div>
          <div className="sdn-footer__donate">
            <span className="sdn-footer__heart-wrapper">
              <span className="sdn-footer__heart"></span>
            </span>
            <span className="sdn-footer__donate-text">
              Páči sa vám čo pre vás robíme?
              <br />
              <a
                href="https://slovensko.digital/dve-percenta#ako-poukazat"
                className="sdn-footer__link sdn-footer__donate-link"
              >
                Podporte nás
              </a>
            </span>
          </div>
        </div>
      </div>
      <div className="sdn-footer__bottom-container">
        <div className="govuk-width-container">
          <div className="sdn-footer__bottom-columns">
            <div className="sdn-footer__links">
              <ul>
                <li>
                  <a href="#media">Pre médiá</a>
                </li>
                <li>
                  <a href="#gdpr">Ochrana osobných údajov</a>
                </li>
              </ul>
            </div>
            <div className="sdn-footer__contact">
              <div className="sdn-footer__contact-content">
                <strong>Slovensko.Digital</strong>
                <br />
                Staré grunty 12, 841 04 Bratislava
                <br />
                IČO: 50158635
                <br />
                <a href="mailto:kontakt@slovensko.digital">
                  kontakt@slovensko.digital
                </a>
              </div>
            </div>
            <div className="sdn-footer__social">
              <a href="#facebook" className="footer-icon footer-icon__facebook">
                <span>facebook</span>
              </a>
              <a href="#github" className="footer-icon footer-icon__github">
                <span>github</span>
              </a>
              <a href="#youtube" className="footer-icon footer-icon__youtube">
                <span>youtube</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
