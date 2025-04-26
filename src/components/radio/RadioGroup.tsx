import React, { createContext, useContext, PropsWithChildren } from 'react'

interface RadioGroupState {
  readonly selected: string
  readonly onSelect: (selected: string) => void
}

const RadioGroupContext = createContext<RadioGroupState>(null)

export const useRadioGroupContext = (): RadioGroupState => {
  const context = useContext(RadioGroupContext)
  if (!context) {
    throw new Error(
      'useRadioGroupContext must be used within the RadioGroupContext.Provider',
    )
  }
  return context
}

interface Props {
  readonly value: string
  readonly onChange: (value: string) => void
}

const RadioGroup = ({
  value,
  onChange,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <RadioGroupContext.Provider value={{ selected: value, onSelect: onChange }}>
      <div className="govuk-form-group">
        <fieldset className="govuk-fieldset" aria-describedby="contact-hint">
          <div className="govuk-radios" data-module="govuk-radios">
            {children}
          </div>
        </fieldset>
      </div>
    </RadioGroupContext.Provider>
  )
}

export default RadioGroup
