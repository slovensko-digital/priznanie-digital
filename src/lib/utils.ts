import { TaxForm } from '../types/TaxForm';

export const sortObjectKeys = object => {
  const ordered = {};
  Object.keys(object)
    .sort()
    .forEach(key => {
      ordered[key] = object[key];
    });
  return ordered;
};

export const setDate = (taxform: TaxForm, date?: Date): TaxForm => {
  const currentDate = date || new Date();
  return { ...taxform, datum: currentDate.toLocaleString('sk-sk') };
};
