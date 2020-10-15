import Link from 'next/link'
import React from 'react'

export interface BackLinkProps {
  href: string
}

export const BackLink = ({ href }: BackLinkProps) => (
  <Link href={href}>
    <a className="govuk-back-link" data-test="back">
      Späť
    </a>
  </Link>
)
