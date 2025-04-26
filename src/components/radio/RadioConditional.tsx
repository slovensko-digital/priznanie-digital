<<<<<<< HEAD
import React, { PropsWithChildren } from 'react'
import { useRadioGroupContext } from './RadioGroup'
=======
import React, { FC, ReactNode } from "react";
import { useRadioGroupContext } from "./RadioGroup";
>>>>>>> 1f1a75a (migrate eslint and prettier + fix errors)

interface Props {
  readonly forValue: string;
  children: ReactNode;
}

<<<<<<< HEAD
const RadioConditional = ({ forValue, children }: PropsWithChildren<Props>) => {
  const { selected } = useRadioGroupContext()
=======
const RadioConditional: FC<Props> = ({ forValue, children }) => {
  const { selected } = useRadioGroupContext();
>>>>>>> 1f1a75a (migrate eslint and prettier + fix errors)

  return (
    <>
      {selected === forValue && (
        <div className="govuk-radios__conditional">{children}</div>
      )}
    </>
  );
};

export default RadioConditional;
