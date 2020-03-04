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
