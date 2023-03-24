import React, {FC} from 'react';
import {useRadioGroupContext} from "./RadioGroup";

interface Props {
  readonly name: string;
  readonly value: string;
  readonly label: string;
}

const Radio: FC<Props> = ({name, value, label }) => {
  const {selected, onSelect} = useRadioGroupContext();

  const handleSelect = (): void => {
    onSelect(value);
  }

  return (
    <div className="govuk-radios__item">
      <input className="govuk-radios__input"
             id={name}
             name={name}
             type="radio"
             value={value}
             checked={selected === value}
             onChange={handleSelect}
             data-aria-controls="conditional-contact"
      />
      <label className="govuk-label govuk-radios__label" htmlFor={name}>
        {label}
      </label>
    </div>)
}

export default Radio;
