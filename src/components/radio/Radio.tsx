import React, { FC } from 'react';
import { useRadioGroupContext } from "./RadioGroup";

interface Props {
  readonly name: string;
  readonly value: string;
  readonly label: string;
  readonly disabled?: boolean;
}

const Radio: FC<Props> = ({ name, value, label, ...rest }) => {
  const { selected, onSelect } = useRadioGroupContext();

  const handleSelect = (): void => {
    onSelect(value);
  }

  return (
    <div className="govuk-radios__item">
      <input className="govuk-radios__input"
        id={name}
        name={name}
        data-test={name}
        type="radio"
        value={value}
        checked={selected === value}
        onChange={handleSelect}
        data-aria-controls="conditional-contact"
        {...rest}
      />
      <label className="govuk-label govuk-radios__label" htmlFor={name}>
        {label}
      </label>
    </div>)
}

export default Radio;
