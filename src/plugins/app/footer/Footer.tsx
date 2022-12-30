import React from 'react'
import { Feedback } from './Feedback'
import { TaxFormUserInput } from '../../_shared/types/TaxFormUserInput'
import { PostponeUserInput } from '../../_shared/types/PostponeUserInput'
import { ExternalLink } from '../../_shared/components/links/ExternalLink'
import { PrivacyPolicyLink } from './PrivacyPolicyLink'

interface Props {
  taxFormUserInput: TaxFormUserInput
  postponeUserInput: PostponeUserInput
}

const Footer = ({ taxFormUserInput }: Props) => {
  return (
    <>
      <div className="sdn-feedbackbar">
        <div className="govuk-width-container ">
          <Feedback taxFormUserInput={taxFormUserInput} />
        </div>
      </div>
      <footer className="sdn-footer " role="contentinfo">
        <div className="sdn-footer__bottom-container">
          <div className="govuk-width-container">
            <div className="sdn-footer__bottom-columns">
              <div className="sdn-footer__links">
                <ul>
                  <li>
                    <ExternalLink href="https://navody.digital/disclaimer">
                      Podmienky používania
                    </ExternalLink>
                  </li>
                  <li>
                    <PrivacyPolicyLink />
                  </li>
                  <li>
                    <ExternalLink href="https://navody.digital/contact-info">
                      Kontakt
                    </ExternalLink>
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
                  <a href="mailto:navody@slovensko.digital">
                    navody@slovensko.digital
                  </a>
                </div>
              </div>
              <div className="sdn-footer__social">
                <ExternalLink
                  href="https://www.facebook.com/slovensko.digital/"
                  className="footer-icon footer-icon__facebook no-arrow"
                >
                  <span>facebook</span>
                </ExternalLink>
                <ExternalLink
                  href="https://github.com/priznanie-digital/priznanie-digital"
                  className="footer-icon footer-icon__github no-arrow"
                >
                  <span>github</span>
                </ExternalLink>
                <ExternalLink
                  href="https://www.youtube.com/channel/UCbpnKa1XOIpQLYUQ2dz7Sng"
                  className="footer-icon footer-icon__youtube no-arrow"
                >
                  <span>youtube</span>
                </ExternalLink>
              </div>
            </div>
            <p className="sdn-footer__disclaimer govuk-!-font-size-14 govuk-!-margin-top-7">
              Informácie zverejnené na stránke majú informatívny charakter.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
