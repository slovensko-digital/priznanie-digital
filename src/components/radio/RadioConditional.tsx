import React, {FC} from 'react';
import {useRadioGroupContext} from "./RadioGroup";

interface Props {
  readonly forName: string;
}

const RadioConditional: FC<Props> = ({forName, children}) => {
  const {selected} = useRadioGroupContext();

  return (<>
    {selected === forName &&
      <div className="govuk-radios__conditional" id="conditional-contact">
        {children}
      </div>}
  </>);
}

export default RadioConditional;
