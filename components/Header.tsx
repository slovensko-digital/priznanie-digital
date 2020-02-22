import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header
      className="sdn-header sdn-header-1200 "
      role="banner"
      data-module="sdn-header"
    >
      <div className="sdn-header__container govuk-width-container ">
        <Link href="/">
          <a className="sdn-header__link">
            <span className="sdn-header__product-name">priznanie.digital</span>
          </a>
        </Link>
        <div className="sdn-header__content">
          <button
            type="button"
            role="button"
            className="sdn-header__menu-button sdn-header__menu-button js-header-toggle"
            aria-controls="navigation"
            aria-label="Show or hide Top Level Navigation"
          >
            Menu
          </button>
          <nav>
            <ul
              id="navigation"
              className="sdn-header__navigation "
              aria-label="Top Level Navigation"
            >
              <li>
                <a className="sdn-header__link " href="#1">
                  Časté otázky
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
