import { TaxForm } from './types';

export const sortObjectKeys = object => {
  const ordered = {};
  Object.keys(object)
    .sort()
    .forEach(key => {
      ordered[key] = object[key];
    });
  return ordered;
};

export const setDate = (taxform: TaxForm): TaxForm => {
  return { ...taxform, datum: new Date().toLocaleString('sk-sk') };
};
