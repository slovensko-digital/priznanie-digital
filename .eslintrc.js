module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json", "./cypress/tsconfig.json"],
    ecmaVersion: "2020",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    "@typescript-eslint",
    "eslint-comments",
    "jest",
    "unicorn",
    "only-warn",
  ],
  extends: [
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "plugin:unicorn/recommended",
    "plugin:sonarjs/recommended",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint",
  ],
  rules: {
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    "no-prototype-builtins": "off",
    // https://basarat.gitbook.io/typescript/main-1/defaultisbad
    "import/prefer-default-export": "off",
    // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    "react/destructuring-assignment": "off",
    "react/jsx-props-no-spreading": "off",
    // Use function hoisting to improve code readability
    "no-use-before-define": "off",
    // Makes no sense to allow type inferrence for expression parameters, but require typing the response
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-unused-expressions": [
      1,
      { allowShortCircuit: true, allowTernary: true },
    ],
    "spaced-comment": ["error", "always", { markers: ["/"] }],
    "eslint-comments/disable-enable-pair": [
      "error",
      {
        allowWholeFile: true,
      },
    ],
    "import/no-default-export": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "unicorn/prevent-abbreviations": "off",
    // "node/no-missing-import": "off",
  },
};
