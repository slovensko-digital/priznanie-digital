module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "jest", "react-hooks", "only-warn"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  extends: [
    "airbnb-typescript",
    "prettier/@typescript-eslint",
    "plugin:jest/recommended",
    "plugin:jest/recommended",
  ],
  rules: {
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
  },
};
