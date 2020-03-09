import React from 'react';
import { TaxFormUserInput } from '../types/TaxFormUserInput';

interface Props {
  taxFormUserInput: TaxFormUserInput;
}

/** This component is a HACK that exists because Cypress cannot download the XML
 * so it has to grab the data from the DOM
 */
export const Debug = ({ taxFormUserInput }: Props) => {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  return (
    <div className="debug" data-test="taxFormUserInput">
      {JSON.stringify(taxFormUserInput, null, 2)}
      <style jsx>{`
        .debug {
          overflow: hidden;
          visibility: hidden;
          width: 1px;
          height: 1px;
        }
      `}</style>
    </div>
  );
};
