import { globalIgnores } from "eslint/config";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import eslintComments from "@eslint-community/eslint-plugin-eslint-comments";
import unicorn from "eslint-plugin-unicorn";
import promise from "eslint-plugin-promise";
import sonarjs from "eslint-plugin-sonarjs";
import jsxA11y from "eslint-plugin-jsx-a11y";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier/flat";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default tseslint.config(
  js.configs.recommended,
  tseslint.configs.recommended,
  [
    globalIgnores(["**/node_modules", "**/public", ".next", "*.config.*"]),
    {
      extends: fixupConfigRules(
        compat.extends(
          "plugin:react/recommended",
          "plugin:promise/recommended",
        ),
      ),
      plugins: {
        "eslint-comments": eslintComments,
        unicorn: fixupPluginRules(unicorn),
        promise: fixupPluginRules(promise),
        sonarjs: fixupConfigRules(sonarjs),
        "jsx-a11y": jsxA11y,
      },
      languageOptions: {
        globals: globals.jest,
        parserOptions: {
          project: ["./tsconfig.json", "./cypress/tsconfig.json"],
        },
      },
      rules: {
        "jsx-a11y/anchor-is-valid": 0,
        "unicorn/no-null": 0,
        "unicorn/prevent-abbreviations": "off",
        "react/no-unknown-property": [
          "error",
          {
            ignore: ["jsx"],
          },
        ],
        "react/prop-types": "warn",
        "@typescript-eslint/no-require-imports": "warn",
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            argsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_",
            destructuredArrayIgnorePattern: "^_",
            varsIgnorePattern: "^_",
          },
        ],
        "@typescript-eslint/no-explicit-any": [
          "error",
          {
            fixToUnknown: true,
          },
        ],
        "unicorn/filename-case": [
          "error",
          {
            cases: {
              camelCase: true,
              pascalCase: true,
              kebabCase: true,
            },
          },
        ],
        "jsx-a11y/label-has-associated-control": [
          2,
          {
            assert: "htmlFor",
          },
        ],
        "sonarjs/no-duplicate-string": 0,
        "sonarjs/cognitive-complexity": 0,
        "react/react-in-jsx-scope": 0,
      },
    },
    eslintConfigPrettier,
  ],
);
