import React, { PropsWithChildren } from 'react'
import { useRadioGroupContext } from './RadioGroup'

interface Props {
  readonly forValue: string;
  children: ReactNode;
}

const RadioConditional = ({ forValue, children }: PropsWithChildren<Props>) => {
  const { selected } = useRadioGroupContext()

  return (
    <>
      {selected === forValue && (
        <div className="govuk-radios__conditional">{children}</div>
      )}
    </>
  );
};

export default RadioConditional;
