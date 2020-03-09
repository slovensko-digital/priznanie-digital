import React from 'react';

const Footer = () => {
  return (
    <>
      <div className="sdn-feedbackbar">
        <div className="govuk-width-container ">
          <div
            className="sdn-feedbackbar__container"
            id="sdn-feedbackbar-container"
          >
            <div className="govuk-grid-column-one-half">
              <img src="/assets/images/icon-lock.svg" alt="" className="icon" />
              <span>Bezpečné SSL pripojenie</span>
            </div>
            <div className="govuk-grid-column-one-half">
              <img
                src="/assets/images/icon-correct.svg"
                alt=""
                className="icon"
              />
              <span>Overené certifikovaným účtovníkom</span>
            </div>
          </div>
        </div>
      </div>
      <footer className="sdn-footer " role="contentinfo">
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
                <a
                  href="#facebook"
                  className="footer-icon footer-icon__facebook"
                >
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
    </>
  );
};

export default Footer;
