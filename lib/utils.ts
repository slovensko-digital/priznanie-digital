export const sortObjectKeys = object => {
  const ordered = {};
  Object.keys(object)
    .sort()
    .forEach(function(key) {
      ordered[key] = object[key];
    });
  return ordered;
};
