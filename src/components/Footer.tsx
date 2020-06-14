import React from 'react'
import { Feedback } from './Feedback'
import { TaxFormUserInput } from '../types/TaxFormUserInput'
import { PostponeUserInput } from '../types/PostponeUserInput'

interface Props {
  taxFormUserInput: TaxFormUserInput
  postponeUserInput: PostponeUserInput
}

const Footer = ({ taxFormUserInput, postponeUserInput }: Props) => {
  return (
    <>
      <div className="sdn-feedbackbar">
        <div className="govuk-width-container ">
          <Feedback
            taxFormUserInput={taxFormUserInput}
            postponeUserInput={postponeUserInput}
          />
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
                  Staré grunty 18, 841 04 Bratislava
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
  )
}

export default Footer
