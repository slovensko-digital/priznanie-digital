const { defaults } = require("jest-config");
module.exports = {
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/.next/",
    "/__tests__/testCases",
    "/cypress/",
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "\\.xml$": "jest-raw-loader",
    "\\.xsd$": "jest-raw-loader",
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
  },
  moduleFileExtensions: [
    ...defaults.moduleFileExtensions,
    "ts",
    "tsx",
    "xsd",
    "xml",
  ],
  watchPathIgnorePatterns: [
    "testOutputs",
    `.*\.output\.json`,
    `.*\.output\.xml`,
  ],
};
