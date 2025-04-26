import React, { ReactNode, useState } from 'react'
import classnames from 'classnames'
import styles from './tooltipHint.module.css'

interface TooltipHintProps {
  children: ReactNode
  className?: string
}

const TOOLTIP_HIDE_DELAY_MS = 250

const TooltipHint = ({ children, className }: TooltipHintProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [leaveTimeout, setLeaveTimeout] = useState<number | null>(null)

  const handleMouseEnter = () => {
    if (leaveTimeout) {
      clearTimeout(leaveTimeout)
      setLeaveTimeout(null)
    }
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    const timeout = window.setTimeout(() => {
      setIsVisible(false)
    }, TOOLTIP_HIDE_DELAY_MS)
    setLeaveTimeout(timeout)
  }

  return (
    <div
      className={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <svg
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.icon}
      >
        <path
          d="M10 0.5C4.48 0.5 0 4.98 0 10.5C0 16.02 4.48 20.5 10 20.5C15.52 20.5 20 16.02 20 10.5C20 4.98 15.52 0.5 10 0.5ZM10 15.5C9.45 15.5 9 15.05 9 14.5V10.5C9 9.95 9.45 9.5 10 9.5C10.55 9.5 11 9.95 11 10.5V14.5C11 15.05 10.55 15.5 10 15.5ZM11 7.5H9V5.5H11V7.5Z"
          fill="#626A6E"
        />
      </svg>
      {isVisible && (
        <div
          className={classnames('govuk-body', styles.content, className)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export default TooltipHint
