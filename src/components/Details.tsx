import React, { ReactNode, useState } from 'react'

export interface DetailsProps {
  title: string
  children: string | ReactNode
}

export const Details = ({ title, children }: DetailsProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <details className="govuk-details" data-module="govuk-details">
      <summary
        className="govuk-details__summary"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="govuk-details__summary-text">{title}</span>
      </summary>
      {isOpen && <div className="govuk-details__text">{children}</div>}
    </details>
  )
}
