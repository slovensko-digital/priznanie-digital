import React, { useEffect, useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { useField } from 'formik';
import { nace } from '../lib/api';

interface Props {
  className: string;
}

interface NaceItem {
  item: {
    code: string;
    label: string;
  };
  score: number;
}

export const Nace: React.FC<Props> = ({ className }: Props) => {
  const [naceItems, setNaceItems] = useState<NaceItem[]>([]);
  const [field] = useField('r003_nace');

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
    name: 'r003_nace',
  };
  
  return (
    <div className={className}>
      <Autosuggest<NaceItem>
        onSuggestionsFetchRequested={fetchData}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={suggestion => suggestion?.item?.label}
        suggestions={naceItems}
        renderSuggestion={suggestion => <div>{suggestion?.item?.label}</div>}
        inputProps={inputProps}
      />
    </div>
  );
};
