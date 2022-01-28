// /* eslint-disable @typescript-eslint/no-var-requires */
// // eslint-disable-next-line import/no-extraneous-dependencies
const { defaults } = require('jest-config')

const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/__tests__/testCases/',
    '/__tests__/utils/',
    '/cypress',
  ],
  moduleFileExtensions: [
    ...defaults.moduleFileExtensions,
    'ts',
    'tsx',
    'xsd',
    'xml',
  ],
  transform: {
    '\\.xml$': 'jest-raw-loader',
    '\\.xsd$': 'jest-raw-loader',
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
