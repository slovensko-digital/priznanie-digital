import React from 'react'
import getConfig from 'next/config'
import { TaxFormUserInput } from '../types/TaxFormUserInput'
import { PostponeUserInput } from '../types/PostponeUserInput'

const { publicRuntimeConfig } = getConfig()

interface Props {
  taxFormUserInput: TaxFormUserInput
  postponeUserInput: PostponeUserInput
}

/** This component is a HACK that exists because Cypress cannot download the XML
 * so it has to grab the data from the DOM
 */
export const Debug = ({ taxFormUserInput, postponeUserInput }: Props) => {
  if (!publicRuntimeConfig.withDebug) {
    return null
  }
  return (
    <div className="debug">
      <div data-test="taxFormUserInput">
        {JSON.stringify(taxFormUserInput, null, 2)}
      </div>
      <div className="debug" data-test="postponeUserInput">
        {JSON.stringify(postponeUserInput, null, 2)}
      </div>
      <style jsx>{`
        .debug {
          overflow: hidden;
          visibility: hidden;
          width: 0px;
          height: 0px;
        }
      `}</style>
    </div>
  )
}
