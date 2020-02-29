module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json", "./cypress/tsconfig.json"],
  },
  plugins: ["@typescript-eslint", "eslint-comments", "jest", "only-warn"],
  extends: [
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint",
  ],
  rules: {
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    "no-prototype-builtins": "off",
    // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    "import/prefer-default-export": "off",
    // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    "react/destructuring-assignment": "off",
    // No jsx extension: https://github.com/facebook/create-react-app/issues/87#issuecomment-234627904
    "react/jsx-filename-extension": "off",
    // Use function hoisting to improve code readability
    "no-use-before-define": [
      "error",
      { functions: false, classes: true, variables: false },
    ],
    // Makes no sense to allow type inferrence for expression parameters, but require typing the response
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-use-before-define": [
      "error",
      { functions: false, classes: false, variables: false, typedefs: false },
    ],
    // Common abbreviations are known and readable
    "unicorn/prevent-abbreviations": "off",
    "spaced-comment": ["error", "always", { markers: ["/"] }],
    "jsx-a11y/anchor-is-valid": "off",
    "react/jsx-props-no-spreading": "off",
    "eslint-comments/disable-enable-pair": "off",
    "import/no-default-export": 0,
    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions": [
      1,
      { allowShortCircuit: true, allowTernary: true },
    ],
  },
};
