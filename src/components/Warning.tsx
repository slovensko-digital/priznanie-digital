import React, { ReactNode } from 'react'

export interface WarningProps {
  className?: string
  children: ReactNode
}

export const Warning = ({ children, className }: WarningProps) => (
  <div className={`govuk-grid-column-full govuk-warning-text ${className}`}>
    <span className="govuk-warning-text__icon" aria-hidden="true">
      !
    </span>
    <strong className="govuk-warning-text__text">{children}</strong>
  </div>
)
