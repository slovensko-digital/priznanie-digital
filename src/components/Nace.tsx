import React, { useEffect, useState, useRef } from 'react';
import Autosuggest, { Theme } from 'react-autosuggest';
import { useField } from 'formik';
import classnames from 'classnames';
import Fuse from 'fuse.js';
import { getNace } from '../lib/api';
import styles from './Nace.module.css';

const options = {
  shouldSort: true,
  includeScore: true,
  threshold: 0.3,
  location: 0,
  distance: 100,
  minMatchCharLength: 1,
  keys: ['code', 'label'],
};

function useFuse<T>(data: T[]): Fuse<T, { includeScore: true }> {
  const fuseRef = useRef(new Fuse(data, options));

  useEffect(() => {
    fuseRef.current = new Fuse(data, options);
  }, [data]);

  return fuseRef.current;
}

interface Nace {
  code: string;
  label: string;
}

interface SuggestionProps {
  suggestion: Fuse.FuseResultWithScore<Nace>;
}
const Suggestion: React.FC<SuggestionProps> = ({
  suggestion,
}: SuggestionProps) => (
  <div>
    {suggestion?.item?.code} - {suggestion?.item?.label}
  </div>
);

interface Props {
  label: string;
  hint?: string;
  className?: string;
  width?: 30 | 20 | 10 | 5 | 4 | 3 | 2 | 'auto';
}
export const Nace: React.FC<Props> = ({
  className = '',
  label = 'NACE',
  width = 'auto',
  hint = '',
}: Props) => {
  const name = 'r003_nace';
  const [naceData, setNaceData] = useState<Nace[]>([]);
  const [naceSearchResult, setNaceSearchResult] = useState<
    Fuse.FuseResultWithScore<Nace>[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [field, meta, helpers] = useField(name);
  const fuse = useFuse(naceData);

  const fetchData = async () => {
    setIsLoading(true);
    const result = await getNace();
    setNaceData(result);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSuggestionsFetchRequested = ({ value }) => {
    const searchResult = fuse.search(value);
    setNaceSearchResult(searchResult);
  };
  const onSuggestionsClearRequested = () => {
    setNaceSearchResult([]);
  };


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
        isLoading ? [styles.autocompleteFieldLoading] : '',
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

      <Autosuggest<Fuse.FuseResultWithScore<Nace>>
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={suggestion =>
          `${suggestion?.item?.code} ${suggestion?.item?.label}`
        }
        suggestions={naceSearchResult}
        renderSuggestion={suggestion => <Suggestion suggestion={suggestion} />}
        inputProps={inputProps}
        theme={theme}
        shouldRenderSuggestions={() => true}
        onSuggestionSelected={(_event, { suggestion }) => {
          helpers.setValue(
            `${suggestion?.item?.code} - ${suggestion?.item?.label}`,
          );
        }}
      />
    </div>
  );
};
