export const sortObjectKeys = (object: object) => {
  const ordered = {};
  Object.keys(object)
    .sort()
    .forEach(key => {
      ordered[key] = object[key];
    });
  return ordered;
};

export const setDate = <T>(input: T, date: Date = new Date()) => {
  return { ...input, datum: date.toLocaleString('sk-sk').split(',')[0] };
};

export const formatCurrency = (value: number): string => {
  const findPlaceForThousandsDivider = /\B(?=(\d{3})+(?!\d))/g;
  return `${(value || 0)
    .toFixed(2)
    .replace(findPlaceForThousandsDivider, ' ')
    .replace('.', ',')} EUR`;
};
