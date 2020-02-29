module.exports = {
  extends: ['xo/esnext', 'xo-react'],
  space: true,
  prettier: true,
  globals: ['describe', 'test', 'expect', 'cy'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
  },
};
