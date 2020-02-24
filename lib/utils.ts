export const sortObjectKeys = object => {
  const ordered = {};
  Object.keys(object)
    .sort()
    .forEach(function(key) {
      ordered[key] = object[key];
    });
  return ordered;
};

export const assignOnlyExistingKeys = (obj1: object, obj2: object) =>
         Object.keys(obj1).reduce((a, key) => ({ ...a, [key]: obj2[key] }), {});
