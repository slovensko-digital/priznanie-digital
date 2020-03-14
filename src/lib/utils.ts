import { TaxFormUserInput } from '../types/TaxFormUserInput';

export const sortObjectKeys = (object: object) => {
  const ordered = {};
  Object.keys(object)
    .sort()
    .forEach(key => {
      ordered[key] = object[key];
    });
  return ordered;
};

export const setDate = (
  taxform: TaxFormUserInput,
  date: Date = new Date(),
): TaxFormUserInput => {
  return { ...taxform, datum: date.toLocaleString('sk-sk') };
};

export const formatCurrency = (value: number): string => {
  const findPlaceForThousandsDivider = /\B(?=(\d{3})+(?!\d))/g;
  return `${(value || 0)
    .toFixed(2)
    .replace(findPlaceForThousandsDivider, ' ')
    .replace('.', ',')} EUR`;
};
