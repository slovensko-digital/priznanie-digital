/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line import/no-extraneous-dependencies
const { defaults } = require('jest-config')

module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/__tests__/testCases/',
    '/__tests__/utils/',
    '/cypress',
  ],
  transform: {
    '^.+\\.(js|jsx|ts)$': '<rootDir>/node_modules/ts-jest',
    '^.+\\.tsx?$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.ts',
    '\\.xml$': 'jest-raw-loader',
    '\\.xsd$': 'jest-raw-loader',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: [
    ...defaults.moduleFileExtensions,
    'ts',
    'tsx',
    'xsd',
    'xml',
  ],
  watchPathIgnorePatterns: [
    'testOutputs',
    `.*.output.json`,
    `.*.output.xml`,
    '/cypress',
  ],
  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: 'true',
      },
    },
  },
}
