import React, { useEffect, useState } from 'react';
import Autosuggest, { Theme } from 'react-autosuggest';
import { useField } from 'formik';
import classnames from 'classnames';
import { nace } from '../lib/api';

interface Props {
  label: string;
  hint?: string;
  className?: string;
  width?: 30 | 20 | 10 | 5 | 4 | 3 | 2 | 'auto';
}

interface NaceItem {
  item: {
    code: string;
    label: string;
  };
  score: number;
}

interface SuggestionProps {
  suggestion: NaceItem;
}
const Suggestion: React.FC<SuggestionProps> = ({
  suggestion,
}: SuggestionProps) => (
  <div>
    {suggestion?.item?.code} - {suggestion?.item?.label}
  </div>
);

export const Nace: React.FC<Props> = ({
  className = '',
  label = 'NACE',
  width = 'auto',
  hint = '',
}: Props) => {
  const name = 'r003_nace';
  const [naceItems, setNaceItems] = useState<NaceItem[]>([]);
  const [field, meta] = useField(name);

  const fetchData = async ({ value }) => {
    const result = await nace(value);
    setNaceItems(result);
  };
  const onSuggestionsClearRequested = () => {
    setNaceItems([]);
  };

  useEffect(() => {
    fetchData({ value: field.value });
  }, []);

  const inputProps = {
    ...field,
    name,
    id: name,
    className: classnames('govuk-input', {
      [`govuk-input--width-${width}`]: width !== 'auto',
    }),
    'data-test': `${field.name}-input`,
  };

  const theme: Theme = {
    suggestionsContainerOpen:
      'govuk-list govuk-list--number autocomplete__menu',
    suggestion: 'autocomplete__option',
    suggestionHighlighted: 'autocomplete__option--focused',
    suggestionsList: { padding: 0, margin: 0 },
  };

  return (
    <div
      className={classnames([
        'govuk-form-group',
        className,
        meta.touched && meta.error && 'govuk-form-group--error',
      ])}
    >
      <label className="govuk-label govuk-!-font-weight-bold" htmlFor={name}>
        {label}
      </label>

      {meta.touched && meta.error ? (
        <span
          id={name}
          data-test="error"
          className="govuk-error-message govuk-!-margin-top-2 govuk-!-margin-bottom-0"
        >
          <span className="govuk-visually-hidden">Error:</span> {meta.error}
        </span>
      ) : null}

      <span className="govuk-hint">{hint}</span>

      <Autosuggest<NaceItem>
        onSuggestionsFetchRequested={fetchData}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={suggestion => suggestion?.item?.label}
        suggestions={naceItems}
        renderSuggestion={suggestion => <Suggestion suggestion={suggestion} />}
        inputProps={inputProps}
        theme={theme}
      />
    </div>
  );
};
