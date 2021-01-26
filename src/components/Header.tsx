import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Header: React.FC = () => {
  const router = useRouter()
  const isLandingPage = router.pathname === '/' || router.pathname === '/domov'

  const logo = (
    <a className="sdn-header__link">
      <img
        className="sdn-header__logo"
        src="/assets/images/priznanie_logo.png"
        alt="priznanie.digital"
      />
    </a>
  )

  return (
    <header
      className="sdn-header sdn-header-1200 "
      role="banner"
      data-module="sdn-header"
    >
      <div className="sdn-header__container govuk-width-container ">
        {isLandingPage ? logo : <Link href="/">{logo}</Link>}
      </div>
    </header>
  )
}

export default Header
