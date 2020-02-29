module.exports = {
  extends: ['xo/esnext', 'xo-react', 'xo-typescript'],
  envs: ['browser', 'node', 'jest', 'es2020'],
  space: true,
  prettier: true,
  globals: ['describe', 'test', 'expect', 'cy', 'fetch'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
  },
};
