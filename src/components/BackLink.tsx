import Link from 'next/link'

export interface BackLinkProps {
  href: string
}

export const BackLink = ({ href }: BackLinkProps) => (
  <Link href={href} className="govuk-back-link" data-test="back">
    Späť
  </Link>
)
