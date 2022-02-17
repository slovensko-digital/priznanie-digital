import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import logoPath from '../../public/assets/images/priznanie_logo.png'

const Header: React.FC = () => {
  const router = useRouter()
  const isLandingPage = router.pathname === '/' || router.pathname === '/domov'

  const logo = (
    <a className="sdn-header__link">
      <Image className="" src={logoPath} alt="priznanie.digital" />
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
