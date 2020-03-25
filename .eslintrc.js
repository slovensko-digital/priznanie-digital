module.exports = {
  parserOptions: {
    project: ['./tsconfig.json', './cypress/tsconfig.json'],
  },
  env: {
    jest: true,
  },
  plugins: [
    'eslint-comments',
    // 'jest',
    'unicorn',
    'promise',
    'only-warn',
  ],
  extends: [
    'react-app',
    'plugin:promise/recommended',
    // "plugin:jest/recommended",
    'plugin:unicorn/recommended',
    'plugin:sonarjs/recommended',
  ],
  rules: {
    'jsx-a11y/anchor-is-valid': 0,
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          pascalCase: true,
          kebabCase: true,
        },
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        assert: 'htmlFor',
      },
    ],
    'sonarjs/no-duplicate-string': 0,
  },
};
